'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import type { Lote, LoteActivo } from '../types';

// BDD: reemplazar por fetch a la API
const LOTES_ACTIVOS: LoteActivo[] = [
  { tipo: 'NO ONCO', lote: 'NO ONCO-0507.2', cantidad: 0 },
  { tipo: 'ENDO',    lote: 'ENDO-0507.2',    cantidad: 0 },
  { tipo: 'ONCO',    lote: 'ONCO-0507.1',    cantidad: 5 },
  { tipo: 'PAPURG',  lote: 'PAPURG-0507.1',  cantidad: 0 },
  { tipo: 'TACOS',   lote: 'TACOS-0507.1',   cantidad: 0 },
  { tipo: 'CT',      lote: 'CT-0507.1',      cantidad: 0 },
];

const TIPOS = ['PAP', 'CT', 'BP', 'IHQ'];
const ANIOS = ['2024', '2025', '2026'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS  = Array.from({ length: 31 }, (_, i) => String(i + 1));

const BADGE_ESTADO: Record<string, string> = {
  activo:  'bg-[#dcfce7] text-[#15803d]',
  cerrado: 'bg-[rgba(124,62,237,0.08)] text-accent',
  anulado: 'bg-[#fee2e2] text-[#dc2626]',
};

export default function LotesView() {
  const [lotes] = useState<Lote[]>([]); // BDD: cargar desde API

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Laboratorio"
        title="Lotes"
        icon="fas fa-layer-group"
        action={
          <button className="btn-primary">
            <i className="fas fa-plus"></i> Crear un lote
          </button>
        }
      />

      {/* Lotes activos */}
      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate uppercase tracking-[0.1em]">Lotes activos</span>
        </div>
        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Tipo</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Lote activo</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left" style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {LOTES_ACTIVOS.map(l => (
              <tr key={l.tipo} className="hover:bg-surf transition-colors border-b border-panel">
                <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle font-mono text-[10px] font-bold text-slate tracking-[0.08em] bg-surf border-r-2 border-panel w-[90px]">{l.tipo}</td>
                <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                  <a href="#" className="text-vighi font-semibold no-underline text-[12px] hover:text-accent hover:underline">{l.lote} ({l.cantidad})</a>
                </td>
                <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle text-right">
                  <button className="inline-flex items-center gap-1 h-6 px-2.5 rounded-[5px] text-[10px] font-semibold font-sans cursor-pointer border border-panel bg-white text-slate transition-all duration-[0.12s] hover:border-accent hover:text-accent hover:bg-[rgba(124,62,237,0.05)]">
                    <i className="fa fa-pencil"></i> Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Histórico */}
      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-slate uppercase tracking-[0.08em] whitespace-nowrap flex-shrink-0">Filtrar</span>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 80 }}>
            {TIPOS.map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 130 }}><option>[ Lote: todos ]</option></select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 130 }}><option>[ Estado: todos ]</option></select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 200 }}><option>[ Citotécnico: todos ]</option></select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 70 }}>
            {ANIOS.map(a => <option key={a}>{a}</option>)}
          </select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 105 }}>
            <option value="">[ meses ]</option>
            {MESES.map(m => <option key={m}>{m}</option>)}
          </select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 76 }}>
            <option value="">[ días ]</option>
            {DIAS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" style={{ width: 160 }}><option>[ Actividad: todas ]</option></select>
        </div>

        <div className="px-5 py-2.5 border-b border-panel flex items-center justify-end">
          {lotes.length > 0 && (
            <span className="font-mono text-[11px] text-slate bg-[rgba(124,62,237,0.08)] px-2.5 py-0.5 rounded-md">
              {lotes.length} lote{lotes.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Lote</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Estado</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Actividad actual</th>
            </tr>
          </thead>
          <tbody>
            {lotes.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-14 text-center text-slate text-[13px]">
                  <i className="fas fa-layer-group block text-[28px] text-[rgba(124,62,237,0.2)] mb-2.5"></i>
                  No hay lotes cargados.
                </td>
              </tr>
            ) : (
              lotes.map(l => (
                <tr key={l.id} className="hover:bg-surf transition-colors border-b border-panel">
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                    <a href="#" className="text-accent font-semibold no-underline hover:underline">{l.nombre}</a>
                  </td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                    <span className={`inline-flex items-center h-5 px-2 rounded-[10px] text-[10px] font-semibold ${BADGE_ESTADO[l.estado] || ''}`}>{l.estado}</span>
                  </td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle text-slate text-[11px]">{l.actividad || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
