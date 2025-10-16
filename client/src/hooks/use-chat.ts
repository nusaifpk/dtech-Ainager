import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function useChat(sessionId: string) {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "welcome",
        role: "assistant",
        content: "How can I assist you today?",
        timestamp: new Date(),
      },
    ],
    isLoading: false,
    error: null,
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, conversationHistory }: { message: string; conversationHistory: any[] }) => {
      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: message,
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      return { response, aiMessageId: (Date.now() + 1).toString() };
    },
    onSuccess: async ({ response, aiMessageId }) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response stream");
      }

      let aiContent = "";

      // Add empty AI message that will be populated with streamed content
      setState(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: aiMessageId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
          },
        ],
      }));

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.chunk) {
                  aiContent += data.chunk;
                  setState(prev => ({
                    ...prev,
                    messages: prev.messages.map(msg =>
                      msg.id === aiMessageId
                        ? { ...msg, content: aiContent }
                        : msg
                    ),
                  }));
                }

                if (data.done) {
                  setState(prev => ({ ...prev, isLoading: false }));
                }

                if (data.error) {
                  throw new Error(data.error);
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      } catch (streamError) {
        console.error("Stream reading error:", streamError);
        setState(prev => ({ ...prev, isLoading: false }));
        throw streamError;
      }
    },
    onError: (error: Error) => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const clearChatMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/chat/${sessionId}`);
    },
    onSuccess: () => {
      setState({
        messages: [
          {
            id: "welcome",
            role: "assistant",
            content: "How can I assist you today?",
            timestamp: new Date(),
          },
        ],
        isLoading: false,
        error: null,
      });
      toast({
        title: "Chat Cleared",
        description: "Your conversation has been reset.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to clear chat. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sendMessage = useCallback((message: string) => {
    const conversationHistory = state.messages
      .filter(msg => msg.id !== "welcome")
      .map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

    sendMessageMutation.mutate({ message, conversationHistory });
  }, [state.messages, sendMessageMutation]);

  const clearChat = useCallback(() => {
    clearChatMutation.mutate();
  }, [clearChatMutation]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
  };
}
