'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const MODS = [
  { href: '/conges',     label: 'Conges',    icon: 'far fa-hospital' },
  { href: '/ihq',        label: 'IHQ',        icon: 'fas fa-star-of-life' },
  { href: '/lotes',      label: 'Lotes',      icon: 'far fa-list-alt' },
  { href: '/estudios',   label: 'Estudios',   icon: 'fas fa-microscope' },
  { href: '/dashboards', label: 'Dashboards', icon: 'fas fa-chart-line' },
  { href: '/admin',      label: 'Admin',      icon: 'fas fa-dollar-sign' },
];

const AGENDA_ITEMS = [
  { href: '/medicos',   label: 'Médicos',   icon: 'fas fa-user-md' },
  { href: '/pacientes', label: 'Pacientes', icon: 'fas fa-id-card' },
  { href: '/usuarios',  label: 'Usuarios',  icon: 'fas fa-user-shield' },
];

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const usuario = useAuthStore(s => s.usuario);
  const logout = useAuthStore(s => s.logout);

  const [agendaOpen, setAgendaOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const initials = (() => {
    if (!usuario?.mail) return '??';
    const parts = usuario.mail.split('@')[0].split('.');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : usuario.mail.substring(0, 2).toUpperCase();
  })();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-panel shadow-[0_1px_4px_rgba(41,16,80,0.06)] flex items-center z-[1030] font-sans before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-accent before:to-[#a855f7] before:pointer-events-none">
      <button
        className="flex-shrink-0 flex items-center h-full border-r border-panel gap-2.5 w-[210px] px-4 cursor-pointer select-none transition-colors duration-[0.12s] bg-transparent border-t-0 border-b-0 border-l-0 no-underline hover:bg-surf group"
        onClick={onToggleSidebar}
        title="Menú"
      >
        <i className="fa fa-bars text-[13px] text-slate flex-shrink-0 transition-colors duration-[0.12s] group-hover:text-accent"></i>
        <img src="/logo.png" alt="Vighi" className="h-[30px] w-auto" />
        <div>
          <div className="text-[12px] font-bold text-vighi tracking-[-0.01em] leading-[1.2] text-left">CAP Vighi</div>
          <div className="text-[9px] font-medium text-slate tracking-[0.02em]">Sistema de Gestión</div>
        </div>
      </button>

      <div className="flex items-center ml-3 border border-panel rounded-lg bg-surf overflow-hidden transition-[border-color,box-shadow] duration-150 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(124,62,237,0.10)]">
        <input
          className="w-[120px] h-8 px-2 border-none bg-transparent font-sans text-[12px] text-vighi outline-none transition-[width] duration-200 placeholder:text-[#bbb] focus:w-[190px]"
          type="text"
          placeholder="#Protocolo"
          autoComplete="off"
        />
        <button className="w-8 h-8 flex items-center justify-center bg-none border-none text-slate text-[11px] transition-colors duration-150 hover:text-accent">
          <i className="fa fa-search"></i>
        </button>
      </div>

      <div className="flex items-center gap-0.5 ml-2">
        <Link href="/tareas" className="inline-flex items-center gap-1 h-[30px] px-2.5 border-none rounded-md bg-none font-sans text-[12px] font-medium text-slate no-underline whitespace-nowrap transition-[background,color] duration-[0.12s] hover:bg-surf hover:text-vighi">
          <i className="fa fa-comment-dots"></i> Tareas
        </Link>
        <Link href="/historial" className="inline-flex items-center gap-1 h-[30px] px-2.5 border-none rounded-md bg-none font-sans text-[12px] font-medium text-slate no-underline whitespace-nowrap transition-[background,color] duration-[0.12s] hover:bg-surf hover:text-vighi" title="Historial">
          <i className="fa fa-clock-rotate-left"></i>
        </Link>
      </div>

      <div className="w-px h-[18px] bg-panel mx-1.5 flex-shrink-0" />

      <div className="flex items-center gap-px ml-auto pr-3">
        {MODS.map(m => (
          <Link key={m.href} href={m.href}
            className={`inline-flex items-center gap-1 h-[30px] px-2.5 rounded-md font-sans text-[12px] font-semibold no-underline whitespace-nowrap transition-[background,color] duration-[0.12s] ${pathname.startsWith(m.href) ? 'bg-surf text-accent' : 'text-slate hover:bg-surf hover:text-vighi'}`}>
            <i className={m.icon}></i> {m.label}
          </Link>
        ))}

        <div className="relative">
          <button
            className="inline-flex items-center gap-1 h-[30px] px-2.5 rounded-md font-sans text-[12px] font-semibold text-slate whitespace-nowrap transition-[background,color] duration-[0.12s] hover:bg-surf hover:text-vighi"
            onClick={() => { setAgendaOpen(o => !o); setUserOpen(false); }}
          >
            <i className="fas fa-users"></i> Agenda{' '}
            <i className="fa fa-chevron-down" style={{ fontSize: 8, marginLeft: 2, opacity: 0.7 }}></i>
          </button>
          {agendaOpen && (
            <ul className="absolute top-[calc(100%+8px)] right-0 bg-white border border-panel rounded-[10px] min-w-[176px] list-none p-1.5 shadow-[0_8px_24px_rgba(41,16,80,0.12)] z-[1050]">
              {AGENDA_ITEMS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAgendaOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-[7px] rounded-md text-vighi text-[12px] font-medium transition-colors duration-[0.12s] hover:bg-surf hover:text-accent"
                  >
                    <i className={item.icon}></i> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link href="/soporte" className={`inline-flex items-center gap-1 h-[30px] px-2.5 rounded-md font-sans text-[12px] font-semibold no-underline whitespace-nowrap transition-[background,color] duration-[0.12s] ${pathname.startsWith('/soporte') ? 'bg-surf text-accent' : 'text-slate hover:bg-surf hover:text-vighi'}`}>
          <i className="fas fa-life-ring"></i> Soporte
        </Link>

        <Link href="/configuraciones" className={`inline-flex items-center justify-center w-[30px] h-[30px] rounded-md font-sans text-[13px] no-underline transition-[background,color] duration-[0.12s] ${pathname.startsWith('/configuraciones') ? 'bg-surf text-accent' : 'text-slate hover:bg-surf hover:text-vighi'}`} title="Configuraciones">
          <i className="fas fa-gear"></i>
        </Link>

        <div className="w-px h-[18px] bg-panel mx-1.5 flex-shrink-0" />

        <div className="relative">
          <button
            className="w-[30px] h-[30px] rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 ml-1.5 tracking-[0.02em] cursor-pointer select-none border-none transition-shadow duration-150 hover:shadow-[0_0_0_3px_rgba(124,62,237,0.25)]"
            onClick={() => { setUserOpen(o => !o); setAgendaOpen(false); }}
          >
            {initials}
          </button>
          {userOpen && (
            <div className="absolute top-[calc(100%+10px)] right-0 bg-white border border-panel rounded-[10px] min-w-[200px] p-1.5 shadow-[0_8px_24px_rgba(41,16,80,0.14)] z-[1060]">
              <div className="px-2.5 pt-2.5 pb-2 border-b border-panel mb-1.5">
                <div className="text-[13px] font-bold text-vighi whitespace-nowrap overflow-hidden text-ellipsis">{usuario?.mail || 'Usuario'}</div>
                <div className="text-[11px] text-slate mt-0.5">{usuario?.perfilNombre || '—'}</div>
              </div>
              <Link
                href="/perfil"
                className="flex items-center gap-2 px-2.5 py-[7px] rounded-md text-[12px] font-medium text-vighi cursor-pointer transition-colors duration-[0.12s] no-underline hover:bg-surf hover:text-accent"
              >
                <i className="fa fa-user"></i> Mi perfil
              </Link>
              <div className="h-px bg-panel my-1.5" />
              <button
                className="flex items-center gap-2 px-2.5 py-[7px] rounded-md text-[12px] font-medium text-vighi cursor-pointer transition-colors duration-[0.12s] bg-none border-none w-full no-underline hover:bg-[#fff0f0] hover:text-[#c0392b]"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out-alt"></i> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
