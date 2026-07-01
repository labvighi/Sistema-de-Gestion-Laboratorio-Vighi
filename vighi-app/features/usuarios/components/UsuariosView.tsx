'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import type { UsuarioListItem } from '../types';
import type { Perfil } from '@/features/auth/types';

// BDD: reemplazar por fetch a la API
const USUARIOS: UsuarioListItem[] = [];

const PERFILES: Perfil[] = [
  'Administración','Citotécnico','Dirección','Externo','Gerencial','Patólogo','Técnico',
];

const BADGE_CLASSES: Record<Perfil, string> = {
  'Administración': 'bg-[rgba(41,16,80,0.08)] text-vighi',
  'Citotécnico':    'bg-[rgba(16,185,129,0.10)] text-[#059669]',
  'Dirección':      'bg-[rgba(124,62,237,0.10)] text-accent',
  'Externo':        'bg-[rgba(107,107,138,0.10)] text-slate',
  'Gerencial':      'bg-[rgba(245,158,11,0.10)] text-[#d97706]',
  'Patólogo':       'bg-[rgba(239,68,68,0.10)] text-[#dc2626]',
  'Técnico':        'bg-[rgba(59,130,246,0.10)] text-[#2563eb]',
};

export default function UsuariosView() {
  const [filtroPerfil, setFiltroPerfil] = useState('');
  const [filtroTexto, setFiltroTexto] = useState('');

  const filtered = useMemo(() => {
    let list = USUARIOS;
    if (filtroPerfil) list = list.filter(u => u.perfilNombre === filtroPerfil);
    if (filtroTexto) {
      const q = filtroTexto.toLowerCase();
      list = list.filter(u =>
        u.nombre.toLowerCase().includes(q) ||
        u.apellido.toLowerCase().includes(q) ||
        u.mail.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filtroPerfil, filtroTexto]);

  return (
    <div className="p-7 px-8 pb-18">
      <PageHeader
        eyebrow="Sistema"
        title="Usuarios"
        icon="fas fa-user-shield"
        action={
          <Link href="/usuarios/nuevo" className="btn-primary">
            <i className="fa fa-plus"></i> Nuevo usuario
          </Link>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        {/* Filtros */}
        <div className="py-3.5 px-5 border-b border-panel bg-surf flex items-center gap-3 flex-wrap">
          <span className="text-[10px] font-bold text-slate uppercase tracking-[0.08em] whitespace-nowrap flex-shrink-0">Filtrar</span>
          <select
            className="h-8 px-2.5 pr-7 text-[12px] rounded-[7px] border border-panel bg-white text-vighi outline-none cursor-pointer appearance-none w-[180px] focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,62,237,0.10)]"
            value={filtroPerfil}
            onChange={e => setFiltroPerfil(e.target.value)}
          >
            <option value="">Tipo: todos</option>
            {PERFILES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <input
            type="text"
            className="h-8 px-2.5 text-[12px] rounded-[7px] border border-panel bg-white text-vighi outline-none w-[240px] placeholder:text-[#bbb] focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,62,237,0.10)]"
            placeholder="Nombre, apellido o e-mail..."
            autoComplete="off"
            value={filtroTexto}
            onChange={e => setFiltroTexto(e.target.value)}
          />
        </div>

        {/* Barra contador */}
        <div className="px-5 py-2.5 border-b border-panel flex items-center justify-end">
          {filtered.length > 0 && (
            <span className="font-mono text-[11px] text-slate bg-[rgba(124,62,237,0.08)] px-2.5 py-0.5 rounded-md">
              {filtered.length} usuario{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Tabla */}
        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">#</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Nombre</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Apellido</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">E-mail</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Perfil</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-center" style={{ width: 60 }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-slate text-[13px]">
                  <i className="fas fa-user-shield" style={{ fontSize: 28, color: '#d4b8ec', display: 'block', marginBottom: 8 }}></i>
                  No hay usuarios cargados.
                </td>
              </tr>
            ) : (
              filtered.map(u => (
                <tr key={u.id} className="hover:bg-surf transition-colors border-b border-panel">
                  <td className="px-5 py-[11px] text-[13px] text-[#333] align-middle font-mono text-[11px] text-slate w-12">{u.id}</td>
                  <td className="px-5 py-[11px] text-[13px] text-[#333] align-middle font-semibold text-vighi">{u.nombre}</td>
                  <td className="px-5 py-[11px] text-[13px] text-[#333] align-middle">{u.apellido}</td>
                  <td className="px-5 py-[11px] text-[13px] text-[#333] align-middle">{u.mail}</td>
                  <td className="px-5 py-[11px] text-[13px] text-[#333] align-middle">
                    <span className={`inline-flex items-center h-[22px] px-[9px] rounded-[20px] text-[11px] font-semibold whitespace-nowrap ${BADGE_CLASSES[u.perfilNombre]}`}>
                      {u.perfilNombre}
                    </span>
                  </td>
                  <td className="px-5 py-[11px] text-[13px] text-[#333] align-middle text-center">
                    <Link href={`/usuarios/${u.id}`} className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surf border border-panel text-slate cursor-pointer text-[11px] transition-[background,color,border-color] duration-[0.12s] no-underline hover:bg-[rgba(124,62,237,0.10)] hover:text-accent hover:border-accent">
                      <i className="fa fa-pencil"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
