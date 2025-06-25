import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Save } from "lucide-react";
import type { Settings, InsertSettings } from "@shared/schema";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: Settings;
}

export default function SettingsModal({ isOpen, onClose, settings }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [aiModel, setAiModel] = useState("deepseek/deepseek-r1-0528:free");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (settings) {
      setApiKey(settings.apiKey);
      setAiModel(settings.aiModel);
    }
  }, [settings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: InsertSettings) => {
      const response = await apiRequest("PUT", "/api/settings", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Chave API obrigatória",
        description: "Por favor, insira uma chave API válida.",
        variant: "destructive",
      });
      return;
    }

    updateSettingsMutation.mutate({
      apiKey: apiKey.trim(),
      aiModel,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Configurações
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Chave API OpenRouter
            </Label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Sua chave API para acessar os modelos de IA
            </p>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo de IA
            </Label>
            <Select value={aiModel} onValueChange={setAiModel}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepseek/deepseek-r1-0528:free">
                  DeepSeek R1 (Free)
                </SelectItem>
                <SelectItem value="anthropic/claude-3-haiku">
                  Claude 3 Haiku
                </SelectItem>
                <SelectItem value="openai/gpt-3.5-turbo">
                  GPT-3.5 Turbo
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Escolha o modelo de IA para as consultas
            </p>
          </div>
          
          <div className="pt-4">
            <Button
              onClick={handleSave}
              disabled={updateSettingsMutation.isPending || !apiKey.trim()}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3"
            >
              {updateSettingsMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
