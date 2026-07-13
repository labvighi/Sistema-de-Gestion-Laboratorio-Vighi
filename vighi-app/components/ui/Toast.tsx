'use client';

import { useEffect, useRef } from 'react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const STYLES: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: 'bg-[#f0fff4]', border: 'border-[#b2dfdb]', text: 'text-[#1a7f5a]', icon: 'fa-check-circle' },
  error:   { bg: 'bg-[#fff0f0]', border: 'border-[#fcc]',     text: 'text-[#c0392b]', icon: 'fa-circle-exclamation' },
};

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const t = setTimeout(() => onCloseRef.current(), duration);
    return () => clearTimeout(t);
  }, [duration]);

  const s = STYLES[type];

  return (
    <div
      className="fixed top-5 right-5 z-[2000]"
      style={{ animation: 'toast-in 0.25s ease-out' }}
    >
      <div className={`flex items-center gap-2.5 min-w-[280px] max-w-[380px] rounded-lg border ${s.bg} ${s.border} ${s.text} px-4 py-3 text-[13px] font-medium shadow-[0_8px_24px_rgba(41,16,80,0.16)]`}>
        <i className={`fas ${s.icon} text-[16px] flex-shrink-0`}></i>
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" aria-label="Cerrar">
          <i className="fa fa-times text-[12px]"></i>
        </button>
      </div>
    </div>
  );
}
