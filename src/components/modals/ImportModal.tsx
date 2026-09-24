import { useState } from 'react';
import Modal from './Modal';
import { Upload, Link as LinkIcon, FileText, CheckCircle2, Sparkles } from 'lucide-react';

interface ImportModalProps {
  onClose: () => void;
  onImportData: (imported: { name?: string; jobTitle?: string; email?: string; summary?: string }) => void;
}

export default function ImportModal({ onClose, onImportData }: ImportModalProps) {
  const [activeTab, setActiveTab] = useState<'file' | 'linkedin'>('file');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleImport() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onImportData({
          name: 'Ana Paula Ferreira',
          jobTitle: 'Engenheira de Software Sênior',
          email: 'ana.paula@exemplo.com',
          summary: 'Profissional com mais de 6 anos de experiência em desenvolvimento web, arquitetura de microsserviços e liderança de times ágeis.',
        });
        onClose();
      }, 1000);
    }, 1200);
  }

  return (
    <Modal title="✨ Importar Dados de Currículo" onClose={onClose}>
      <div className="space-y-5">
        {/* Subtabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-2 transition-all ${
              activeTab === 'file'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF / DOCX</span>
          </button>
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-2 transition-all ${
              activeTab === 'linkedin'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Link do LinkedIn</span>
          </button>
        </div>

        {activeTab === 'file' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-purple-200 bg-purple-50/40 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer group" onClick={handleImport}>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-gray-900">Arraste seu arquivo de currículo ou clique aqui</p>
              <p className="text-[11px] text-gray-500 mt-1">Formatos suportados: PDF, DOCX, DOC (máx. 10MB)</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                URL do Perfil do LinkedIn:
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={e => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/seu-perfil"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={handleImport}
              disabled={loading || !linkedinUrl.trim()}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Extraindo perfil...' : 'Extrair Perfil do LinkedIn'}</span>
            </button>
          </div>
        )}

        {loading && (
          <div className="p-4 bg-purple-50 rounded-xl text-center space-y-2">
            <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-purple-900">Processando e estruturando dados com IA...</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Dados importados com sucesso! Preenchendo o formulário...</span>
          </div>
        )}
      </div>
    </Modal>
  );
}
