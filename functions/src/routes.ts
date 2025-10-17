import type { Express } from "express";
import { storage } from "./storage";
import { getChatCompletion, streamChatCompletion } from "./lib/openai";
import { z } from "zod";

// Shared request validation schema
const chatRequestSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1),
  conversationHistory: z.array(z.object({
    role: z.string(),
    content: z.string(),
  })).optional(),
});

export function registerRoutes(app: Express): void {
  // Chat endpoint - non-streaming
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body
      const validation = chatRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validation.error.errors 
        });
      }

      const { sessionId, message, conversationHistory } = validation.data;

      // Store user message
      await storage.createChatMessage({
        sessionId,
        role: "user",
        content: message,
      });

      // Get AI response
      const messages = conversationHistory || [];
      messages.push({ role: "user", content: message });

      const aiResponse = await getChatCompletion(messages);

      // Store AI response
      const aiMessage = await storage.createChatMessage({
        sessionId,
        role: "assistant",
        content: aiResponse,
      });

      res.json({
        message: aiMessage,
        response: aiResponse,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to process chat message",
      });
    }
  });

  // Streaming chat endpoint
  app.post("/api/chat/stream", async (req, res) => {
    try {
      // Validate request body
      const validation = chatRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validation.error.errors 
        });
      }

      const { sessionId, message, conversationHistory } = validation.data;

      // Store user message
      await storage.createChatMessage({
        sessionId,
        role: "user",
        content: message,
      });

      // Set up SSE headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const messages = conversationHistory || [];
      messages.push({ role: "user", content: message });

      let fullResponse = "";

      await streamChatCompletion(messages, (chunk) => {
        fullResponse += chunk;
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      });

      // Store complete AI response
      await storage.createChatMessage({
        sessionId,
        role: "assistant",
        content: fullResponse,
      });

      res.write(`data: ${JSON.stringify({ done: true, fullResponse })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Streaming chat error:", error);
      res.write(`data: ${JSON.stringify({ error: "Failed to stream response" })}\n\n`);
      res.end();
    }
  });

  // Get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json({ messages });
    } catch (error) {
      console.error("Get chat history error:", error);
      res.status(500).json({ error: "Failed to retrieve chat history" });
    }
  });

  // Clear chat session
  app.delete("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.clearChatSession(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Clear chat error:", error);
      res.status(500).json({ error: "Failed to clear chat session" });
    }
  });
}

