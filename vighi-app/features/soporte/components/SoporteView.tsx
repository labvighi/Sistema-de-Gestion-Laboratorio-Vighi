'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

interface Ticket {
  id: string;
  asunto: string;
  deadline: string;
  tipo: 'Evolutivo' | 'Resolutivo';
  estado: string;
  atraso: 'ontime' | 'delayed' | 'late';
}

// BDD: reemplazar por fetch a la API
const TICKETS: Ticket[] = [];

const DASH_COLS = ['On Time', 'Delayed', 'Late', 'Late <5d', 'Late 5-10d', 'Late +10d', 'Total'];

function DashCell({ value }: { value: number }) {
  const hasVal = value > 0;
  return <td className={`px-3.5 py-2.5 text-[12px] font-mono text-center ${hasVal ? 'text-[rgba(107,107,138,0.3)]' : 'text-[rgba(107,107,138,0.3)]'}`}>{value || '—'}</td>;
}

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

export default function SoporteView() {
  const [filtrTipo, setFiltrTipo] = useState('');
  const [filtrEstado, setFiltrEstado] = useState('Abiertos');

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Sistema"
        title="Soporte"
        icon="fas fa-life-ring"
        action={
          <Link href="/soporte/nuevo" className="btn-primary">
            <i className="fas fa-plus"></i> Nuevo ticket
          </Link>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold text-slate uppercase tracking-[0.1em]">Dashboard</span>
          <span className="text-[10px] text-slate">Tickets en curso</span>
        </div>
        <table className="w-full border-collapse m-0">
          <thead>
            <tr className="bg-surf border-b border-panel">
              <th className="px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-slate whitespace-nowrap text-left w-[100px]">Tipo</th>
              {DASH_COLS.map(c => <th key={c} className="px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-slate whitespace-nowrap">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-panel">
              <td className="px-3.5 py-2.5 text-[11px] font-bold text-vighi font-sans text-left">Evolutivo</td>
              {Array(7).fill(0).map((_, i) => <DashCell key={i} value={0} />)}
            </tr>
          </tbody>
        </table>
        <table className="w-full border-collapse m-0">
          <thead>
            <tr className="bg-white border-b border-panel">
              <th className="px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-slate whitespace-nowrap text-left w-[100px]">Tipo</th>
              {DASH_COLS.map(c => <th key={c} className="px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-slate whitespace-nowrap">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-panel">
              <td className="px-3.5 py-2.5 text-[11px] font-bold text-vighi font-sans text-left">Resolutivo</td>
              {Array(7).fill(0).map((_, i) => <DashCell key={i} value={0} />)}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 140 }} value={filtrTipo} onChange={e => setFiltrTipo(e.target.value)}>
            <option value="">[ Tipos: todos ]</option>
            <option>Evolutivo</option>
            <option>Resolutivo</option>
          </select>
          <select className={SEL} style={{ width: 110 }} value={filtrEstado} onChange={e => setFiltrEstado(e.target.value)}>
            <option>[ Abiertos ]</option>
            <option>Cerrados</option>
            <option>Todos</option>
          </select>
          <select className={SEL} style={{ width: 180 }}>
            <option>BACA, Tiago</option>
          </select>
          <select className={SEL} style={{ width: 140 }}>
            <option>[ Atraso: todos ]</option>
            <option>On Time</option>
            <option>Delayed</option>
            <option>Late</option>
          </select>
        </div>

        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left w-[80px]"># Ticket</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Asunto</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left w-[100px]">Deadline</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left w-[100px]">Tipo</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left w-[100px]">Estado</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left w-[110px]">Schedule</th>
            </tr>
          </thead>
          <tbody>
            {TICKETS.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-slate text-[13px]">
                  <i className="fas fa-life-ring block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                  <p>No hay tickets cargados.</p>
                </td>
              </tr>
            ) : (
              TICKETS.map(t => (
                <tr key={t.id} className="hover:bg-surf transition-colors border-b border-panel">
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle font-mono font-semibold text-vighi">{t.id}</td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{t.asunto}</td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle font-mono text-[11px] text-slate">{t.deadline}</td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{t.tipo}</td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{t.estado}</td>
                  <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                    <span className={`inline-flex items-center h-[22px] px-2 rounded-[5px] text-[10px] font-bold ${t.atraso === 'ontime' ? 'bg-[#dcfce7] text-[#15803d]' : t.atraso === 'delayed' ? 'bg-[#fef3c7] text-[#a16207]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                      {t.atraso === 'ontime' ? 'On Time' : t.atraso === 'delayed' ? 'Delayed' : 'Late'}
                    </span>
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
