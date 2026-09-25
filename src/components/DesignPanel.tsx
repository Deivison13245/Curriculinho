import type { ResumeDesign } from '../types';
import { Palette, Type, Layout, Maximize2, Check } from 'lucide-react';

interface DesignPanelProps {
  design: ResumeDesign;
  onChange: (design: ResumeDesign) => void;
}

const TEMPLATES: { id: ResumeDesign['template']; title: string; desc: string; color: string }[] = [
  { id: 'jobseeker', title: 'Currículo Express Senac', desc: 'Design vibrante com azul Senac e destaque no cabeçalho.', color: '#004A8D' },
  { id: 'modern', title: 'Corporativo Blue', desc: 'Estilo corporativo tradicional com tons azuis e linhas organizadas.', color: '#1E40AF' },
  { id: 'elegant', title: 'Slate Elegante', desc: 'Linhas finas, tons sóbrios de cinza e acabamento executivo minimalista.', color: '#334155' },
  { id: 'executive', title: 'Executivo Serif', desc: 'Fontes elegantes no título, divisórias destacadas e toque clássico.', color: '#059669' },
  { id: 'minimalist', title: 'Minimalista ATS', desc: 'Máxima densidade de texto com fundo limpo focado em filtros ATS.', color: '#1E293B' },
];

const COLOR_SWATCHES = [
  { name: 'AZUL Senac', hex: '#004A8D' },
  { name: 'LARANJA Senac', hex: '#F7941D' },
  { name: 'LARANJA Claro Senac', hex: '#FDC180' },
  { name: 'Roxo Vibrante', hex: '#7C3AED' },
  { name: 'Azul Escuro', hex: '#0F172A' },
  { name: 'Verde Esmeralda', hex: '#059669' },
  { name: 'Vermelho Carmim', hex: '#DC2626' },
  { name: 'Cinza Grafite', hex: '#475569' },
];

const FONTS = [
  { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Padrão Moderno)' },
  { id: 'Inter', label: 'Inter (Clean & Tecnológico)' },
  { id: 'Roboto', label: 'Roboto (Neutro & Legível)' },
  { id: 'Merriweather', label: 'Merriweather (Serifado Clássico)' },
];

export default function DesignPanel({ design, onChange }: DesignPanelProps) {
  function update(patch: Partial<ResumeDesign>) {
    onChange({ ...design, ...patch });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-[#004A8D] to-[#003463] text-white rounded-2xl p-6 shadow-md border border-[#F7941D]/30">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#F7941D]" />
          Personalização de Design & Layout
        </h2>
        <p className="text-xs text-[#FDC180] mt-1 font-medium">
          Ajuste as cores, tipografia, modelos e margens do seu currículo em tempo real.
        </p>
      </div>

      {/* 1. SELEÇÃO DE MODELOS (TEMPLATES) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Layout className="w-4 h-4 text-[#004A8D]" />
          Escolha o Modelo (Template)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((t) => {
            const isSelected = design.template === t.id;
            return (
              <div
                key={t.id}
                onClick={() => update({ template: t.id })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'border-[#004A8D] bg-[#004A8D]/5 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-[#004A8D]/30 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block"
                      style={{ backgroundColor: t.color }}
                    />
                    <h4 className="text-xs font-bold text-gray-900">{t.title}</h4>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#004A8D] text-white flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5 text-[#F7941D]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. COR PRIMÁRIA & PALETA */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#004A8D]" />
          Cor Primária de Destaque
        </h3>

        <div className="flex flex-wrap gap-3 items-center">
          {COLOR_SWATCHES.map((swatch) => {
            const isSelected = design.primaryColor.toLowerCase() === swatch.hex.toLowerCase();
            return (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => update({ primaryColor: swatch.hex })}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'ring-4 ring-[#004A8D]/30 scale-110 shadow-sm' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={swatch.name}
              >
                {isSelected && <Check className="w-5 h-5 text-white" />}
              </button>
            );
          })}

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500 font-medium">Hex customizado:</span>
            <input
              type="color"
              value={design.primaryColor}
              onChange={e => update({ primaryColor: e.target.value })}
              className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. TIPOGRAFIA & TAMANHO */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Type className="w-4 h-4 text-[#004A8D]" />
          Tipografia & Tamanho da Fonte
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Fonte Principal</label>
            <div className="space-y-2">
              {FONTS.map(f => (
                <label
                  key={f.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    design.fontFamily === f.id
                      ? 'border-[#004A8D] bg-[#004A8D]/5 font-bold text-[#004A8D]'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xs" style={{ fontFamily: f.id }}>{f.label}</span>
                  <input
                    type="radio"
                    name="fontFamily"
                    checked={design.fontFamily === f.id}
                    onChange={() => update({ fontFamily: f.id })}
                    className="text-[#004A8D] focus:ring-[#004A8D]"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Tamanho do Texto</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sm', label: 'Pequeno (ATS)' },
                  { id: 'md', label: 'Médio (Padrão)' },
                  { id: 'lg', label: 'Grande' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => update({ fontSize: s.id as ResumeDesign['fontSize'] })}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      design.fontSize === s.id
                        ? 'border-[#004A8D] bg-[#004A8D] text-white'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Margens */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
                Espaçamento das Margens
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'compact', label: 'Compacto' },
                  { id: 'normal', label: 'Normal' },
                  { id: 'spacious', label: 'Espaçoso' },
                ].map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => update({ spacing: sp.id as ResumeDesign['spacing'] })}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      design.spacing === sp.id
                        ? 'border-[#004A8D] bg-[#004A8D] text-white'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
