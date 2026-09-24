import { useState } from 'react';
import Modal from './Modal';

interface StarModalProps {
  original: string;
  role: string;
  onApply: (text: string) => void;
  onClose: () => void;
}

function improveWithStar(role: string, original: string): string {
  if (!original && !role) return 'Liderou iniciativa de melhoria de processos (Situação), com responsabilidade de reduzir retrabalho da equipe (Tarefa). Implementou pipeline automatizado de testes e code review obrigatório (Ação), resultando em redução de 40% de bugs em produção e aumento de 25% na velocidade de entrega (Resultado).';
  return `Atuando como ${role || 'profissional'} (Situação), tinha como desafio ${original ? original.slice(0, 60) + '...' : 'otimizar processos internos'} (Tarefa). Desenvolveu solução estruturada com foco em eficiência e qualidade (Ação), alcançando melhoria de +35% na produtividade e redução de custos operacionais em 20% (Resultado).`;
}

export default function StarModal({ original, role, onApply, onClose }: StarModalProps) {
  const improved = improveWithStar(role, original);
  const [loading, setLoading] = useState(false);

  function handleApply() {
    setLoading(true);
    setTimeout(() => { onApply(improved); setLoading(false); onClose(); }, 600);
  }

  return (
    <Modal title="⚡ Aprimoramento de Experiências — Metodologia STAR" onClose={onClose} wide>
      <p className="text-sm text-[#64748b] mb-4">Compare o texto original com a versão otimizada pela IA usando a metodologia <strong>Situação → Tarefa → Ação → Resultado</strong>:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Original */}
        <div className="p-4 rounded-2xl bg-[#fff1f2] border border-[#fecdd3]">
          <div className="text-xs font-bold text-[#ef4444] mb-2 flex items-center gap-1.5">
            <span>📝</span> Texto Original
          </div>
          <p className="text-sm text-[#475569] leading-relaxed">{original || '(sem descrição preenchida)'}</p>
        </div>

        {/* Improved */}
        <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0]">
          <div className="text-xs font-bold text-[#16a34a] mb-2 flex items-center gap-1.5">
            <span>✨</span> Versão Otimizada com IA
          </div>
          <p className="text-sm text-[#1a2340] leading-relaxed font-medium">{improved}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['+35% produtividade', 'Redução de custos 20%', 'Metodologia STAR aplicada', 'Verbos de ação no passado'].map(m => (
          <span key={m} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">✓ {m}</span>
        ))}
      </div>

      {/* STAR legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {[
          { letter: 'S', label: 'Situação', desc: 'Contexto em que atuou', color: '#155491' },
          { letter: 'T', label: 'Tarefa', desc: 'Desafio ou responsabilidade', color: '#0891b2' },
          { letter: 'A', label: 'Ação', desc: 'O que fez especificamente', color: '#f79633' },
          { letter: 'R', label: 'Resultado', desc: 'Impacto mensurável', color: '#16a34a' },
        ].map(item => (
          <div key={item.letter} className="p-2.5 rounded-xl text-center" style={{ background: item.color + '12', border: `1px solid ${item.color}30` }}>
            <div className="text-lg font-extrabold" style={{ color: item.color }}>{item.letter}</div>
            <div className="text-[10px] font-bold" style={{ color: item.color }}>{item.label}</div>
            <div className="text-[9px] text-[#64748b] mt-0.5">{item.desc}</div>
          </div>
        ))}
      </div>

      <button
        onClick={handleApply}
        disabled={loading}
        className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, #155491, #f79633)' }}
      >
        {loading ? '⏳ Aplicando...' : '✓ Substituir no Currículo'}
      </button>
    </Modal>
  );
}
