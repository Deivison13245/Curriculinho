import { useState } from 'react';
import Modal from './Modal';

interface ExportModalProps {
  name: string;
  jobTitle: string;
  onClose: () => void;
  onToast: (msg: string) => void;
}

const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

const TONES = [
  { id: 'executive', icon: '👔', label: 'Executivo' },
  { id: 'modern', icon: '🚀', label: 'Moderno' },
  { id: 'technical', icon: '💻', label: 'Técnico' },
];

const COVER_LETTERS: Record<string, string> = {
  executive: `Prezados Senhores,\n\nÉ com grande satisfação que submeto minha candidatura para a posição de {title}. Com trajetória sólida e resultados comprovados na área, estou confiante de que minha experiência estratégica e visão de negócios contribuirão significativamente para os objetivos da sua organização.\n\nAo longo da minha carreira, desenvolvi competências avançadas em liderança de equipes de alta performance, gestão de projetos complexos e entrega de resultados acima das metas estabelecidas. Meu histórico inclui iniciativas que geraram impacto direto em receita e eficiência operacional.\n\nEspero a oportunidade de aprofundar como posso agregar valor à sua equipe.\n\nAtenciosamente,\n{name}`,
  modern: `Olá!\n\nFicaria muito feliz em fazer parte do time de {title} de vocês! Sou apaixonado(a) por desafios, tenho mentalidade de crescimento e adoro trabalhar em ambientes colaborativos onde posso aprender e impactar.\n\nMinha experiência une habilidades técnicas sólidas com soft skills desenvolvidas — comunicação clara, adaptabilidade e senso de ownership. Entrego resultados sem abrir mão da qualidade e do trabalho em equipe.\n\nVamos conversar? Estou pronto(a) para agregar!\n\nAbraços,\n{name}`,
  technical: `Prezada equipe,\n\nCandidato-me à vaga de {title} com base no alinhamento entre meu stack técnico e os requisitos descritos. Minha experiência inclui implementação de soluções escaláveis com foco em Clean Code, testes automatizados e entrega contínua (CI/CD).\n\nDomino as tecnologias mencionadas e tenho capacidade comprovada de resolver problemas complexos de arquitetura e performance em ambiente de produção. Sou adepto de metodologias ágeis e cultura DevOps.\n\nAgradeço a consideração e estou disponível para uma avaliação técnica.\n\nAtenciosamente,\n{name}`,
};

export default function ExportModal({ name, jobTitle, onClose, onToast }: ExportModalProps) {
  const [tab, setTab] = useState<'translate' | 'cover'>('translate');
  const [selectedLang, setSelectedLang] = useState('pt');
  const [selectedTone, setSelectedTone] = useState('executive');
  const [generated, setGenerated] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);

  const coverText = COVER_LETTERS[selectedTone]
    ?.replace('{name}', name || 'Seu Nome')
    .replace('{title}', jobTitle || 'a vaga em aberto');

  function handleGenerateCover() {
    setLoadingCover(true);
    setTimeout(() => { setGenerated(true); setLoadingCover(false); }, 900);
  }

  function handleCopy() {
    navigator.clipboard.writeText(coverText || '');
    onToast('✓ Carta copiada para a área de transferência!');
  }

  return (
    <Modal title="📤 Exportação Avançada" onClose={onClose} wide>
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[#F8FAFC] rounded-xl border border-[#e2e8f2] mb-5">
        {[
          { id: 'translate', label: '🌐 Tradução em 1 Clique' },
          { id: 'cover', label: '✉️ Carta de Apresentação' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'translate' | 'cover')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.id ? 'bg-white text-[#155491] shadow-sm border border-[#e2e8f2]' : 'text-[#64748b] hover:text-[#155491]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'translate' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#64748b]">Traduza seu currículo preservando jargões técnicos e formatação profissional:</p>
          <div className="flex gap-3">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setSelectedLang(l.code)}
                className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                  selectedLang === l.code ? 'border-[#155491] bg-[#eef2f7]' : 'border-[#e2e8f2] bg-white hover:border-[#b0c4de]'
                }`}
              >
                <span className="text-3xl">{l.flag}</span>
                <span className="text-xs font-bold text-[#1a2340]">{l.label}</span>
                {selectedLang === l.code && <span className="text-[10px] text-[#155491] font-semibold">✓ Selecionado</span>}
              </button>
            ))}
          </div>
          <div className="p-3 bg-[#fff7ed] border border-[#fcc284] rounded-xl text-xs text-[#7a3e00]">
            <strong>⚠️ Nota:</strong> Termos técnicos como "React", "Node.js", "Docker" e siglas de certificações são preservados no idioma original conforme padrão internacional.
          </div>
          <div className="flex gap-3">
            <button onClick={() => onToast('✓ Tradução aplicada ao formulário!')} className="flex-1 py-2.5 rounded-xl border border-[#155491] text-[#155491] text-sm font-bold hover:bg-[#eef2f7] transition-all">
              ✓ Aplicar no Form
            </button>
            <button onClick={() => onToast('✓ PDF traduzido gerado!')} className="flex-1 py-2.5 rounded-xl bg-[#155491] text-white text-sm font-bold hover:bg-[#0e3d6b] transition-all">
              📄 Exportar PDF Traduzido
            </button>
          </div>
        </div>
      )}

      {tab === 'cover' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#64748b]">Selecione o tom da carta e gere automaticamente:</p>
          <div className="flex gap-2">
            {TONES.map(t => (
              <button
                key={t.id}
                onClick={() => { setSelectedTone(t.id); setGenerated(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                  selectedTone === t.id ? 'border-[#f79633] bg-[#fff7ed] text-[#f79633]' : 'border-[#e2e8f2] text-[#64748b] hover:border-[#fcc284]'
                }`}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerateCover}
            disabled={loadingCover}
            className="py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #155491, #f79633)' }}
          >
            {loadingCover ? '⏳ Gerando carta...' : '✨ Gerar Carta de Apresentação'}
          </button>

          {generated && (
            <>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#e2e8f2] text-sm text-[#334155] leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
                {coverText}
              </div>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#e2e8f2] text-sm font-bold text-[#64748b] hover:bg-[#f8fafc] transition-all">
                  📋 Copiar Texto
                </button>
                <button onClick={() => onToast('✓ Carta exportada em Word!')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#155491] text-white text-sm font-bold hover:bg-[#0e3d6b] transition-all">
                  📄 Baixar Word
                </button>
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f1f5f9] text-[#475569] text-sm font-bold hover:bg-[#e2e8f0] transition-all">
                  🖨️
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
