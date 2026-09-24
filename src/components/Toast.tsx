import { useEffect } from 'react';
import type { Toast as ToastType } from '../types';

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastType; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styles = {
    success: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d]',
    error: 'bg-[#fef2f2] border-[#fecaca] text-[#dc2626]',
    info: 'bg-[#eef2f7] border-[#dde5f0] text-[#155491]',
  };

  const icons = { success: '✓', error: '✕', info: 'ℹ' };

  return (
    <div
      className={`toast-enter pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-semibold max-w-xs ${styles[toast.type]}`}
    >
      <span className="text-base font-bold">{icons[toast.type]}</span>
      <span>{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="ml-auto text-xs opacity-60 hover:opacity-100">✕</button>
    </div>
  );
}
