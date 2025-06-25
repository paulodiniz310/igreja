import { apiRequest } from "./queryClient";
import type { QueryRequest, BiblicalResponse, Settings, InsertSettings } from "@shared/schema";

export const api = {
  // Query theological questions
  async query(data: QueryRequest) {
    const response = await apiRequest("POST", "/api/query", data);
    return await response.json();
  },

  // Get conversation history
  async getConversations() {
    const response = await apiRequest("GET", "/api/conversations");
    return await response.json();
  },

  // Get specific conversation
  async getConversation(id: number) {
    const response = await apiRequest("GET", `/api/conversations/${id}`);
    return await response.json();
  },

  // Get current settings
  async getSettings(): Promise<Settings> {
    const response = await apiRequest("GET", "/api/settings");
    return await response.json();
  },

  // Update settings
  async updateSettings(data: InsertSettings): Promise<Settings> {
    const response = await apiRequest("PUT", "/api/settings", data);
    return await response.json();
  },

  // Generate image based on prompt
  async generateImage(prompt: string) {
    const response = await apiRequest("POST", "/api/generate-image", { prompt });
    return await response.json();
  },
};
