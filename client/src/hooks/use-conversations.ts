import { useState, useEffect } from "react";
import type { Conversation } from "@/../../shared/schema";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theological-conversations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConversations(parsed);
      } catch (error) {
        console.error('Error parsing stored conversations:', error);
        setConversations([]);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('theological-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const addConversation = (conversation: Conversation) => {
    setConversations(prev => [conversation, ...prev]);
  };

  const clearConversations = () => {
    setConversations([]);
    localStorage.removeItem('theological-conversations');
  };

  const getConversation = (id: number) => {
    return conversations.find(conv => conv.id === id);
  };

  return {
    conversations,
    addConversation,
    clearConversations,
    getConversation
  };
}