import { useState } from 'react';

interface HealthBannerProps {
  score: number;
}

const alerts = [
  { type: 'critical', label: '1 Crítico', color: '#ef4444', bg: '#fef2f2', border: '#fecaca', emoji: '🔴', detail: 'Resumo profissional muito curto (menos de 50 palavras)' },
  { type: 'warning', label: '2 Avisos', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', emoji: '🟡', detail: 'Inclua ao menos 1 experiência profissional e uma certificação relevante' },
  { type: 'ok', label: '5 Otimizados', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', emoji: '🟢', detail: 'Dados pessoais, contatos, formação, habilidades e objetivo preenchidos' },
];

const circumference = 2 * Math.PI * 36;

export default function HealthBanner({ score }: HealthBannerProps) {
  const [expanded, setExpanded] = useState(false);

  const scoreLabel = score >= 80 ? 'Estrutura Sólida para ATS' : score >= 60 ? 'Melhorias Recomendadas' : 'Atenção Necessária';
  const scoreColor = score >= 80 ? '#16a34a' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="bg-white border border-[#e2e8f2] rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 flex items-center gap-4 flex-wrap">
        {/* Score ring */}
        <div className="shrink-0 relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#eef2f7" strokeWidth="7" />
            <circle
              cx="40" cy="40" r="36" fill="none"
              stroke={scoreColor} strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - score / 100)}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold" style={{ color: scoreColor }}>{score}%</span>
          </div>
        </div>

        {/* Label + alerts */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-[#1a2340] mb-0.5">Saúde do Currículo</div>
          <div className="text-xs text-[#64748b] mb-2 font-medium">{scoreLabel}</div>
          <div className="flex flex-wrap gap-2">
            {alerts.map(a => (
              <button
                key={a.type}
                onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                style={{ color: a.color, background: a.bg, borderColor: a.border }}
              >
                <span>{a.emoji}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="ml-auto shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#155491] text-white hover:bg-[#0e3d6b] transition-all"
        >
          <span>{expanded ? '▲' : '▼'}</span>
          <span>Ver Recomendações</span>
        </button>
      </div>

      {/* Expanded recommendations */}
      {expanded && (
        <div className="border-t border-[#e2e8f2] px-4 py-3 bg-[#F8FAFC] flex flex-col gap-2">
          {alerts.map(a => (
            <div key={a.type} className="flex items-start gap-3 p-3 rounded-xl border" style={{ background: a.bg, borderColor: a.border }}>
              <span className="text-base mt-0.5">{a.emoji}</span>
              <div>
                <div className="text-xs font-bold mb-0.5" style={{ color: a.color }}>{a.label}</div>
                <div className="text-xs text-[#475569]">{a.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
