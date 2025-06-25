import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Conversation } from "@shared/schema";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSelectConversation: (response: any) => void;
}

export default function HistorySidebar({ 
  isOpen, 
  onClose, 
  conversations, 
  onSelectConversation 
}: HistorySidebarProps) {
  
  const handleSelectConversation = (conversation: Conversation) => {
    onSelectConversation({
      conversation,
      response: conversation.response
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Histórico</SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1 h-[calc(100vh-80px)]">
          <div className="p-4">
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">Nenhuma consulta anterior</p>
                <p className="text-gray-400 text-xs mt-1">
                  Suas consultas aparecerão aqui
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-sm text-gray-800 line-clamp-2">
                      {conversation.question}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 capitalize">
                        {conversation.responseLevel}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(conversation.createdAt), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
