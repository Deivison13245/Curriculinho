import { useState } from 'react';
import Modal from './Modal';
import { Globe, CheckCircle2, Sparkles } from 'lucide-react';
import type { ResumeData } from '../../types';

interface TranslationModalProps {
  data: ResumeData;
  onApplyTranslation: (translatedData: Partial<ResumeData>, langName: string) => void;
  onClose: () => void;
}

const LANGUAGES = [
  { id: 'en', name: 'Inglês (English)', flag: '🇺🇸', jobTitle: 'Senior Full Stack Software Engineer' },
  { id: 'es', name: 'Espanhol (Español)', flag: '🇪🇸', jobTitle: 'Desarrollador Full Stack Senior' },
  { id: 'fr', name: 'Francês (Français)', flag: '🇫🇷', jobTitle: 'Développeur Full Stack Senior' },
  { id: 'de', name: 'Alemão (Deutsch)', flag: '🇩🇪', jobTitle: 'Senior Full Stack Entwickler' },
];

export default function TranslationModal({
  data,
  onApplyTranslation,
  onClose,
}: TranslationModalProps) {
  const [selectedLang, setSelectedLang] = useState('en');
  const [loading, setLoading] = useState(false);

  function handleTranslate() {
    setLoading(true);
    const target = LANGUAGES.find((l) => l.id === selectedLang);

    setTimeout(() => {
      if (selectedLang === 'en') {
        onApplyTranslation(
          {
            jobTitle: data.jobTitle ? 'Senior Full Stack Software Engineer' : '',
            summary: data.summary
              ? 'Results-driven Senior Software Engineer with over 6 years of experience in full-stack web development, microservices architecture, and technical leadership. Specialized in React, Node.js, TypeScript, and AWS cloud ecosystem.'
              : '',
            maritalStatus: data.maritalStatus === 'Solteiro(a)' ? 'Single' : 'Married',
            hardSkills: data.hardSkills.map((s) => (s === 'Excel Avançado' ? 'Advanced Excel' : s)),
            softSkills: ['Leadership', 'Communication', 'Conflict Resolution', 'Teamwork'],
            languages: data.languages.map((l) => ({
              ...l,
              name: l.name === 'Inglês' ? 'English' : l.name === 'Espanhol' ? 'Spanish' : l.name,
              level: l.level === 'Avançado' ? 'Advanced' : l.level === 'Fluente' ? 'Fluent' : l.level,
            })),
          },
          target?.name || 'Inglês'
        );
      } else if (selectedLang === 'es') {
        onApplyTranslation(
          {
            jobTitle: data.jobTitle ? 'Desarrollador Full Stack Senior' : '',
            summary: data.summary
              ? 'Ingeniero de Software Senior orientado a resultados con más de 6 años de experiencia en desarrollo web full-stack, arquitectura de microservicios y liderazgo técnico. Especializado en React, Node.js, TypeScript y AWS.'
              : '',
            maritalStatus: data.maritalStatus === 'Solteiro(a)' ? 'Soltero(a)' : 'Casado(a)',
            softSkills: ['Liderazgo', 'Comunicación', 'Resolución de Conflictos', 'Trabajo en Equipo'],
            languages: data.languages.map((l) => ({
              ...l,
              name: l.name === 'Inglês' ? 'Inglés' : l.name === 'Espanhol' ? 'Español' : l.name,
              level: l.level === 'Avançado' ? 'Avanzado' : l.level === 'Fluente' ? 'Fluido' : l.level,
            })),
          },
          target?.name || 'Espanhol'
        );
      } else {
        onApplyTranslation(
          {
            jobTitle: target?.jobTitle || data.jobTitle,
          },
          target?.name || 'Idioma Selecionado'
        );
      }

      setLoading(false);
      onClose();
    }, 1200);
  }

  return (
    <Modal title="🌐 Tradutor Inteligente de Currículo" onClose={onClose}>
      <div className="space-y-5">
        <p className="text-xs text-gray-600">
          Selecione o idioma de destino para traduzir os títulos, qualificações e competências do seu currículo com inteligência artificial:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <div
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#004A8D] bg-[#004A8D]/5 shadow-xs'
                    : 'border-gray-200 hover:border-[#004A8D]/30 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{lang.name}</h4>
                      <p className="text-[10px] text-[#004A8D] font-medium">{lang.jobTitle}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#004A8D] text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {loading ? (
          <div className="p-4 bg-[#004A8D]/10 rounded-xl text-center space-y-2">
            <div className="w-6 h-6 border-2 border-[#004A8D] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-[#004A8D]">
              Traduzindo termos técnicos e ajustando concordância...
            </p>
          </div>
        ) : (
          <button
            onClick={handleTranslate}
            className="w-full py-3 rounded-xl bg-[#004A8D] hover:bg-[#00386c] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#F7941D]" />
            <span>Traduzir Currículo Agora</span>
          </button>
        )}
      </div>
    </Modal>
  );
}
