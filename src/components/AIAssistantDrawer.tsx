import {
  X,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileCheck,
  ArrowRight,
  Globe,
  FileText,
  Palette,
  Eye,
  ChevronRight,
} from 'lucide-react';
import type { ResumeData, TabType } from '../types';

interface UnifiedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  data: ResumeData;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenSynthesis: () => void;
  onOpenStar: () => void;
  onOpenReview: () => void;
  onOpenAts: () => void;
  onOpenExport: () => void;
  onOpenTranslate: () => void;
}

export default function AIAssistantDrawer({
  isOpen,
  onClose,
  score,
  data,
  activeTab,
  onTabChange,
  onOpenSynthesis,
  onOpenStar,
  onOpenReview,
  onOpenAts,
  onOpenExport,
  onOpenTranslate,
}: UnifiedDrawerProps) {
  if (!isOpen) return null;

  const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-[#F7941D]' : 'text-red-500';
  const scoreStroke = score >= 80 ? '#10B981' : score >= 60 ? '#F7941D' : '#EF4444';
  const circumference = 2 * Math.PI * 38;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Conteúdo', icon: <FileText className="w-4 h-4" /> },
    { id: 'design', label: 'Design & Layout', icon: <Palette className="w-4 h-4" /> },
    { id: 'preview', label: 'Pré-visualização', icon: <Eye className="w-4 h-4" /> },
  ];

  const recommendations = [
    {
      condition: !data.name,
      text: 'Adicione seu nome completo',
      actionLabel: 'Preencher Nome',
      type: 'critical',
    },
    {
      condition: !data.summary || data.summary.length < 50,
      text: 'Crie um resumo profissional com mais de 50 caracteres para chamar atenção do recrutador',
      actionLabel: 'Gerar com IA',
      onAction: onOpenSynthesis,
      type: 'warning',
    },
    {
      condition: data.experience.length === 0 || !data.experience.some(e => e.role),
      text: 'Adicione ao menos uma experiência profissional relevante',
      actionLabel: 'Otimizar STAR',
      onAction: onOpenStar,
      type: 'warning',
    },
    {
      condition: data.hardSkills.length < 3,
      text: 'Adicione mais competências técnicas alinhadas à sua área',
      actionLabel: 'Analisar ATS',
      onAction: onOpenAts,
      type: 'info',
    },
  ];

  const pendingRecs = recommendations.filter(r => r.condition);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden transition-all duration-300">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          {/* Unified Drawer Header (Senac Blue & Custom Logo) */}
          <div className="p-4 bg-[#004A8D] text-white flex items-center justify-between shadow-md border-b border-[#004A8D]/20">
            <div className="flex items-center gap-3">
              <img
                src="./logo.png"
                alt="Logo Currículo Express"
                className="w-10 h-10 rounded-full border-2 border-[#F7941D] bg-white object-cover shadow-sm"
              />
              <div>
                <h2 className="text-base font-extrabold leading-tight flex items-center gap-1.5">
                  Currículo Express
                  <span className="bg-[#F7941D] text-white text-[9px] px-1.5 py-0.5 rounded-full font-extrabold">
                    T.D.S.
                  </span>
                </h2>
                <p className="text-xs text-[#FDC180] font-semibold">
                  Senac • Menu Único & Central de IA
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. SEÇÃO DE NAVEGAÇÃO EM ABAS */}
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 px-1">
                Navegação da Aplicação
              </div>
              <div className="space-y-1.5">
                {tabs.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onTabChange(tab.id);
                        onClose();
                      }}
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

            {/* 2. SAÚDE DO CURRÍCULO */}
            <div className="bg-gradient-to-br from-gray-50 to-[#004A8D]/5 rounded-2xl p-4 border border-[#004A8D]/20 shadow-xs">
              <div className="flex items-center gap-4">
                {/* Score Gauge */}
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="38" fill="none" stroke="#E5E7EB" strokeWidth="7" />
                    <circle
                      cx="44"
                      cy="44"
                      r="38"
                      fill="none"
                      stroke={scoreStroke}
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - score / 100)}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-lg font-black ${scoreColor}`}>{score}%</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Score</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-[#004A8D]">
                    {score >= 80 ? 'Currículo Alta Compatibilidade' : score >= 60 ? 'Currículo em Evolução' : 'Melhorias Recomendadas'}
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    {score >= 80
                      ? 'Seu currículo atende aos requisitos ATS.'
                      : 'Complete as recomendações abaixo para aumentar suas chances.'}
                  </p>
                </div>
              </div>

              {/* Action plan */}
              <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-2">
                <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#004A8D]" />
                  Plano de Ação
                </div>

                {pendingRecs.length === 0 ? (
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Parabéns! Estrutura completa.</span>
                  </div>
                ) : (
                  pendingRecs.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#F7941D] shrink-0" />
                        <span>{rec.text}</span>
                      </div>
                      {rec.onAction && (
                        <button
                          onClick={() => {
                            onClose();
                            rec.onAction?.();
                          }}
                          className="shrink-0 text-[10px] font-bold text-white bg-[#004A8D] hover:bg-[#00386c] px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>{rec.actionLabel}</span>
                          <ArrowRight className="w-3 h-3 text-[#F7941D]" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. FERRAMENTAS INTELIGENTES DE IA */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Ferramentas Inteligentes de IA
              </h3>
              <div className="space-y-2.5">
                {/* STAR Method Card */}
                <div
                  onClick={() => { onClose(); onOpenStar(); }}
                  className="p-3.5 rounded-xl border border-[#004A8D]/20 bg-gradient-to-r from-[#004A8D]/5 to-white hover:border-[#004A8D] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#004A8D] text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4 text-[#F7941D]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#004A8D]">
                        Assistente STAR para Experiências
                      </div>
                      <div className="text-[11px] text-gray-600">
                        Situação, Tarefa, Ação e Resultado.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Synthesis AI Card */}
                <div
                  onClick={() => { onClose(); onOpenSynthesis(); }}
                  className="p-3.5 rounded-xl border border-[#004A8D]/20 bg-gradient-to-r from-[#004A8D]/5 to-white hover:border-[#004A8D] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#004A8D] text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4 text-[#F7941D]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#004A8D]">
                        Gerador de Resumo Profissional
                      </div>
                      <div className="text-[11px] text-gray-600">
                        Crie sínteses de alto impacto.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* ATS Thermometer Card */}
                <div
                  onClick={() => { onClose(); onOpenAts(); }}
                  className="p-3.5 rounded-xl border border-[#004A8D]/20 bg-gradient-to-r from-[#004A8D]/5 to-white hover:border-[#004A8D] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#004A8D] text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Target className="w-4 h-4 text-[#F7941D]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#004A8D]">
                        Termômetro & Otimizador ATS
                      </div>
                      <div className="text-[11px] text-gray-600">
                        Compare seu currículo com a vaga.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Grammar & Impact Review */}
                <div
                  onClick={() => { onClose(); onOpenReview(); }}
                  className="p-3.5 rounded-xl border border-[#004A8D]/20 bg-gradient-to-r from-[#004A8D]/5 to-white hover:border-[#004A8D] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#004A8D] text-white rounded-xl group-hover:scale-105 transition-transform">
                      <FileCheck className="w-4 h-4 text-[#F7941D]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#004A8D]">
                        Revisor Gramatical & Linguagem
                      </div>
                      <div className="text-[11px] text-gray-600">
                        Detecte erros e substitua palavras fracas.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Translation Card */}
                <div
                  onClick={() => { onClose(); onOpenTranslate(); }}
                  className="p-3.5 rounded-xl border border-[#004A8D]/20 bg-gradient-to-r from-[#004A8D]/5 to-white hover:border-[#004A8D] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#004A8D] text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Globe className="w-4 h-4 text-[#F7941D]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#004A8D]">
                        Tradutor Multilíngue (EN/ES/FR/DE)
                      </div>
                      <div className="text-[11px] text-gray-600">
                        Traduza mantendo termos técnicos.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer (Senac Branding) */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-[10px] text-gray-600 font-semibold leading-tight">
              Desenvolvido Pela Turma Técnica de Desenvolvimento de Sistemas • Senac
            </p>
            <div className="flex justify-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-[#004A8D]" />
              <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
              <span className="w-2 h-2 rounded-full bg-[#FDC180]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
