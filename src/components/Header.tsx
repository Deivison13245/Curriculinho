import { TabType } from '../types';
import { FileText, Palette, Eye, Menu, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenDrawer: () => void;
  score: number;
  aiActive: boolean;
}

export default function Header({
  activeTab,
  onTabChange,
  onOpenDrawer,
  score,
  aiActive,
}: HeaderProps) {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Conteúdo', icon: <FileText className="w-4 h-4" /> },
    { id: 'design', label: 'Design & Layout', icon: <Palette className="w-4 h-4" /> },
    { id: 'preview', label: 'Pré-visualização', icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onTabChange('content')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-gray-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
              Currículo<span className="text-purple-600">Express</span>
              <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">PRO</span>
            </div>
          </div>
        </div>

        {/* Center: Tabs Navigation */}
        <nav className="flex items-center p-1 bg-gray-100/80 rounded-xl border border-gray-200/60" aria-label="Navegação Principal">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'bg-white text-purple-700 shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-purple-600' : 'text-gray-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Hamburger Menu & IA Drawer Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 group relative"
            title="Abrir Central de IA e Análise de Saúde"
            aria-label="Abrir Menu Hambúrguer da IA e Saúde do Currículo"
          >
            <Menu className="w-5 h-5 text-purple-700 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-bold">Central IA & Saúde</span>

            {/* Score Badge */}
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full text-white ${score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
              }`}>
              {score}%
            </span>

            {/* Pulsing indicator */}
            {aiActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
