import { useState } from 'react';
import Modal from './Modal';

interface AtsModalProps {
  resumeSkills: string[];
  onApplyTitle: (title: string) => void;
  onAddSkill: (skill: string) => void;
  onClose: () => void;
}

const SAMPLE_JOB = `Desenvolvedor Full Stack Sênior
Requisitos: React, Node.js, TypeScript, PostgreSQL, Docker, AWS, Git, Scrum, REST API, Inglês Avançado, Liderança técnica, Mentoria, Microsserviços`;

const ACTION_PLAN = [
  { icon: '🎯', title: 'Objetivo', tip: 'Alinhe o cargo desejado ao título exato da vaga para maximizar a compatibilidade com o ATS.' },
  { icon: '📝', title: 'Resumo', tip: 'Inclua 3-5 palavras-chave ausentes naturalmente no resumo profissional.' },
  { icon: '⚡', title: 'Experiências STAR', tip: 'Use verbos de ação do passado e inclua métricas quantificáveis em cada experiência.' },
  { icon: '📚', title: 'Formação & Cursos', tip: 'Adicione cursos e certificações relacionados às tecnologias listadas na vaga.' },
];

export default function AtsModal({ resumeSkills, onApplyTitle, onAddSkill, onClose }: AtsModalProps) {
  const [jobText, setJobText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [suggestedTitle] = useState('Desenvolvedor Full Stack Sênior');

  const presentKeywords = ['React', 'Node.js', 'TypeScript', 'Git', 'Scrum', 'REST API'];
  const missingKeywords = ['PostgreSQL', 'Docker', 'AWS', 'Microsserviços', 'Inglês Avançado', 'Mentoria'];

  function handleAnalyze() {
    if (!jobText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setScore(67);
      setAnalyzed(true);
      setLoading(false);
    }, 1200);
  }

  const scoreColor = score >= 80 ? '#16a34a' : score >= 60 ? '#f59e0b' : '#ef4444';
  const scoreLabel = score >= 80 ? 'Alta Compatibilidade' : score >= 60 ? 'Compatibilidade Média' : 'Baixa Compatibilidade';
  const circumference = 2 * Math.PI * 52;

  return (
    <Modal title="🌡️ Termômetro de Vaga & Otimizador ATS" onClose={onClose} wide>
      {/* Job input */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#475569] mb-2">Cole aqui a descrição ou requisitos da vaga:</label>
        <textarea
          rows={4}
          value={jobText}
          onChange={e => setJobText(e.target.value)}
          placeholder={SAMPLE_JOB}
          className="w-full px-4 py-3 rounded-xl border border-[#e2e8f2] text-sm text-[#1a2340] bg-[#F8FAFC] placeholder-[#cbd5e1] resize-none"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !jobText.trim()}
          className="mt-2 w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: loading ? '#94a3b8' : 'linear-gradient(135deg, #155491, #f79633)' }}
        >
          {loading ? '⏳ Analisando compatibilidade...' : '🔍 Analisar Compatibilidade com a Vaga'}
        </button>
      </div>

      {/* Loading shimmer */}
      {loading && (
        <div className="flex flex-col gap-3 mb-4">
          {[1, 2, 3].map(i => <div key={i} className="shimmer h-12 rounded-xl" />)}
        </div>
      )}

      {/* Results */}
      {analyzed && !loading && (
        <div className="flex flex-col gap-4">
          {/* Score gauge */}
          <div className="flex items-center gap-6 p-4 bg-[#F8FAFC] rounded-2xl border border-[#e2e8f2]">
            <div className="relative shrink-0 w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#eef2f7" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={scoreColor} strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)}
                  style={{ transition: 'stroke-dashoffset 1s ease' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold" style={{ color: scoreColor }}>{score}%</span>
              </div>
            </div>
            <div>
              <div className="text-lg font-extrabold" style={{ color: scoreColor }}>{scoreLabel}</div>
              <div className="text-sm text-[#64748b] mb-3">Baseado na descrição da vaga analisada</div>
              <div className="flex items-center gap-2 p-2 bg-[#eef2f7] rounded-xl">
                <span>🎯</span>
                <span className="text-xs text-[#155491] font-semibold">Cargo Recomendado: <strong>{suggestedTitle}</strong></span>
                <button onClick={() => { onApplyTitle(suggestedTitle); onClose(); }} className="ml-auto px-2 py-1 rounded-lg bg-[#155491] text-white text-xs font-bold hover:bg-[#0e3d6b] transition-all whitespace-nowrap">🎯 Aplicar</button>
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0]">
              <div className="text-xs font-bold text-[#16a34a] mb-3">✅ Palavras-chave Encontradas ({presentKeywords.length})</div>
              <div className="flex flex-wrap gap-2">
                {presentKeywords.map(kw => (
                  <span key={kw} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">✓ {kw}</span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#fff7ed] border border-[#fcc284]">
              <div className="text-xs font-bold text-[#f79633] mb-3">❌ Palavras-chave Ausentes ({missingKeywords.length})</div>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map(kw => (
                  <button
                    key={kw}
                    onClick={() => onAddSkill(kw)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#f79633] border border-[#fcc284] hover:bg-[#f79633] hover:text-white transition-all"
                  >
                    + {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action plan */}
          <div>
            <div className="text-xs font-bold text-[#1a2340] mb-3">🗺️ Plano de Ação para Superar o ATS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACTION_PLAN.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#e2e8f2] flex gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-[#155491] mb-0.5">{item.title}</div>
                    <div className="text-[10px] text-[#64748b] leading-relaxed">{item.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
