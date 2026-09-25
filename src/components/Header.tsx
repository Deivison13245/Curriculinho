import { TabType } from '../types';
import { FileText, Palette, Eye, Menu, Sparkles, Zap } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Custom Logo Image & App Title - Currículo Express */}
        <div
          className="flex items-center gap-3 shrink-0 cursor-pointer"
          onClick={onOpenDrawer}
        >
          <img
            src="./logo.png"
            alt="Logo Currículo Express - Senac T.D.S."
            className="w-10 h-10 rounded-full border-2 border-[#F7941D] bg-white object-cover shadow-sm hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-extrabold text-[#004A8D] text-lg leading-tight tracking-tight flex items-center gap-1.5">
              Currículo <span className="text-[#F7941D]">Express</span>
              <span className="bg-[#F7941D]/15 text-[#F7941D] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#F7941D]/30">
                T.D.S.
              </span>
            </div>
            <div className="text-[10px] text-gray-500 font-semibold leading-none">
              Senac • Currículo em Modo Turbo
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav
          className="hidden md:flex items-center p-1 bg-gray-100/80 rounded-xl border border-gray-200/60"
          aria-label="Navegação Principal"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#004A8D] text-white shadow-sm font-bold'
                    : 'text-gray-600 hover:text-[#004A8D] hover:bg-gray-200/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-[#F7941D]' : 'text-gray-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Single Unified Menu Button & IA Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#004A8D]/10 border border-[#004A8D]/20 text-[#004A8D] hover:bg-[#004A8D] hover:text-white transition-all duration-200 group relative font-bold"
            title="Abrir Menu e Central de IA"
          >
            <Menu className="w-5 h-5 text-[#004A8D] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline text-xs">Menu & Central IA</span>
            <span
              className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full text-white ${
                score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-[#F7941D]' : 'bg-red-500'
              }`}
            >
              {score}%
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
