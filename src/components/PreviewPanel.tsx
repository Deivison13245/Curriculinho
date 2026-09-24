import { useState } from 'react';
import type { ResumeData } from '../types';
import {
  Printer,
  FileText,
  Globe,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Mail,
  Download,
  Calendar,
  MapPin,
  Globe2,
} from 'lucide-react';

interface PreviewPanelProps {
  data: ResumeData;
  onPrint: () => void;
  onExportWord: () => void;
  onOpenExport: () => void;
}

export default function PreviewPanel({
  data,
  onPrint,
  onExportWord,
  onOpenExport,
}: PreviewPanelProps) {
  const [zoom, setZoom] = useState(100);

  const { design } = data;
  const primaryColor = design.primaryColor || '#7C3AED';

  const fullLocation = [data.city, data.state].filter(Boolean).join(' – ');

  // Padding & spacing based on design settings
  const paddingMap = {
    compact: 'p-6 sm:p-8',
    normal: 'p-8 sm:p-12',
    spacious: 'p-10 sm:p-16',
  };

  const fontSizeMap = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-[12px]',
  };

  return (
    <div className="flex flex-col items-center space-y-4 pb-24 max-w-5xl mx-auto">
      {/* Zoom & Quick Actions Toolbar */}
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-xs p-3 flex flex-wrap items-center justify-between gap-3 sticky top-20 z-20">
        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(z - 10, 60))}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title="Reduzir Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-gray-700 w-12 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(z => Math.min(z + 10, 150))}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="px-2.5 py-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            100%
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Baixar PDF / Imprimir</span>
          </button>
          <button
            onClick={onExportWord}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Word (.docx)</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Traduzir</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all"
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>Carta de Apresentação</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Preview Container */}
      <div className="w-full flex justify-center overflow-x-auto p-4">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            fontFamily: design.fontFamily || 'Plus Jakarta Sans',
          }}
          className="transition-transform duration-200"
        >
          <div
            id="resume-preview"
            className={`w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm ${
              paddingMap[design.spacing || 'normal']
            } ${fontSizeMap[design.fontSize || 'md']} text-gray-900 leading-relaxed border border-gray-100 relative`}
          >
            {/* Template Variant 1: JOBSEEKER MODERN */}
            {design.template === 'jobseeker' ? (
              <div>
                {/* Header Banner */}
                <div
                  className="p-6 rounded-2xl text-white mb-6 shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {data.name || 'Seu Nome Completo'}
                  </h1>
                  {data.jobTitle && (
                    <div className="text-sm font-semibold opacity-90 mt-1">
                      {data.jobTitle}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs opacity-80 pt-2 border-t border-white/20">
                    {data.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {data.email}</span>}
                    {data.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3.5 h-3.5" /> {data.phone}</span>}
                    {fullLocation && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {fullLocation}</span>}
                    {data.enabledPersonalFields.linkedin && data.linkedin && (
                      <span className="flex items-center gap-1"><Globe2 className="w-3.5 h-3.5" /> {data.linkedin}</span>
                    )}
                    {data.enabledPersonalFields.github && data.github && (
                      <span className="flex items-center gap-1"><Globe2 className="w-3.5 h-3.5" /> {data.github}</span>
                    )}
                    {data.enabledPersonalFields.portfolio && data.portfolio && (
                      <span className="flex items-center gap-1"><Globe2 className="w-3.5 h-3.5" /> {data.portfolio}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Header for Minimalist / Executive / Modern */
              <div className="border-b-2 pb-5 mb-5" style={{ borderColor: primaryColor }}>
                <h1
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {data.name || 'Seu Nome Completo'}
                </h1>
                {data.jobTitle && (
                  <div className="text-sm font-bold text-gray-700 mt-1 uppercase tracking-wider">
                    {data.jobTitle}
                  </div>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600 font-medium">
                  {data.email && <span>📧 {data.email}</span>}
                  {data.phone && <span>📱 {data.phone}</span>}
                  {fullLocation && <span>📍 {fullLocation}</span>}
                  {data.enabledPersonalFields.linkedin && data.linkedin && (
                    <span>🔗 {data.linkedin}</span>
                  )}
                  {data.enabledPersonalFields.driverLicense && data.driverLicense && (
                    <span>🚗 {data.driverLicense}</span>
                  )}
                </div>
              </div>
            )}

            {/* SEÇÕES DO CURRÍCULO */}

            {/* 1. Resumo Profissional */}
            {data.enabledSections.summary && data.summary && (
              <div className="mb-6">
                <SectionHeader title="Resumo Profissional" color={primaryColor} />
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.summary}
                </p>
              </div>
            )}

            {/* 2. Experiência Profissional */}
            {data.enabledSections.experience && data.experience.some(e => e.role || e.company) && (
              <div className="mb-6">
                <SectionHeader title="Experiência Profissional" color={primaryColor} />
                <div className="space-y-4">
                  {data.experience
                    .filter(e => e.role || e.company)
                    .map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-gray-900">{exp.role || '—'}</div>
                            <div className="font-semibold text-xs" style={{ color: primaryColor }}>
                              {exp.company}
                            </div>
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium shrink-0">
                            {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''}{' '}
                            {exp.current ? 'Atual' : exp.endDate}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 mt-1.5 leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 3. Formação Acadêmica */}
            {data.enabledSections.education && data.education.some(e => e.course || e.institution) && (
              <div className="mb-6">
                <SectionHeader title="Formação Acadêmica" color={primaryColor} />
                <div className="space-y-3">
                  {data.education
                    .filter(e => e.course || e.institution)
                    .map((edu) => (
                      <div key={edu.id} className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900">
                            {edu.degree} {edu.course && `– ${edu.course}`}
                          </div>
                          <div className="text-xs text-gray-600">
                            {edu.institution} {edu.period && `(${edu.period})`}
                          </div>
                        </div>
                        {edu.year && (
                          <div className="text-[11px] text-gray-500 font-medium">{edu.year}</div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 4. Competências */}
            {data.enabledSections.skills &&
              (data.hardSkills.length > 0 || data.softSkills.length > 0) && (
                <div className="mb-6">
                  <SectionHeader title="Competências & Habilidades" color={primaryColor} />
                  {data.hardSkills.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Habilidades Técnicas:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {data.hardSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.softSkills.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Competências Comportamentais:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {data.softSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* 5. Idiomas */}
            {data.enabledSections.languages && data.languages.some(l => l.name) && (
              <div className="mb-6">
                <SectionHeader title="Idiomas" color={primaryColor} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {data.languages
                    .filter(l => l.name)
                    .map((lang) => (
                      <div key={lang.id} className="text-xs">
                        <span className="font-bold text-gray-900">{lang.name}</span>
                        {lang.level && <span className="text-gray-500"> ({lang.level})</span>}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 6. Certificados */}
            {data.enabledSections.certifications && data.certifications.some(c => c.name) && (
              <div className="mb-6">
                <SectionHeader title="Certificações & Cursos" color={primaryColor} />
                <div className="space-y-2">
                  {data.certifications
                    .filter(c => c.name)
                    .map((cert) => (
                      <div key={cert.id} className="flex justify-between items-start text-xs">
                        <div>
                          <span className="font-bold text-gray-900">{cert.name}</span>
                          {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                        </div>
                        {cert.year && <span className="text-gray-500 font-medium">{cert.year}</span>}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 7. Projetos */}
            {data.enabledSections.projects && data.projects.some(p => p.title) && (
              <div className="mb-6">
                <SectionHeader title="Projetos & Realizações" color={primaryColor} />
                <div className="space-y-3">
                  {data.projects
                    .filter(p => p.title)
                    .map((proj) => (
                      <div key={proj.id}>
                        <div className="font-bold text-gray-900 text-xs">
                          {proj.title}{' '}
                          {proj.link && (
                            <span className="font-normal text-purple-600 hover:underline">
                              ({proj.link})
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-gray-700 text-xs mt-1">{proj.description}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 8. Seções Personalizadas */}
            {data.enabledSections.custom && data.customSections.some(cs => cs.title) && (
              <div className="mb-6">
                {data.customSections
                  .filter(cs => cs.title)
                  .map((cs) => (
                    <div key={cs.id} className="mb-4">
                      <SectionHeader title={cs.title} color={primaryColor} />
                      <p className="text-gray-700 text-xs whitespace-pre-line">{cs.description}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: color }} />
      <h3
        className="text-xs font-black uppercase tracking-wider text-gray-900"
        style={{ color }}
      >
        {title}
      </h3>
      <div className="flex-1 border-b border-gray-200/80 ml-2" />
    </div>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
