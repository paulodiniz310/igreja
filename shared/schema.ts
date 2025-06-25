import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  responseLevel: text("response_level").notNull(),
  response: jsonb("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  apiKey: text("api_key").notNull(),
  aiModel: text("ai_model").notNull().default("deepseek/deepseek-r1-0528:free"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;

export interface BiblicalResponse {
  adExplanation: string;
  verses: Array<{
    text: string;
    originalText?: string;
    reference: string;
    explanation: string;
  }>;
  originalWords: Array<{
    word: string;
    language: string;
    translation: string;
    context: string;
  }>;
  bookReferences: Array<{
    bookTitle: string;
    page: number;
    line: number;
    quote: string;
    chapter?: string;
  }>;
  aiComplement: string;
}

export interface QueryRequest {
  question: string;
  responseLevel: "simples" | "intermediario" | "avancado";
}
