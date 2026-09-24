import { useState } from 'react';
import Modal from './Modal';

interface ReviewModalProps {
  onApply: () => void;
  onClose: () => void;
}

const SUGGESTIONS = [
  { id: '1', category: 'Gramática', icon: '📖', original: 'Responsavel pelo gerenciamento de projetos', improved: 'Responsável pelo gerenciamento de projetos', type: 'fix' },
  { id: '2', category: 'Tom Corporativo', icon: '👔', original: 'Fiz várias melhorias no sistema', improved: 'Implementou melhorias significativas na arquitetura do sistema, resultando em maior eficiência operacional', type: 'enhance' },
  { id: '3', category: 'Clareza', icon: '💡', original: 'Trabalhei com muitas tecnologias', improved: 'Atuou com tecnologias como React, Node.js, PostgreSQL e Docker em ambiente de produção', type: 'clarify' },
  { id: '4', category: 'Gramática', icon: '📖', original: 'Fui responsavel por', improved: 'Foi responsável por', type: 'fix' },
  { id: '5', category: 'Tom Corporativo', icon: '👔', original: 'Ajudei o time a entregar', improved: 'Contribuiu ativamente para a entrega de metas da equipe dentro do prazo estabelecido', type: 'enhance' },
];

const CATEGORY_COLORS = {
  'Gramática': { bg: '#fef2f2', border: '#fecaca', text: '#ef4444', badge: '#fee2e2' },
  'Tom Corporativo': { bg: '#eef2f7', border: '#dde5f0', text: '#155491', badge: '#dde5f0' },
  'Clareza': { bg: '#fff7ed', border: '#fcc284', text: '#f79633', badge: '#fde8c8' },
};

export default function ReviewModal({ onApply, onClose }: ReviewModalProps) {
  const [checked, setChecked] = useState<string[]>(SUGGESTIONS.map(s => s.id));
  const [loading, setLoading] = useState(false);

  function toggle(id: string) {
    setChecked(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  }

  function handleApply() {
    setLoading(true);
    setTimeout(() => { onApply(); setLoading(false); onClose(); }, 700);
  }

  return (
    <Modal title="✨ Revisão Ortográfica, Gramatical e de Tom" onClose={onClose} wide>
      <p className="text-sm text-[#64748b] mb-4">
        {checked.length} de {SUGGESTIONS.length} sugestões selecionadas para aplicar:
      </p>

      <div className="flex flex-col gap-3 mb-5">
        {SUGGESTIONS.map(s => {
          const colors = CATEGORY_COLORS[s.category as keyof typeof CATEGORY_COLORS];
          const isChecked = checked.includes(s.id);
          return (
            <div
              key={s.id}
              className="p-4 rounded-2xl border transition-all cursor-pointer"
              style={{ borderColor: isChecked ? colors.border : '#e2e8f2', background: isChecked ? colors.bg : 'white' }}
              onClick={() => toggle(s.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={isChecked} onChange={() => toggle(s.id)} className="rounded accent-[#155491]" onClick={e => e.stopPropagation()} />
                <span className="text-sm">{s.icon}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: colors.text, background: colors.badge }}>{s.category}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-[#fef2f2] border border-[#fecaca]">
                  <div className="text-[10px] font-bold text-[#ef4444] mb-1">❌ Antes</div>
                  <span className="text-[#475569]">"{s.original}"</span>
                </div>
                <div className="p-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
                  <div className="text-[10px] font-bold text-[#16a34a] mb-1">✅ Depois</div>
                  <span className="text-[#1a2340] font-medium">"{s.improved}"</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setChecked(SUGGESTIONS.map(s => s.id))}
          className="flex-1 py-2.5 rounded-xl border border-[#e2e8f2] text-sm font-semibold text-[#64748b] hover:bg-[#f8fafc] transition-all"
        >
          Selecionar todas
        </button>
        <button
          onClick={handleApply}
          disabled={loading || checked.length === 0}
          className="flex-2 flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #155491, #f79633)' }}
        >
          {loading ? '⏳ Aplicando...' : `✓ Aplicar ${checked.length} Correções`}
        </button>
      </div>
    </Modal>
  );
}
