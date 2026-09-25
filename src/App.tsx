import { useState, useCallback, useEffect } from 'react';
import type { ResumeData, ModalType, Toast, TabType } from './types';
import Header from './components/Header';
import FormPanel from './components/FormPanel';
import DesignPanel from './components/DesignPanel';
import PreviewPanel from './components/PreviewPanel';
import AIAssistantDrawer from './components/AIAssistantDrawer';
import FloatingDownloadButton from './components/FloatingDownloadButton';
import ToastContainer from './components/Toast';

import SynthesisModal from './components/modals/SynthesisModal';
import StarModal from './components/modals/StarModal';
import ReviewModal from './components/modals/ReviewModal';
import AtsModal from './components/modals/AtsModal';
import ExportModal from './components/modals/ExportModal';
import ImportModal from './components/modals/ImportModal';
import TranslationModal from './components/modals/TranslationModal';

import { exportToWord } from './utils/wordExport';

const DEFAULT_DATA: ResumeData = {
  name: 'Ana Paula Ferreira',
  jobTitle: 'Desenvolvedora Full Stack Sênior',
  email: 'ana.paula@exemplo.com',
  phone: '(11) 98765-4321',
  city: 'São Paulo',
  state: 'SP',

  birthDate: '',
  maritalStatus: 'Solteiro(a)',
  driverLicense: '',
  linkedin: 'linkedin.com/in/anapaula',
  github: 'github.com/anapaula',
  portfolio: '',
  nationality: 'Brasileira',

  summary:
    'Engenheira de Software com mais de 6 anos de experiência em desenvolvimento web full stack, arquitetura de sistemas distribuídos e liderança técnica. Especialista em React, Node.js, TypeScript e ecossistema cloud AWS.',
  education: [
    {
      id: 'edu1',
      degree: 'Graduação',
      course: 'Ciência da Computação',
      institution: 'Universidade de São Paulo (USP)',
      year: '2021',
      period: 'Noturno',
    },
  ],
  experience: [
    {
      id: 'exp1',
      role: 'Engenheira de Software Sênior',
      company: 'Tech Solutions SA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description:
        'Liderança técnica no desenvolvimento da nova plataforma de microsserviços. Redução de 40% na latência das APIs principais e mentoria de 5 desenvolvedores plenos.',
    },
  ],
  hardSkills: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'SQL'],
  softSkills: ['Liderança', 'Comunicação', 'Resolução de Conflitos', 'Trabalho em Equipe'],
  languages: [
    { id: 'lang1', name: 'Inglês', level: 'Avançado' },
    { id: 'lang2', name: 'Espanhol', level: 'Intermediário' },
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
  ],
  projects: [],
  customSections: [],

  enabledSections: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
    projects: false,
    custom: false,
  },

  enabledPersonalFields: {
    birthDate: false,
    maritalStatus: true,
    driverLicense: false,
    linkedin: true,
    github: true,
    portfolio: false,
    nationality: false,
  },

  design: {
    template: 'jobseeker',
    primaryColor: '#004A8D',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 'md',
    spacing: 'normal',
  },
};

function computeScore(data: ResumeData): number {
  let s = 15;
  if (data.name) s += 15;
  if (data.email) s += 5;
  if (data.phone) s += 5;
  if (data.jobTitle) s += 10;
  if (data.summary && data.summary.length > 50) s += 15;
  if (data.experience.some((e) => e.role && e.company)) s += 15;
  if (data.education.some((e) => e.course || e.institution)) s += 10;
  if (data.hardSkills.length >= 3) s += 5;
  if (data.languages.some((l) => l.name)) s += 5;
  return Math.min(s, 100);
}

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('curriculo-express-data-jobseeker');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_DATA;
      }
    }
    return DEFAULT_DATA;
  });

  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [activeExpId, setActiveExpId] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('curriculo-express-data-jobseeker', JSON.stringify(data));
  }, [data]);

  // Keyboard shortcut listener (Esc closes drawer & modals)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setModal(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function addToast(message: string, type: Toast['type'] = 'success') {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
  }

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  function handlePrint() {
    // Automatically switch to preview tab so only the A4 resume prints!
    setActiveTab('preview');
    setTimeout(() => {
      window.print();
    }, 150);
  }

  function handleExportWord() {
    exportToWord(data);
    addToast('✓ Exportação para Word (.doc) concluída com sucesso!');
  }

  const score = computeScore(data);
  const activeExp = data.experience.find((e) => e.id === activeExpId);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* 1. HEADER MINIMALISTA COM NAVEGAÇÃO EM ABAS */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        score={score}
        aiActive
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'content' && (
          <FormPanel
            data={data}
            onChange={setData}
            onOpenSynthesis={() => setModal('synthesis')}
            onOpenStar={(expId) => {
              setActiveExpId(expId);
              setModal('star');
            }}
            onOpenReview={() => setModal('review')}
            onOpenImportModal={() => setModal('import')}
          />
        )}

        {activeTab === 'design' && (
          <DesignPanel
            design={data.design}
            onChange={(design) => setData((d) => ({ ...d, design }))}
          />
        )}

        {activeTab === 'preview' && (
          <PreviewPanel
            data={data}
            onPrint={handlePrint}
            onExportWord={handleExportWord}
            onOpenExport={() => setModal('export')}
            onOpenTranslate={() => setModal('translate')}
          />
        )}
      </main>

      {/* 2. MENU HAMBÚRGUER / DRAWER DE IA E SAÚDE DO CURRÍCULO */}
      <AIAssistantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        score={score}
        data={data}
        onOpenSynthesis={() => setModal('synthesis')}
        onOpenStar={() => {
          const firstExpId = data.experience[0]?.id || '';
          setActiveExpId(firstExpId);
          setModal('star');
        }}
        onOpenReview={() => setModal('review')}
        onOpenAts={() => setModal('ats')}
        onOpenExport={() => setModal('export')}
        onOpenTranslate={() => setModal('translate')}
      />

      {/* 3. BOTÃO FIXO DE DOWNLOAD PDF */}
      <FloatingDownloadButton onDownload={handlePrint} score={score} />

      {/* MODALS DE IA, TRADUÇÃO & EXPORTAÇÃO */}
      {modal === 'synthesis' && (
        <SynthesisModal
          jobTitle={data.jobTitle}
          onApply={(text) => {
            setData((d) => ({ ...d, summary: text }));
            addToast('✓ Síntese profissional aplicada com sucesso!');
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'star' && activeExp && (
        <StarModal
          role={activeExp.role}
          original={activeExp.description}
          onApply={(text) => {
            setData((d) => ({
              ...d,
              experience: d.experience.map((e) =>
                e.id === activeExpId ? { ...e, description: text } : e
              ),
            }));
            addToast('✓ Experiência otimizada com o Método STAR!');
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'review' && (
        <ReviewModal
          onApply={() => addToast('✓ Correções gramaticais e de impacto aplicadas!')}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'ats' && (
        <AtsModal
          resumeSkills={data.hardSkills}
          onApplyTitle={(title) => {
            setData((d) => ({ ...d, jobTitle: title }));
            addToast('✓ Cargo alinhado com a vaga ATS!');
          }}
          onAddSkill={(skill) => {
            setData((d) => ({ ...d, hardSkills: [...d.hardSkills, skill] }));
            addToast(`✓ Habilidade "${skill}" adicionada ao currículo!`);
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'export' && (
        <ExportModal
          name={data.name}
          jobTitle={data.jobTitle}
          onClose={() => setModal(null)}
          onToast={(msg) => addToast(msg)}
        />
      )}

      {modal === 'import' && (
        <ImportModal
          onClose={() => setModal(null)}
          onImportData={(imported) => {
            setData((d) => ({
              ...d,
              name: imported.name || d.name,
              jobTitle: imported.jobTitle || d.jobTitle,
              email: imported.email || d.email,
              summary: imported.summary || d.summary,
            }));
            addToast('✓ Perfil importado com sucesso!');
          }}
        />
      )}

      {modal === 'translate' && (
        <TranslationModal
          data={data}
          onApplyTranslation={(translatedData, langName) => {
            setData((d) => ({ ...d, ...translatedData }));
            addToast(`✓ Currículo traduzido para ${langName} com sucesso!`);
          }}
          onClose={() => setModal(null)}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
