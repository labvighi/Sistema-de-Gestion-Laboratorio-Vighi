'use client';

import { useState, useEffect } from 'react';

type TabId = 'gerencial' | 'macro' | 'citotecnicos' | 'patologos' | 'tecnicos' | 'ejecutivo' | 'performance' | 'proyeccion' | 'validacion';

const TABS: { id: TabId; label: string }[] = [
  { id: 'gerencial',    label: 'Gerencial' },
  { id: 'macro',        label: 'Macro' },
  { id: 'citotecnicos', label: 'Citotécnicos' },
  { id: 'patologos',    label: 'Patólogos' },
  { id: 'tecnicos',     label: 'Técnicos' },
  { id: 'ejecutivo',    label: 'Ejecutivo' },
  { id: 'performance',  label: 'Performance' },
  { id: 'proyeccion',   label: 'Proyección' },
  { id: 'validacion',   label: 'Validación' },
];

const WIP_LABELS: Partial<Record<TabId, string>> = {
  citotecnicos: 'Dashboard Citotécnicos',
  patologos:    'Dashboard Patólogos',
  tecnicos:     'Dashboard Técnicos',
  ejecutivo:    'Vista Ejecutiva',
  performance:  'Dashboard de Performance',
  proyeccion:   'Proyección',
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

const FilterBar = "px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap rounded-tl-[0.75rem] rounded-tr-[0.75rem]";
const ContentArea = "border border-panel border-t-0 rounded-bl-[0.75rem] rounded-br-[0.75rem] bg-white p-0 overflow-hidden";

function WipPane({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-16 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fef3c7] text-[#d97706] text-[11px] font-semibold">
        <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
        En construcción
      </div>
      <div className="text-[13px] text-slate">{label} — disponible próximamente</div>
    </div>
  );
}

function EmptyContent({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="w-14 h-14 rounded-[14px] bg-surf flex items-center justify-center text-[24px] text-[rgba(124,62,237,0.35)] mb-1">
        <i className={icon}></i>
      </div>
      <div className="text-[14px] font-bold text-vighi">{title}</div>
      <div className="text-[12px] text-slate max-w-[280px]">{sub}</div>
    </div>
  );
}

export default function DashboardsView() {
  const [activeTab, setActiveTab] = useState<TabId>('gerencial');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const now = new Date();
    setTimestamp(
      now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-end justify-between gap-4 mb-2">
        <div>
          <div className="font-mono text-[9px] font-medium text-accent tracking-[0.12em] uppercase mb-1">Panel de control</div>
          <h1 className="text-[26px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2.5">
            <i className="fas fa-chart-line text-accent text-[22px]"></i> Dashboards
          </h1>
        </div>
        <div className="font-mono text-[9px] text-slate tracking-[0.08em] pb-1">{timestamp}</div>
      </div>

      <div className="flex items-stretch bg-surf border border-panel rounded-[0.75rem] overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`inline-flex items-center px-4 py-3 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-[color,border-color] duration-[0.12s] bg-transparent cursor-pointer ${activeTab === t.id ? 'text-accent border-accent' : 'text-slate border-transparent hover:text-vighi hover:border-panel'}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'gerencial' && (
        <div className="flex flex-col gap-0">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white border border-panel border-t-[3px] border-t-accent rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] px-5 py-4">
              <div className="font-mono text-[9px] font-bold text-accent tracking-[0.12em] uppercase mb-2">Hoy</div>
              <div className="text-[32px] font-extrabold text-vighi leading-none">630<span className="text-[16px] font-normal text-slate ml-1">p</span></div>
              <div className="text-[11px] text-slate mt-1">Protocolos diarios</div>
            </div>
            <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] px-5 py-4">
              <div className="font-mono text-[9px] font-bold text-slate tracking-[0.12em] uppercase mb-2">Promedio</div>
              <div className="text-[32px] font-extrabold text-vighi leading-none">5<span className="text-[16px] font-normal text-slate ml-1">d</span></div>
              <div className="text-[11px] text-slate mt-1">Días hábiles por estudio</div>
            </div>
            <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] px-5 py-4">
              <div className="font-mono text-[9px] font-bold text-slate tracking-[0.12em] uppercase mb-2">Estado</div>
              <div className="text-[18px] font-bold text-vighi leading-none pt-1 flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>OT
                <span className="mx-1.5 text-panel">·</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>DY
                <span className="mx-1.5 text-panel">·</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>LT
              </div>
              <div className="text-[11px] text-slate mt-1">En término · Demorado · Atrasado</div>
            </div>
            <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] px-5 py-4">
              <div className="font-mono text-[9px] font-bold text-slate tracking-[0.12em] uppercase mb-2">Objetivo</div>
              <div className="text-[18px] font-bold text-accent leading-none pt-1">Rojo Cero</div>
              <div className="text-[11px] text-slate mt-1">Sin atrasos en el flujo</div>
            </div>
          </div>

          <div className={FilterBar}>
            <span className="text-[10px] font-bold text-slate uppercase tracking-[0.08em] whitespace-nowrap">Filtros</span>
            <select className={SEL}><option value="">Flujos: todos</option><option>Citología</option><option>Histología</option></select>
            <select className={SEL}><option value="">Cobertura: todas</option><option>OSDE</option><option>PAMI</option><option>Particular</option></select>
            <select className={SEL}><option value="">Lote: todos</option></select>
            <div className="w-px h-4 bg-panel mx-1 flex-shrink-0" />
            <select className={SEL}><option value="">Procedencia: todas</option><option>Av. Santa Fe</option><option>CM Monserrat</option><option>CM Otamendi</option><option>Medrano</option></select>
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
              <i className="fa fa-rotate-right"></i> Actualizar
            </button>
          </div>
          <div className={ContentArea}>
            <EmptyContent icon="fas fa-chart-bar" title="Sin datos cargados" sub="Aplicá los filtros y presioná Actualizar para cargar el dashboard gerencial." />
          </div>
        </div>
      )}

      {activeTab === 'macro' && (
        <div className="flex flex-col gap-0">
          <div className={FilterBar}>
            <select className={SEL}><option value="">[ Año: todos ]</option></select>
            <select className={SEL}><option value="">[ Mes: todos ]</option></select>
            <select className={SEL} style={{ width: 80 }}><option>BP</option><option>CT</option><option>LIQ</option><option>PAP</option><option>IMHQ</option><option value="">[ Todos ]</option></select>
          </div>
          <div className={ContentArea}>
            <EmptyContent icon="fas fa-table" title="Sin datos" sub="Seleccioná los filtros para cargar el mapa macro." />
          </div>
        </div>
      )}

      {activeTab === 'validacion' && (
        <div className="flex flex-col gap-0">
          <div className={FilterBar}>
            <span className="text-[10px] font-bold text-slate uppercase tracking-[0.08em] whitespace-nowrap">Período</span>
            <select className={SEL}><option>2026</option><option>2025</option><option>2024</option></select>
            <select className={SEL}>{MESES.map(m => <option key={m}>{m}</option>)}</select>
          </div>
          <div className={ContentArea}>
            <EmptyContent icon="fas fa-check-double" title="Sin datos" sub="Seleccioná el período para cargar la tabla de validación." />
          </div>
        </div>
      )}

      {Object.entries(WIP_LABELS).map(([id, label]) =>
        activeTab === id ? (
          <div key={id} className="bg-white border border-panel rounded-[0.75rem]">
            <WipPane label={label} />
          </div>
        ) : null
      )}
    </div>
  );
}
