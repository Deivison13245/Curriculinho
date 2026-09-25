import { useState } from 'react';
import { TabType } from '../types';
import { FileText, Palette, Eye, Menu, X, Sparkles, ChevronRight, Zap } from 'lucide-react';

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
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Conteúdo', icon: <FileText className="w-4 h-4" /> },
    { id: 'design', label: 'Design & Layout', icon: <Palette className="w-4 h-4" /> },
    { id: 'preview', label: 'Pré-visualização', icon: <Eye className="w-4 h-4" /> },
  ];

  function handleTabSelect(tab: TabType) {
    onTabChange(tab);
    setSideMenuOpen(false);
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: App Logo - Curriculinho (Senac Colors #004A8D & #F7941D) */}
        <div
          className="flex items-center gap-3 shrink-0 cursor-pointer"
          onClick={() => handleTabSelect('content')}
        >
          <div className="w-10 h-10 rounded-xl bg-[#004A8D] flex items-center justify-center text-white shadow-md shadow-[#004A8D]/20">
            <Sparkles className="w-5 h-5 text-[#F7941D]" />
          </div>
          <div>
            <div className="font-extrabold text-[#004A8D] text-lg leading-tight tracking-tight flex items-center gap-1.5">
              Curriculinho
              <span className="bg-[#F7941D]/15 text-[#F7941D] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#F7941D]/30">
                T.D.S.
              </span>
            </div>
            <div className="text-[10px] text-gray-500 font-semibold leading-none">
              Senac • Currículo Turbo
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

        {/* Right Desktop: Central IA & Saúde Button (Senac Blue & Orange) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#004A8D]/10 border border-[#004A8D]/20 text-[#004A8D] hover:bg-[#004A8D] hover:text-white transition-all duration-200 group relative font-bold"
            title="Abrir Central de IA e Análise de Saúde"
          >
            <Zap className="w-4 h-4 text-[#F7941D] group-hover:scale-110 transition-transform" />
            <span className="text-xs">Central IA & Saúde</span>
            <span
              className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full text-white ${
                score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-[#F7941D]' : 'bg-red-500'
              }`}
            >
              {score}%
            </span>
          </button>
        </div>

        {/* Right Mobile: Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Score indicator on mobile */}
          <span
            onClick={onOpenDrawer}
            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full text-white cursor-pointer ${
              score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-[#F7941D]' : 'bg-red-500'
            }`}
          >
            {score}%
          </span>

          <button
            onClick={() => setSideMenuOpen(true)}
            className="p-2 rounded-xl bg-[#004A8D]/10 text-[#004A8D] border border-[#004A8D]/20 hover:bg-[#004A8D] hover:text-white transition-colors"
            aria-label="Abrir Menu Lateral Mobile"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MOBILE SIDE MENU DRAWER (SLIDE-OVER FROM SIDE) */}
      {sideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Semi-transparent Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSideMenuOpen(false)}
          />

          {/* Side Panel (Slide-over from Left) */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out z-50">
            {/* Side Menu Header */}
            <div className="p-4 bg-[#004A8D] text-white flex items-center justify-between border-b border-[#004A8D]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#F7941D]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold leading-tight">Curriculinho</h3>
                  <p className="text-[10px] text-white/80">Senac • Modo Turbo T.D.S.</p>
                </div>
              </div>

              <button
                onClick={() => setSideMenuOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Side Menu Content (Navigation Tabs) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  Navegação Principal
                </div>
                <div className="space-y-1.5">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabSelect(tab.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#004A8D] text-white shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#004A8D]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-[#F7941D]' : 'text-gray-500'}>
                            {tab.icon}
                          </span>
                          <span>{tab.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4 text-[#F7941D]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Central IA shortcut */}
              <div className="pt-2 border-t border-gray-100">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  Ferramentas Inteligentes
                </div>
                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    onOpenDrawer();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#004A8D] to-[#00386c] text-white font-bold text-xs shadow-md border border-[#F7941D]/30"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#F7941D]" />
                    <span>Central de IA & ATS</span>
                  </div>
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

            {/* Side Menu Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
              <p className="text-[10px] text-gray-600 font-semibold leading-tight">
                Desenvolvido Pela Turma Técnica de Desenvolvimento de Sistemas
              </p>
              <div className="flex justify-center gap-1.5 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F7941D]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#004A8D]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FDC180]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
