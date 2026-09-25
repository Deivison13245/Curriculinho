import { useState, useRef } from 'react';
import type {
  ResumeData,
  Education,
  Experience,
  Language,
  Certification,
  ProjectOrAchievement,
  CustomSectionItem,
} from '../types';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe2,
  Award,
  FolderKanban,
  FileText,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Upload,
  Link,
  Check,
  Zap,
} from 'lucide-react';

const HARD_SKILLS_SUGGESTIONS = [
  'React', 'Node.js', 'Python', 'TypeScript', 'SQL', 'Excel Avançado', 'Power BI', 'Figma', 'Git', 'Docker', 'AWS', 'Scrum', 'Java', 'C#', 'Vue.js'
];
const SOFT_SKILLS_SUGGESTIONS = [
  'Liderança', 'Comunicação', 'Trabalho em equipe', 'Proatividade', 'Criatividade', 'Organização', 'Adaptabilidade', 'Resolução de conflitos', 'Pensamento crítico', 'Empatia'
];
const DEGREES = ['Ensino Médio', 'Técnico', 'Graduação', 'Pós-graduação', 'MBA', 'Mestrado', 'Doutorado'];
const MARITAL_STATUS = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União estável'];
const LANGUAGE_LEVELS = ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'];
const PERIODS = ['Manhã', 'Tarde', 'Noite', 'Integral', 'EAD'];

function uid() {
  return Math.random().toString(36).slice(2);
}

function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <input
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white focus:border-[#004A8D] focus:ring-2 focus:ring-[#004A8D]/20 placeholder-gray-400 transition-all duration-200 shadow-2xs"
        {...props}
      />
    </div>
  );
}

function TextareaField({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <textarea
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white focus:border-[#004A8D] focus:ring-2 focus:ring-[#004A8D]/20 placeholder-gray-400 resize-none transition-all duration-200 shadow-2xs"
        {...props}
      />
    </div>
  );
}

function SelectField({
  label,
  options,
  ...props
}: { label: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <select
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white focus:border-[#004A8D] focus:ring-2 focus:ring-[#004A8D]/20 transition-all duration-200 shadow-2xs"
        {...props}
      >
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

interface AccordionSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badgeCount?: number;
}

function AccordionSection({
  title,
  icon,
  subtitle,
  isOpen,
  onToggle,
  children,
  badgeCount,
}: AccordionSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-[#004A8D]/40">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50/80 transition-colors text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#004A8D]/10 text-[#004A8D] group-hover:bg-[#004A8D] group-hover:text-white transition-colors">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#004A8D] transition-colors">
                {title}
              </h3>
              {typeof badgeCount === 'number' && badgeCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F7941D]/20 text-[#004A8D]">
                  {badgeCount}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-[#004A8D] transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-100 transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

interface FormPanelProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onOpenSynthesis: () => void;
  onOpenStar: (expId: string) => void;
  onOpenReview: () => void;
  onOpenImportModal: () => void;
}

export default function FormPanel({
  data,
  onChange,
  onOpenSynthesis,
  onOpenStar,
  onOpenImportModal,
}: FormPanelProps) {
  const [openSection, setOpenSection] = useState<string | null>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(patch: Partial<ResumeData>) {
    onChange({ ...data, ...patch });
  }

  function toggleSection(sectionKey: string) {
    setOpenSection(prev => (prev === sectionKey ? null : sectionKey));
  }

  function togglePersonalField(field: keyof typeof data.enabledPersonalFields) {
    update({
      enabledPersonalFields: {
        ...data.enabledPersonalFields,
        [field]: !data.enabledPersonalFields[field],
      },
    });
  }

  function toggleMainSection(section: keyof typeof data.enabledSections) {
    const isCurrentlyEnabled = data.enabledSections[section];
    update({
      enabledSections: {
        ...data.enabledSections,
        [section]: !isCurrentlyEnabled,
      },
    });
    if (!isCurrentlyEnabled) {
      setOpenSection(section);
    }
  }

  // Helpers
  function addEdu() {
    update({
      education: [
        ...data.education,
        { id: uid(), degree: '', course: '', institution: '', year: '', period: '' },
      ],
    });
  }
  function updateEdu(id: string, patch: Partial<Education>) {
    update({ education: data.education.map(e => (e.id === id ? { ...e, ...patch } : e)) });
  }
  function removeEdu(id: string) {
    update({ education: data.education.filter(e => e.id !== id) });
  }

  function addExp() {
    update({
      experience: [
        ...data.experience,
        { id: uid(), role: '', company: '', startDate: '', endDate: '', current: false, description: '' },
      ],
    });
  }
  function updateExp(id: string, patch: Partial<Experience>) {
    update({ experience: data.experience.map(e => (e.id === id ? { ...e, ...patch } : e)) });
  }
  function removeExp(id: string) {
    update({ experience: data.experience.filter(e => e.id !== id) });
  }

  function toggleSkill(list: 'hardSkills' | 'softSkills', skill: string) {
    const current = data[list];
    if (current.includes(skill)) {
      update({ [list]: current.filter(s => s !== skill) });
    } else {
      update({ [list]: [...current, skill] });
    }
  }

  function addLang() {
    update({ languages: [...data.languages, { id: uid(), name: '', level: '' }] });
  }
  function updateLang(id: string, patch: Partial<Language>) {
    update({ languages: data.languages.map(l => (l.id === id ? { ...l, ...patch } : l)) });
  }
  function removeLang(id: string) {
    update({ languages: data.languages.filter(l => l.id !== id) });
  }

  function addCert() {
    update({ certifications: [...data.certifications, { id: uid(), name: '', issuer: '', year: '' }] });
  }
  function updateCert(id: string, patch: Partial<Certification>) {
    update({ certifications: data.certifications.map(c => (c.id === id ? { ...c, ...patch } : c)) });
  }
  function removeCert(id: string) {
    update({ certifications: data.certifications.filter(c => c.id !== id) });
  }

  function addProject() {
    update({
      projects: [...data.projects, { id: uid(), title: '', description: '', link: '', year: '' }],
    });
  }
  function updateProject(id: string, patch: Partial<ProjectOrAchievement>) {
    update({ projects: data.projects.map(p => (p.id === id ? { ...p, ...patch } : p)) });
  }
  function removeProject(id: string) {
    update({ projects: data.projects.filter(p => p.id !== id) });
  }

  function addCustomSection() {
    update({
      customSections: [
        ...data.customSections,
        { id: uid(), title: 'Seção Personalizada', subtitle: '', description: '' },
      ],
    });
  }
  function updateCustomSection(id: string, patch: Partial<CustomSectionItem>) {
    update({
      customSections: data.customSections.map(c => (c.id === id ? { ...c, ...patch } : c)),
    });
  }
  function removeCustomSection(id: string) {
    update({ customSections: data.customSections.filter(c => c.id !== id) });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* 1. CARD DE IMPORTAÇÃO SUPERIOR (SENAC BRANDING) */}
      <div className="bg-white rounded-2xl p-5 border border-[#004A8D]/20 shadow-xs bg-gradient-to-r from-[#004A8D]/5 via-white to-[#F7941D]/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-[#004A8D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F7941D]" />
              Importação Inteligente de Dados
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Economize tempo preenchendo os dados do seu currículo automaticamente.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.docx,.doc"
              onChange={() => onOpenImportModal()}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 transition-all shadow-2xs group"
            >
              <Upload className="w-4 h-4 text-[#004A8D] group-hover:scale-110 transition-transform" />
              <span>Upload de Currículo</span>
            </button>

            <button
              type="button"
              onClick={onOpenImportModal}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#004A8D] text-white text-xs font-bold hover:bg-[#00386c] transition-all shadow-sm group"
            >
              <Link className="w-4 h-4 text-[#F7941D] group-hover:rotate-12 transition-transform" />
              <span>Importar LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACCORDIONS DE SEÇÕES */}

      {/* DADOS PESSOAIS */}
      <AccordionSection
        id="personal"
        title="Dados Pessoais"
        icon={<User className="w-5 h-5" />}
        subtitle="Suas informações principais de contato"
        isOpen={openSection === 'personal'}
        onToggle={() => toggleSection('personal')}
      >
        <div className="space-y-4 pt-2">
          {/* Essential Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <InputField
                label="Nome Completo *"
                value={data.name}
                onChange={e => update({ name: e.target.value })}
                placeholder="Ex: Ana Paula Ferreira"
              />
            </div>
            <div className="sm:col-span-2">
              <InputField
                label="Cargo Pretendido *"
                value={data.jobTitle}
                onChange={e => update({ jobTitle: e.target.value })}
                placeholder="Ex: Desenvolvedora Full Stack Sênior"
              />
            </div>
            <InputField
              label="E-mail *"
              type="email"
              value={data.email}
              onChange={e => update({ email: e.target.value })}
              placeholder="ana.paula@email.com"
            />
            <InputField
              label="Telefone (com DDD) *"
              value={data.phone}
              onChange={e => update({ phone: e.target.value })}
              placeholder="(11) 99999-9999"
            />
            <InputField
              label="Cidade *"
              value={data.city}
              onChange={e => update({ city: e.target.value })}
              placeholder="São Paulo"
            />
            <InputField
              label="Estado (UF) *"
              value={data.state}
              onChange={e => update({ state: e.target.value })}
              placeholder="SP"
              maxLength={2}
            />
          </div>

          {/* Optional Personal Fields (Activated dynamically via Chips) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {data.enabledPersonalFields.birthDate && (
              <InputField
                label="Data de Nascimento"
                type="date"
                value={data.birthDate || ''}
                onChange={e => update({ birthDate: e.target.value })}
              />
            )}
            {data.enabledPersonalFields.maritalStatus && (
              <SelectField
                label="Estado Civil"
                value={data.maritalStatus || ''}
                onChange={e => update({ maritalStatus: e.target.value })}
                options={MARITAL_STATUS}
              />
            )}
            {data.enabledPersonalFields.driverLicense && (
              <InputField
                label="Carteira de Habilitação (CNH)"
                value={data.driverLicense || ''}
                onChange={e => update({ driverLicense: e.target.value })}
                placeholder="Ex: CNH Categoria B"
              />
            )}
            {data.enabledPersonalFields.linkedin && (
              <InputField
                label="LinkedIn"
                value={data.linkedin || ''}
                onChange={e => update({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/anapaula"
              />
            )}
            {data.enabledPersonalFields.github && (
              <InputField
                label="GitHub"
                value={data.github || ''}
                onChange={e => update({ github: e.target.value })}
                placeholder="github.com/anapaula"
              />
            )}
            {data.enabledPersonalFields.portfolio && (
              <InputField
                label="Portfólio / Website"
                value={data.portfolio || ''}
                onChange={e => update({ portfolio: e.target.value })}
                placeholder="anapaula.dev"
              />
            )}
            {data.enabledPersonalFields.nationality && (
              <InputField
                label="Nacionalidade"
                value={data.nationality || ''}
                onChange={e => update({ nationality: e.target.value })}
                placeholder="Brasileira"
              />
            )}
          </div>

          {/* CHIPS DE EXPANSÃO INTERNA (DADOS PESSOAIS) */}
          <div className="pt-3 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Adicionar campos opcionais aos Dados Pessoais:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'birthDate', label: 'Data de Nascimento' },
                { key: 'maritalStatus', label: 'Estado Civil' },
                { key: 'driverLicense', label: 'Carteira de Motorista' },
                { key: 'linkedin', label: 'LinkedIn' },
                { key: 'github', label: 'GitHub' },
                { key: 'portfolio', label: 'Portfólio' },
                { key: 'nationality', label: 'Nacionalidade' },
              ].map(chip => {
                const isEnabled = data.enabledPersonalFields[chip.key as keyof typeof data.enabledPersonalFields];
                return (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => togglePersonalField(chip.key as keyof typeof data.enabledPersonalFields)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isEnabled
                        ? 'bg-[#004A8D] text-white shadow-2xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {isEnabled ? <Check className="w-3.5 h-3.5 text-[#F7941D]" /> : <Plus className="w-3.5 h-3.5 text-gray-500" />}
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* RESUMO PROFISSIONAL */}
      {data.enabledSections.summary && (
        <AccordionSection
          id="summary"
          title="Resumo Profissional"
          icon={<FileText className="w-5 h-5" />}
          subtitle="Síntese das suas principais qualificações e conquistas"
          isOpen={openSection === 'summary'}
          onToggle={() => toggleSection('summary')}
        >
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                Descreva brevemente sua trajetória e diferenciais.
              </span>
              <button
                type="button"
                onClick={onOpenSynthesis}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#004A8D]/10 text-[#004A8D] hover:bg-[#004A8D] hover:text-white border border-[#004A8D]/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F7941D]" />
                <span>Gerar com IA</span>
              </button>
            </div>
            <TextareaField
              label="Sobre Você"
              rows={4}
              value={data.summary}
              onChange={e => update({ summary: e.target.value })}
              placeholder="Profissional com mais de 5 anos de experiência na área..."
            />
          </div>
        </AccordionSection>
      )}

      {/* EXPERIÊNCIA PROFISSIONAL */}
      {data.enabledSections.experience && (
        <AccordionSection
          id="experience"
          title="Experiência Profissional"
          icon={<Briefcase className="w-5 h-5" />}
          subtitle="Seu histórico de empregos e cargos"
          isOpen={openSection === 'experience'}
          onToggle={() => toggleSection('experience')}
          badgeCount={data.experience.length}
        >
          <div className="space-y-6 pt-2">
            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#004A8D]">
                    Experiência #{idx + 1}
                  </span>
                  {data.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExp(exp.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Cargo / Função *"
                    value={exp.role}
                    onChange={e => updateExp(exp.id, { role: e.target.value })}
                    placeholder="Ex: Engenheiro de Software"
                  />
                  <InputField
                    label="Empresa *"
                    value={exp.company}
                    onChange={e => updateExp(exp.id, { company: e.target.value })}
                    placeholder="Ex: Tech Corp"
                  />
                  <InputField
                    label="Mês/Ano Início"
                    type="month"
                    value={exp.startDate}
                    onChange={e => updateExp(exp.id, { startDate: e.target.value })}
                  />
                  <div>
                    <InputField
                      label="Mês/Ano Término"
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={e => updateExp(exp.id, { endDate: e.target.value })}
                    />
                    <label className="flex items-center gap-2 mt-1.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={e => updateExp(exp.id, { current: e.target.checked })}
                        className="rounded text-[#004A8D] focus:ring-[#004A8D]"
                      />
                      <span>Trabalho atual aqui</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-gray-700">
                      Descrição das Atividades & Conquistas
                    </label>
                    <button
                      type="button"
                      onClick={() => onOpenStar(exp.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#004A8D] hover:text-[#00386c] bg-[#004A8D]/10 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <Zap className="w-3 h-3 text-[#F7941D]" />
                      <span>Melhorar com STAR IA</span>
                    </button>
                  </div>
                  <TextareaField
                    label=""
                    rows={3}
                    value={exp.description}
                    onChange={e => updateExp(exp.id, { description: e.target.value })}
                    placeholder="Desenvolvimento de sistemas escaláveis, liderança..."
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExp}
              className="w-full py-3 rounded-xl border-2 border-dashed border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 hover:border-[#004A8D] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F7941D]" />
              <span>Adicionar Outra Experiência</span>
            </button>
          </div>
        </AccordionSection>
      )}

      {/* FORMAÇÃO ACADÊMICA */}
      {data.enabledSections.education && (
        <AccordionSection
          id="education"
          title="Formação Acadêmica"
          icon={<GraduationCap className="w-5 h-5" />}
          subtitle="Cursos superiores, técnicos e pós-graduações"
          isOpen={openSection === 'education'}
          onToggle={() => toggleSection('education')}
          badgeCount={data.education.length}
        >
          <div className="space-y-6 pt-2">
            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#004A8D]">
                    Formação #{idx + 1}
                  </span>
                  {data.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEdu(edu.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Nível / Grau *"
                    value={edu.degree}
                    onChange={e => updateEdu(edu.id, { degree: e.target.value })}
                    options={DEGREES}
                  />
                  <InputField
                    label="Curso / Área *"
                    value={edu.course}
                    onChange={e => updateEdu(edu.id, { course: e.target.value })}
                    placeholder="Ex: Ciência da Computação"
                  />
                  <InputField
                    label="Instituição de Ensino *"
                    value={edu.institution}
                    onChange={e => updateEdu(edu.id, { institution: e.target.value })}
                    placeholder="Ex: Universidade de São Paulo"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <InputField
                      label="Ano Conclusão"
                      value={edu.year}
                      onChange={e => updateEdu(edu.id, { year: e.target.value })}
                      placeholder="2023"
                    />
                    <SelectField
                      label="Turno"
                      value={edu.period}
                      onChange={e => updateEdu(edu.id, { period: e.target.value })}
                      options={PERIODS}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEdu}
              className="w-full py-3 rounded-xl border-2 border-dashed border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 hover:border-[#004A8D] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F7941D]" />
              <span>Adicionar Outra Formação</span>
            </button>
          </div>
        </AccordionSection>
      )}

      {/* COMPETÊNCIAS */}
      {data.enabledSections.skills && (
        <AccordionSection
          id="skills"
          title="Competências & Habilidades"
          icon={<Wrench className="w-5 h-5" />}
          subtitle="Habilidades técnicas e comportamentais"
          isOpen={openSection === 'skills'}
          onToggle={() => toggleSection('skills')}
          badgeCount={data.hardSkills.length + data.softSkills.length}
        >
          <div className="space-y-6 pt-2">
            {/* Hard Skills */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Habilidades Técnicas (Hard Skills)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {HARD_SKILLS_SUGGESTIONS.map(skill => {
                  const active = data.hardSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill('hardSkills', skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? 'bg-[#004A8D] text-white shadow-2xs'
                          : 'bg-[#004A8D]/10 text-[#004A8D] hover:bg-[#004A8D]/20'
                      }`}
                    >
                      {active ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Competências Comportamentais (Soft Skills)
              </label>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS_SUGGESTIONS.map(skill => {
                  const active = data.softSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill('softSkills', skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? 'bg-[#F7941D] text-white shadow-2xs'
                          : 'bg-[#F7941D]/15 text-[#D97706] hover:bg-[#F7941D]/25'
                      }`}
                    >
                      {active ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </AccordionSection>
      )}

      {/* IDIOMAS */}
      {data.enabledSections.languages && (
        <AccordionSection
          id="languages"
          title="Idiomas"
          icon={<Globe2 className="w-5 h-5" />}
          subtitle="Nível de fluência em línguas estrangeiras"
          isOpen={openSection === 'languages'}
          onToggle={() => toggleSection('languages')}
          badgeCount={data.languages.length}
        >
          <div className="space-y-4 pt-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <InputField
                    label="Idioma"
                    value={lang.name}
                    onChange={e => updateLang(lang.id, { name: e.target.value })}
                    placeholder="Ex: Inglês"
                  />
                </div>
                <div className="flex-1">
                  <SelectField
                    label="Nível de Fluência"
                    value={lang.level}
                    onChange={e => updateLang(lang.id, { level: e.target.value })}
                    options={LANGUAGE_LEVELS}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLang(lang.id)}
                  className="mt-5 text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addLang}
              className="py-2.5 px-4 rounded-xl border border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F7941D]" />
              <span>Adicionar Idioma</span>
            </button>
          </div>
        </AccordionSection>
      )}

      {/* CERTIFICADOS */}
      {data.enabledSections.certifications && (
        <AccordionSection
          id="certifications"
          title="Certificados & Cursos Extracurriculares"
          icon={<Award className="w-5 h-5" />}
          subtitle="Certificações profissionais e cursos complementares"
          isOpen={openSection === 'certifications'}
          onToggle={() => toggleSection('certifications')}
          badgeCount={data.certifications.length}
        >
          <div className="space-y-4 pt-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <InputField
                    label="Nome da Certificação"
                    value={cert.name}
                    onChange={e => updateCert(cert.id, { name: e.target.value })}
                    placeholder="AWS Certified Solutions Architect"
                  />
                  <InputField
                    label="Instituição Emissora"
                    value={cert.issuer}
                    onChange={e => updateCert(cert.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <InputField
                        label="Ano"
                        value={cert.year}
                        onChange={e => updateCert(cert.id, { year: e.target.value })}
                        placeholder="2024"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCert(cert.id)}
                      className="mt-5 text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCert}
              className="py-2.5 px-4 rounded-xl border border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F7941D]" />
              <span>Adicionar Certificado</span>
            </button>
          </div>
        </AccordionSection>
      )}

      {/* PROJETOS & REALIZAÇÕES */}
      {data.enabledSections.projects && (
        <AccordionSection
          id="projects"
          title="Projetos & Realizações"
          icon={<FolderKanban className="w-5 h-5" />}
          subtitle="Projetos relevantes, portfólio e prêmios"
          isOpen={openSection === 'projects'}
          onToggle={() => toggleSection('projects')}
          badgeCount={data.projects.length}
        >
          <div className="space-y-4 pt-2">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#004A8D]">Projeto</span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    Remover
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    label="Título do Projeto"
                    value={proj.title}
                    onChange={e => updateProject(proj.id, { title: e.target.value })}
                    placeholder="Sistema de Gestão SaaS"
                  />
                  <InputField
                    label="Link (opcional)"
                    value={proj.link || ''}
                    onChange={e => updateProject(proj.id, { link: e.target.value })}
                    placeholder="github.com/projeto"
                  />
                </div>
                <TextareaField
                  label="Descrição"
                  rows={2}
                  value={proj.description}
                  onChange={e => updateProject(proj.id, { description: e.target.value })}
                  placeholder="Projeto desenvolvido em React e Node.js..."
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="py-2.5 px-4 rounded-xl border border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F7941D]" />
              <span>Adicionar Projeto</span>
            </button>
          </div>
        </AccordionSection>
      )}

      {/* SEÇÃO PERSONALIZADA */}
      {data.enabledSections.custom && (
        <AccordionSection
          id="custom"
          title="Seção Personalizada"
          icon={<Plus className="w-5 h-5" />}
          subtitle="Adicione informações adicionais sob medida"
          isOpen={openSection === 'custom'}
          onToggle={() => toggleSection('custom')}
          badgeCount={data.customSections.length}
        >
          <div className="space-y-4 pt-2">
            {data.customSections.map((cs) => (
              <div key={cs.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#004A8D]">Seção Extra</span>
                  <button
                    type="button"
                    onClick={() => removeCustomSection(cs.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    Remover
                  </button>
                </div>
                <InputField
                  label="Título da Seção"
                  value={cs.title}
                  onChange={e => updateCustomSection(cs.id, { title: e.target.value })}
                  placeholder="Ex: Trabalho Voluntário"
                />
                <TextareaField
                  label="Conteúdo"
                  rows={3}
                  value={cs.description}
                  onChange={e => updateCustomSection(cs.id, { description: e.target.value })}
                  placeholder="Descreva detalhes adicionais..."
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addCustomSection}
              className="py-2.5 px-4 rounded-xl border border-[#004A8D]/30 text-[#004A8D] text-xs font-bold hover:bg-[#004A8D]/10 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F7941D]" />
              <span>Adicionar Campo Personalizado</span>
            </button>
          </div>
        </AccordionSection>
      )}

      {/* BARRA DE ADIÇÃO DE NOVAS SEÇÕES (CHIPS NO RODAPÉ DO FORMULÁRIO) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#004A8D]" />
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Adicionar Seções Adicionais ao Currículo
          </h3>
        </div>
        <p className="text-xs text-gray-500">
          Clique nos chips abaixo para ativar ou ocultar seções no seu currículo:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { key: 'summary', label: 'Resumo Profissional' },
            { key: 'experience', label: 'Experiência Profissional' },
            { key: 'education', label: 'Formação Acadêmica' },
            { key: 'skills', label: 'Competências' },
            { key: 'languages', label: 'Idiomas' },
            { key: 'certifications', label: 'Certificados & Cursos' },
            { key: 'projects', label: 'Projetos & Realizações' },
            { key: 'custom', label: 'Seção Personalizada' },
          ].map(chip => {
            const isEnabled = data.enabledSections[chip.key as keyof typeof data.enabledSections];
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => toggleMainSection(chip.key as keyof typeof data.enabledSections)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isEnabled
                    ? 'bg-[#004A8D] text-white shadow-xs hover:bg-[#00386c]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {isEnabled ? <Check className="w-3.5 h-3.5 text-[#F7941D]" /> : <Plus className="w-3.5 h-3.5 text-gray-500" />}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
