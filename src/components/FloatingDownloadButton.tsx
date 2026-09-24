import { Download, Sparkles } from 'lucide-react';

interface FloatingDownloadButtonProps {
  onDownload: () => void;
  score: number;
}

export default function FloatingDownloadButton({
  onDownload,
  score,
}: FloatingDownloadButtonProps) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button
        onClick={onDownload}
        className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group border border-purple-400/30"
        aria-label="Baixar Currículo em PDF"
      >
        <Download className="w-5 h-5 group-hover:bounce transition-transform" />
        <span>Baixar PDF</span>
        <span className="ml-1 bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
          ATS {score}%
        </span>
      </button>
    </div>
  );
}
