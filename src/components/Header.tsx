import { useState } from 'react';
import { TabType } from '../types';
import { FileText, Palette, Eye, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Conteúdo', icon: <FileText className="w-4 h-4" /> },
    { id: 'design', label: 'Design & Layout', icon: <Palette className="w-4 h-4" /> },
    { id: 'preview', label: 'Pré-visualização', icon: <Eye className="w-4 h-4" /> },
  ];

  function handleTabSelect(tab: TabType) {
    onTabChange(tab);
    setMobileMenuOpen(false);
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: App Logo - Curriculinho */}
        <div
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          onClick={() => handleTabSelect('content')}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-gray-900 text-lg leading-tight tracking-tight flex items-center gap-1.5">
              Curriculinho
              <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs (hidden on mobile) */}
        <nav
          className="hidden md:flex items-center p-1 bg-gray-100/80 rounded-xl border border-gray-200/60"
          aria-label="Navegação Principal"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
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

        {/* Right Desktop: Central IA & Saúde Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 group relative"
            title="Abrir Central de IA e Análise de Saúde"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold">Central IA & Saúde</span>
            <span
              className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full text-white ${
                score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
              }`}
            >
              {score}%
            </span>
          </button>
        </div>

        {/* Right Mobile: Hamburger Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Score indicator on mobile */}
          <span
            onClick={onOpenDrawer}
            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full text-white cursor-pointer ${
              score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
            }`}
          >
            {score}%
          </span>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/80 hover:bg-purple-100 transition-colors"
            aria-label="Abrir Menu Principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU PANEL */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Navegação
          </div>
          <div className="space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-purple-600' : 'text-gray-500'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-purple-600" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrawer();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold text-xs shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>Central de IA & Análise ATS</span>
              </div>
              <span
                className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full text-white ${
                  score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
              >
                {score}%
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
