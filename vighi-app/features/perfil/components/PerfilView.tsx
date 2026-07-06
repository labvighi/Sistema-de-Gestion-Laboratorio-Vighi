'use client';

import PageHeader from '@/components/ui/PageHeader';
import { useAuthStore } from '@/features/auth/store';

export default function PerfilView() {
  const usuario = useAuthStore(s => s.usuario);

  const initials = (() => {
    if (!usuario?.mail) return '??';
    const parts = usuario.mail.split('@')[0].split('.');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : usuario.mail.substring(0, 2).toUpperCase();
  })();

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader eyebrow="Cuenta" title="Mi perfil" icon="fa fa-user" />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] p-7 max-w-[480px]">
        <div className="flex items-center gap-4 pb-5 border-b border-panel mb-5">
          <div className="w-14 h-14 rounded-full bg-accent text-white text-[20px] font-bold flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-[16px] font-bold text-vighi">{usuario?.mail || 'Usuario'}</div>
            <div className="text-[12px] text-slate mt-0.5">{usuario?.perfilNombre || '—'}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1">E-mail</div>
            <div className="text-[13px] text-vighi">{usuario?.mail || '—'}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1">Rol</div>
            <div className="text-[13px] text-vighi">{usuario?.perfilNombre || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
