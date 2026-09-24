import { useState } from 'react';
import Modal from './Modal';

interface SynthesisModalProps {
  jobTitle: string;
  onApply: (text: string) => void;
  onClose: () => void;
}

const SYNTHESES = [
  {
    type: 'executive',
    icon: '👔',
    label: 'Executivo / Foco em Resultados',
    description: 'Métricas, liderança e impacto no negócio',
    color: '#155491',
    bg: '#eef2f7',
    border: '#dde5f0',
    text: (title: string) => `Profissional sênior com sólida trajetória em ${title || 'gestão e liderança'}, com histórico comprovado de resultados expressivos. Liderou equipes multidisciplinares entregando projetos de alto impacto com redução de custos operacionais de até 30%. Expertise em planejamento estratégico, gestão por indicadores (KPIs) e desenvolvimento de talentos. Orientado a resultados e com forte capacidade analítica para tomada de decisão baseada em dados.`,
  },
  {
    type: 'technical',
    icon: '💻',
    label: 'Técnico / Especialista',
    description: 'Ferramentas, metodologias e execução técnica',
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc',
    text: (title: string) => `Especialista em ${title || 'tecnologia da informação'} com domínio avançado em ferramentas e metodologias de mercado. Atua com foco em excelência técnica, arquitetura de soluções escaláveis e implementação de boas práticas de desenvolvimento (CI/CD, Clean Code, SOLID). Experiência em projetos ágeis (Scrum, Kanban) e entrega contínua de software de qualidade. Comprometido com atualização constante e aplicação de inovação tecnológica.`,
  },
  {
    type: 'dynamic',
    icon: '🚀',
    label: 'Dinâmico / Criativo',
    description: 'Inovação, agilidade e fit cultural',
    color: '#f79633',
    bg: '#fff7ed',
    border: '#fcc284',
    text: (title: string) => `Profissional criativo e dinâmico em ${title || 'criação e inovação'}, apaixonado por transformar desafios complexos em soluções elegantes. Mentalidade de crescimento com capacidade de adaptação rápida a novas tecnologias e ambientes. Forte senso de colaboração, comunicação assertiva e habilidade em construir pontes entre times técnicos e áreas de negócio. Busca continuamente impactar positivamente pessoas e organizações por meio de soluções inovadoras.`,
  },
];

export default function SynthesisModal({ jobTitle, onApply, onClose }: SynthesisModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleApply(text: string) {
    setLoading(true);
    setTimeout(() => {
      onApply(text);
      setLoading(false);
      onClose();
    }, 600);
  }

  return (
    <Modal title="✨ Gerador Inteligente de Síntese de Qualificações" onClose={onClose}>
      <p className="text-sm text-[#64748b] mb-5">
        Escolha o estilo que melhor representa seu perfil para <strong className="text-[#1a2340]">{jobTitle || 'seu cargo'}</strong>:
      </p>
      <div className="flex flex-col gap-3">
        {SYNTHESES.map(s => (
          <div
            key={s.type}
            onClick={() => setSelected(s.type)}
            className="p-4 rounded-2xl border-2 cursor-pointer transition-all"
            style={{
              borderColor: selected === s.type ? s.color : '#e2e8f2',
              background: selected === s.type ? s.bg : 'white',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{s.icon}</span>
              <div>
                <div className="text-sm font-bold" style={{ color: s.color }}>{s.label}</div>
                <div className="text-xs text-[#94a3b8]">{s.description}</div>
              </div>
              {selected === s.type && (
                <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ background: s.color }}>✓</div>
              )}
            </div>
            <p className="text-xs text-[#475569] leading-relaxed line-clamp-3">{s.text(jobTitle)}</p>
            <button
              onClick={e => { e.stopPropagation(); handleApply(s.text(jobTitle)); }}
              disabled={loading}
              className="mt-3 w-full py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: s.color }}
            >
              {loading ? '⏳ Aplicando...' : '✓ Aplicar esta Síntese'}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
