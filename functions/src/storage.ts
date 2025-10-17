import { randomUUID } from "crypto";

// Types for chat messages
export interface ChatMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface InsertChatMessage {
  sessionId: string;
  role: "user" | "assistant";
  content: string;
}

// Storage interface
export interface IStorage {
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  clearChatSession(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.chatMessages = new Map();
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((msg) => msg.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async clearChatSession(sessionId: string): Promise<void> {
    const messagesToDelete = Array.from(this.chatMessages.entries())
      .filter(([_, msg]) => msg.sessionId === sessionId)
      .map(([id]) => id);
    
    messagesToDelete.forEach((id) => this.chatMessages.delete(id));
  }
}

export const storage = new MemStorage();

