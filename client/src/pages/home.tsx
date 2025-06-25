import { useState } from "react";
import { Link } from "wouter";
import QueryInput from "@/components/query-input";
import ResponseDisplay from "@/components/response-display";
import HistorySidebar from "@/components/history-sidebar";
import SettingsModal from "@/components/settings-modal";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { History, Settings, Search } from "lucide-react";

export default function Home() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentResponse, setCurrentResponse] = useLocalStorage('currentResponse', null);

  const { data: conversations } = useQuery({
    queryKey: ['/api/conversations'],
  });

  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg className="h-8 w-8 text-accent-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 1H8.99C7.89 1 7 1.9 7 3H19C20.1 3 21 3.9 21 5V18L19 16V5H7.97V7H19V1ZM3 9H1V20C1 21.1 1.9 22 3 22H16C17.1 22 18 21.1 18 20V9H3ZM5 20V11H16V20H5Z"/>
              </svg>
              <div>
                <h1 className="text-lg font-bold">Consulta Bíblica AD</h1>
                <p className="text-xs text-blue-200">Assembleia de Deus CPAD</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href="/search-declaracao">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-primary-700 text-white"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsHistoryOpen(true)}
                className="p-2 rounded-full hover:bg-primary-700 text-white"
              >
                <History className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full hover:bg-primary-700 text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6 pb-20 lg:pb-6">
        <QueryInput onResponse={setCurrentResponse} />
        
        {currentResponse && (
          <ResponseDisplay response={currentResponse} />
        )}
      </main>

      {/* Sidebar and Modal */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        conversations={conversations || []}
        onSelectConversation={setCurrentResponse}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
      />

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2 text-primary-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.69 9 11 5.16-1.31 9-5.45 9-11V7l-10-5z"/>
            </svg>
            <span className="text-xs mt-1">Início</span>
          </button>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="flex flex-col items-center p-2 text-gray-500"
          >
            <History className="h-6 w-6" />
            <span className="text-xs mt-1">Histórico</span>
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center p-2 text-gray-500"
          >
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Config</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
