import { Download } from 'lucide-react';

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
        className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#004A8D] to-[#003463] hover:from-[#00386c] hover:to-[#00284d] text-white font-extrabold text-sm shadow-xl shadow-[#004A8D]/30 hover:shadow-2xl hover:shadow-[#004A8D]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group border border-[#F7941D]/30"
        aria-label="Baixar Currículo em PDF"
      >
        <Download className="w-5 h-5 text-[#F7941D] group-hover:bounce transition-transform" />
        <span>Baixar PDF</span>
        <span className="ml-1 bg-[#F7941D] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
          ATS {score}%
        </span>
      </button>
    </div>
  );
}
