'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

type TabId = 'tablero' | 'agenda' | 'dashboard' | 'patologo';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'tablero',   label: 'Tablero',         icon: 'fas fa-table-cells' },
  { id: 'agenda',    label: 'Agenda',           icon: 'fas fa-calendar-alt' },
  { id: 'dashboard', label: 'Dashboard',        icon: 'fas fa-chart-bar' },
  { id: 'patologo',  label: 'Agenda patólogo',  icon: 'fas fa-user-md' },
];

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const FGLABEL = "text-[9px] font-bold text-slate uppercase tracking-[0.08em] m-0";

function Wip({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-14 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fef3c7] text-[#d97706] text-[11px] font-semibold">
        <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
        En construcción
      </div>
      <div className="text-[13px] text-slate">{text} — disponible próximamente</div>
    </div>
  );
}

export default function CongesView() {
  const [activeTab, setActiveTab] = useState<TabId>('tablero');

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Laboratorio"
        title="Congelaciones"
        icon="fas fa-snowflake"
        action={
          <Link href="/conges/nueva" className="btn-primary">
            <i className="fas fa-plus"></i> Nueva congelación
          </Link>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="flex items-stretch border-b border-panel bg-surf overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-[color,border-color] duration-[0.12s] bg-transparent cursor-pointer ${activeTab === t.id ? 'text-accent border-accent' : 'text-slate border-transparent hover:text-vighi hover:border-panel'}`}
              onClick={() => setActiveTab(t.id)}
            >
              <i className={t.icon}></i> {t.label}
            </button>
          ))}
        </div>

        {(activeTab === 'tablero' || activeTab === 'agenda') && (
          <div className="px-5 py-3.5 border-b border-panel bg-surf flex flex-col gap-2.5">
            <div className="flex items-end gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Usuario asignado</label>
                <select className={SEL} style={{ width: 180 }}><option>[ Todos ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Patólogo</label>
                <select className={SEL} style={{ width: 180 }}><option>[ Todos ]</option></select>
              </div>
            </div>
            <div className="flex items-end gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Actividad</label>
                <select className={SEL} style={{ width: 160 }}><option>[ Todas ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Flujo</label>
                <select className={SEL} style={{ width: 160 }}><option>[ Todos ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Tipo</label>
                <select className={SEL} style={{ width: 120 }}><option>[ Todos ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Procedencia</label>
                <select className={SEL} style={{ width: 130 }}><option>[ Todas ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Cobertura</label>
                <select className={SEL} style={{ width: 180 }}><option>[ Todas ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Médico</label>
                <select className={SEL} style={{ width: 180 }}><option>[ Todos ]</option></select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tablero' && (
          <table className="w-full border-collapse font-sans m-0">
            <thead>
              <tr className="bg-surf border-b-2 border-panel">
                {['Actividad','# Protocolo','Procedencia','Cobertura','PC','MF','Médico',''].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="py-14 text-center text-slate text-[13px]">
                  <i className="fas fa-snowflake block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                  <p>No hay congelaciones registradas.</p>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {activeTab === 'agenda' && (
          <>
            <div className="px-5 py-3 border-t border-panel bg-surf flex flex-col gap-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL} style={{ width: 130 }}><option>[ Procedencia: todas ]</option></select>
                <select className={SEL} style={{ width: 160 }}><option>[ Patólogo: todos ]</option></select>
                <select className={SEL} style={{ width: 180 }}><option>[ Médico tratante: todos ]</option></select>
                <select className={SEL} style={{ width: 130 }}><option>[ Vinculadas: todas ]</option></select>
                {['GI','QR','PUN'].map(tag => (
                  <button key={tag} className={`${SEL} cursor-pointer font-bold`}>{tag}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL} style={{ width: 70 }}>
                  <option>2024</option><option>2025</option><option>2026</option>
                </select>
                <select className={SEL} style={{ width: 120 }}>
                  {MESES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <Wip text="Grilla de agenda de congelaciones" />
          </>
        )}

        {activeTab === 'dashboard' && <Wip text="Dashboard de congelaciones" />}

        {activeTab === 'patologo' && <Wip text="Agenda de patólogo" />}
      </div>
    </div>
  );
}
