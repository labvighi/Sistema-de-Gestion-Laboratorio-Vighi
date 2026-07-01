'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

type EstadoTarea = 'en-curso' | 'completada' | 'pendiente';

interface Tarea {
  id: string;
  solicitud: string;
  protocolo?: string;
  status: 'informado' | 'en-curso' | 'completado';
  actividad: string;
  autor: string;
  responsable: string;
  urgente?: boolean;
  estado: EstadoTarea;
  actualizada: string;
}

// BDD: reemplazar por fetch a la API
const TAREAS: Tarea[] = [];

const DOT_CLASS: Record<EstadoTarea, string> = {
  'en-curso':   'bg-[#22c55e]',
  'completada': 'bg-[#94a3b8]',
  'pendiente':  'bg-[#f59e0b]',
};

const STATUS_CLASS: Record<string, string> = {
  informado:   'bg-[#eff6ff] text-[#2563eb]',
  'en-curso':  'bg-[#fef3c7] text-[#d97706]',
  completado:  'bg-[#ecfdf5] text-[#059669]',
};

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

export default function TareasView() {
  const [filtroEstado, setFiltroEstado] = useState('abiertas');

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Gestión"
        title="Tareas"
        icon="fas fa-list-check"
        subtitle="Tareas asignadas a tu usuario."
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 140 }} value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
            <option value="abiertas">Abiertas</option>
            <option value="en_curso">En curso</option>
            <option value="completadas">Completadas</option>
            <option value="todas">[ Todas ]</option>
          </select>
          <select className={SEL} style={{ width: 190 }}>
            <option value="">[ Responsable: todos ]</option>
          </select>
          <select className={SEL} style={{ width: 190 }}>
            <option value="">[ Actividad: todas ]</option>
          </select>
          {TAREAS.length > 0 && (
            <span className="font-mono text-[11px] text-slate bg-[rgba(124,62,237,0.08)] px-2.5 py-0.5 rounded-md ml-auto">
              {TAREAS.length} tarea{TAREAS.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-sans m-0">
            <thead>
              <tr className="bg-surf border-b-2 border-panel">
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left" style={{ minWidth: 180 }}>Solicitud</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Protocolo</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Status</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Actividad</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Autor</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Responsable</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left" style={{ width: 40 }}></th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Estado tarea</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Actualizada</th>
              </tr>
            </thead>
            <tbody>
              {TAREAS.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-14 text-center text-slate text-[13px]">
                    <i className="fas fa-list-check block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                    <p>No hay tareas para mostrar.</p>
                  </td>
                </tr>
              ) : (
                TAREAS.map(t => (
                  <tr key={t.id} className="hover:bg-surf transition-colors border-b border-panel">
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle" style={{ minWidth: 180, whiteSpace: 'normal' }}>
                      <a href="#" className="text-accent font-medium no-underline hover:underline">{t.solicitud}</a>
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle">
                      {t.protocolo && (
                        <Link href={`/protocolo/${t.protocolo}`} className="font-mono text-[10px] font-bold text-accent no-underline hover:underline">
                          #{t.protocolo}
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle">
                      <span className={`inline-flex items-center h-[22px] px-[9px] rounded-[20px] text-[10px] font-semibold whitespace-nowrap ${STATUS_CLASS[t.status]}`}>
                        {t.status === 'en-curso' ? 'En curso' : t.status === 'informado' ? 'Informado' : 'Completado'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[11px] text-slate align-middle">{t.actividad}</td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle">
                      <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[rgba(124,62,237,0.1)] font-mono text-[10px] font-bold text-accent">{t.autor}</span>
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle">
                      <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[rgba(124,62,237,0.1)] font-mono text-[10px] font-bold text-accent">{t.responsable}</span>
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle">
                      {t.urgente && (
                        <span className="inline-flex items-center gap-1 h-4 px-1.5 rounded-[20px] text-[9px] font-bold bg-[rgba(220,38,38,0.10)] text-[#dc2626]">
                          <i className="fas fa-exclamation"></i> URG
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1.5 align-middle ${DOT_CLASS[t.estado]}`}></span>
                      {t.estado === 'en-curso' ? 'En curso' : t.estado === 'completada' ? 'Completada' : 'Pendiente'}
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#333] align-middle font-mono text-[10px] text-slate">{t.actualizada}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
