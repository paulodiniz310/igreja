import { conversations, settings, type Conversation, type InsertConversation, type Settings, type InsertSettings } from "@shared/schema";

export interface IStorage {
  // Conversations
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversations(): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  
  // Settings
  getSettings(): Promise<Settings | undefined>;
  updateSettings(settings: InsertSettings): Promise<Settings>;
}

export class MemStorage implements IStorage {
  private conversations: Map<number, Conversation>;
  private settings: Settings | undefined;
  private currentConversationId: number;
  private currentSettingsId: number;

  constructor() {
    this.conversations = new Map();
    this.currentConversationId = 1;
    this.currentSettingsId = 1;
    
    // Initialize with default settings
    this.settings = {
      id: 1,
      apiKey: process.env.OPENROUTER_API_KEY || "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",
      aiModel: "deepseek/deepseek-r1-0528:free",
      updatedAt: new Date(),
    };
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.currentConversationId++;
    const conversation: Conversation = {
      ...insertConversation,
      id,
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getSettings(): Promise<Settings | undefined> {
    return this.settings;
  }

  async updateSettings(insertSettings: InsertSettings): Promise<Settings> {
    this.settings = {
      id: this.currentSettingsId,
      ...insertSettings,
      updatedAt: new Date(),
    };
    return this.settings;
  }
}

export const storage = new MemStorage();
