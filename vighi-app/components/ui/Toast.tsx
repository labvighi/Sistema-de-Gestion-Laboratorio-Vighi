'use client';

import { useEffect, useRef } from 'react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const STYLES: Record<ToastType, { iconBg: string; iconText: string; bar: string; icon: string; title: string }> = {
  success: { iconBg: 'bg-[#dcfce7]', iconText: 'text-[#15803d]', bar: 'bg-[#22c55e]', icon: 'fa-check', title: 'Listo' },
  error:   { iconBg: 'bg-[#fee2e2]', iconText: 'text-[#dc2626]', bar: 'bg-[#ef4444]', icon: 'fa-xmark', title: 'Error' },
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
      className="fixed bottom-5 right-5 z-[2000]"
      style={{ animation: 'toast-in 0.3s cubic-bezier(0.16,1,0.3,1)' }}
    >
      <div className="relative flex items-start gap-3 min-w-[300px] max-w-[380px] rounded-xl bg-white border border-panel px-4 py-3.5 shadow-[0_12px_32px_rgba(41,16,80,0.18)] overflow-hidden">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${s.iconBg} ${s.iconText} flex items-center justify-center`}>
          <i className={`fas ${s.icon} text-[13px]`}></i>
        </div>
        <div className="flex-1 pt-0.5">
          <div className="text-[13px] font-bold text-vighi leading-tight">{s.title}</div>
          <div className="text-[12.5px] text-slate leading-snug mt-0.5">{message}</div>
        </div>
        <button onClick={onClose} className="flex-shrink-0 text-slate/50 hover:text-slate transition-colors mt-0.5" aria-label="Cerrar">
          <i className="fa fa-times text-[12px]"></i>
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-panel/40">
          <div
            className={`h-full ${s.bar}`}
            style={{ animation: `toast-progress ${duration}ms linear forwards` }}
          />
        </div>
      </div>
    </div>
  );
}
