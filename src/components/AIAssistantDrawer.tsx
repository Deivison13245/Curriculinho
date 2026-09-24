import { X, Sparkles, Target, Zap, CheckCircle2, AlertTriangle, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';
import type { ResumeData } from '../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  data: ResumeData;
  onOpenSynthesis: () => void;
  onOpenStar: () => void;
  onOpenReview: () => void;
  onOpenAts: () => void;
  onOpenExport: () => void;
}

export default function AIAssistantDrawer({
  isOpen,
  onClose,
  score,
  data,
  onOpenSynthesis,
  onOpenStar,
  onOpenReview,
  onOpenAts,
  onOpenExport,
}: AIAssistantDrawerProps) {
  if (!isOpen) return null;

  const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-500' : 'text-red-500';
  const scoreStroke = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  const circumference = 2 * Math.PI * 38;

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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          {/* Drawer Header */}
          <div className="p-5 bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h2 className="text-base font-bold leading-tight">Central de IA & Análise</h2>
                <p className="text-xs text-purple-200">Assistentes inteligentes para seu currículo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar gaveta de IA"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Widget: Saúde do Currículo */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-4 border border-purple-100 shadow-xs">
              <div className="flex items-center gap-4">
                {/* Score Gauge */}
                <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
                  <svg className="w-22 h-22 -rotate-90" viewBox="0 0 88 88">
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
                    <span className={`text-xl font-black ${scoreColor}`}>{score}%</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Score</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {score >= 80 ? 'Currículo Alta Compatibilidade' : score >= 60 ? 'Currículo em Evolução' : 'Necessita Melhorias'}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {score >= 80
                      ? 'Seu currículo possui excelente densidade de informações para passar nos filtros ATS.'
                      : 'Complete as seções recomendadas abaixo para aumentar suas chances de entrevista.'}
                  </p>
                </div>
              </div>

              {/* Status checklist */}
              <div className="mt-4 pt-3 border-t border-purple-100/80 space-y-2">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  Plano de Ação de Melhoria
                </div>

                {pendingRecs.length === 0 ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Parabéns! Seu currículo atende aos principais critérios recomendados.</span>
                  </div>
                ) : (
                  pendingRecs.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-gray-200 flex items-start justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex items-start gap-2 text-xs text-gray-700">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{rec.text}</span>
                      </div>
                      {rec.onAction && (
                        <button
                          onClick={() => {
                            onClose();
                            rec.onAction?.();
                          }}
                          className="shrink-0 text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>{rec.actionLabel}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* AI Tools Cards */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Ferramentas Inteligentes de IA
              </h3>
              <div className="space-y-3">
                {/* STAR Method Card */}
                <div
                  onClick={() => { onClose(); onOpenStar(); }}
                  className="p-4 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50/50 to-white hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-purple-900 group-hover:text-purple-700">
                        Assistente STAR para Experiências
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        Estruture suas conquistas em Situação, Tarefa, Ação e Resultado.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Synthesis AI Card */}
                <div
                  onClick={() => { onClose(); onOpenSynthesis(); }}
                  className="p-4 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-indigo-900 group-hover:text-indigo-700">
                        Gerador de Resumo Profissional
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        Crie sínteses de alto impacto adaptadas ao seu perfil.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* ATS Thermometer Card */}
                <div
                  onClick={() => { onClose(); onOpenAts(); }}
                  className="p-4 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50/50 to-white hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-cyan-900 group-hover:text-cyan-700">
                        Termômetro & Otimizador ATS
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        Compare seu currículo com a vaga desejada e insira palavras-chave.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Grammar & Impact Review */}
                <div
                  onClick={() => { onClose(); onOpenReview(); }}
                  className="p-4 rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50/50 to-white hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-amber-900 group-hover:text-amber-700">
                        Revisor Gramatical & Linguagem
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        Detecte erros e substitua palavras fracas por verbos de ação.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-500">
              Desenvolvido com padrão visual Jobseeker.com • Otimização ATS Ativa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
