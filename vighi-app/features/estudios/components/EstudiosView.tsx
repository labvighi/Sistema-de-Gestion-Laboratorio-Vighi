'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

type TabId = 'paps' | 'cts' | 'bps' | 'ihqs';

const TABS: { id: TabId; label: string }[] = [
  { id: 'paps', label: 'PAPs' },
  { id: 'cts',  label: 'CTs' },
  { id: 'bps',  label: 'BPs' },
  { id: 'ihqs', label: 'IHQs' },
];

const EMPTY_ICONS: Record<TabId, string> = {
  paps: 'fas fa-flask',
  cts:  'fas fa-flask',
  bps:  'fas fa-flask',
  ihqs: 'fas fa-star-of-life',
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS  = Array.from({ length: 31 }, (_, i) => String(i + 1));
const ANIOS = ['2024','2025','2026'];

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const SEP = "w-px h-4 bg-panel mx-0.5 flex-shrink-0 self-center";

function EmptyPane({ tab }: { tab: TabId }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="w-14 h-14 rounded-[14px] bg-surf flex items-center justify-center text-[24px] text-[rgba(124,62,237,0.35)]">
        <i className={EMPTY_ICONS[tab]}></i>
      </div>
      <div className="text-[14px] font-bold text-vighi mt-1">Sin protocolos {tab.toUpperCase()}</div>
      <p className="text-[12px] text-slate m-0">No hay protocolos cargados para los filtros seleccionados.</p>
    </div>
  );
}

export default function EstudiosView() {
  const [activeTab, setActiveTab] = useState<TabId>('paps');
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Anatomía Patológica"
        title="Estudios"
        icon="fas fa-microscope"
        action={
          <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold cursor-pointer border border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
            <i className="fas fa-file-export"></i> Exportar
          </button>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-stretch border-b border-panel bg-surf overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`inline-flex items-center gap-1.5 px-5 py-3 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-[color,border-color] duration-[0.12s] bg-transparent cursor-pointer ${activeTab === t.id ? 'text-accent border-accent' : 'text-slate border-transparent hover:text-vighi hover:border-panel'}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
              <span className={`font-mono text-[10px] px-1.5 py-px rounded-[20px] ml-1 ${activeTab === t.id ? 'bg-[rgba(124,62,237,0.15)] text-accent' : 'bg-[rgba(107,107,138,0.1)] text-slate'}`}>0</span>
            </button>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex flex-col border-b border-panel">
          <div className="px-4 py-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-slate uppercase tracking-[0.08em] whitespace-nowrap flex-shrink-0 mr-1">Filtros</span>

            <select className={SEL} style={{ width: 70 }}>
              <option value="">Día</option>
              {DIAS.map(d => <option key={d}>{d}</option>)}
            </select>
            <select className={SEL} style={{ width: 120 }}>
              <option value="">Mes</option>
              {MESES.map(m => <option key={m}>{m}</option>)}
            </select>
            <select className={SEL} style={{ width: 70 }}>
              {ANIOS.map(a => <option key={a}>{a}</option>)}
            </select>

            <div className={SEP} />

            <select className={SEL} style={{ width: 120 }}><option>Procedencia: todas</option></select>
            <select className={SEL} style={{ width: 120 }}><option>Lote: todos</option></select>
            <select className={SEL} style={{ width: 160 }}><option>Actividad: todas</option></select>

            <div className={SEP} />

            <button
              className={`inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-medium rounded-md border border-dashed border-panel bg-white text-slate transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent ${moreOpen ? 'border-accent text-accent' : ''}`}
              onClick={() => setMoreOpen(o => !o)}
            >
              Más filtros <i className={`fas fa-chevron-down text-[9px] transition-transform duration-150 ${moreOpen ? 'rotate-180' : ''}`}></i>
            </button>
          </div>

          {/* Filtros extra */}
          {moreOpen && (
            <div className="px-4 pb-3 flex items-center gap-2 flex-wrap border-t border-panel pt-2.5">
              <select className={SEL} style={{ width: 180 }}><option>Médico</option></select>
              <select className={SEL} style={{ width: 180 }}><option>Médico firmante</option></select>
              <select className={SEL} style={{ width: 180 }}><option>Cobertura</option></select>
              <select className={SEL} style={{ width: 120 }}><option>Plan</option></select>
              <select className={SEL} style={{ width: 120 }}><option>Tipo de biopsia</option></select>
              <select className={SEL} style={{ width: 160 }}><option>Zona del cuerpo</option></select>
              <select className={SEL} style={{ width: 120 }}><option>Diagnóstico: todos</option></select>
              <select className={SEL} style={{ width: 160 }}><option>Órgano: todos</option></select>
              <input className="h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi outline-none focus:border-accent" style={{ width: 180 }} type="text" placeholder="Diagnóstico contiene..." />
            </div>
          )}

          {/* Bottom bar */}
          <div className="px-4 py-2.5 border-t border-panel flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="m-0 cursor-pointer flex items-center gap-1.5 text-[11px] text-slate">
                <input type="checkbox" />
                <span>Seleccionados:</span>
              </label>
              <span className="font-mono text-[11px] text-slate bg-[rgba(124,62,237,0.08)] px-2 py-px rounded-md">0 / 0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="inline-flex items-center gap-1 h-[28px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-[#dc2626] border-[rgba(220,38,38,0.3)] transition-[border-color,color] duration-[0.12s] hover:border-[#dc2626] hover:bg-[rgba(220,38,38,0.05)]">
                <i className="fas fa-times"></i> Limpiar
              </button>
              <button className="inline-flex items-center gap-1 h-[28px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
                <i className="fas fa-sync-alt"></i> Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Paneles */}
        {TABS.map(t => (
          activeTab === t.id ? (
            <table key={t.id} className="w-full border-collapse font-sans m-0">
              <thead>
                <tr className="bg-surf border-b-2 border-panel">
                  {['','Flujo','Paciente','Médico','Recolección','Entrega',''].map((h, i) => (
                    <th key={i} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} style={{ padding: 0 }}>
                    <EmptyPane tab={t.id} />
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null
        ))}
      </div>
    </div>
  );
}
