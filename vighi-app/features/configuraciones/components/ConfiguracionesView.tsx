'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

interface Item {
  label: string;
  icon: string;
}

interface Grupo {
  titulo: string;
  icon: string;
  items: Item[];
}

const USUARIOS: Grupo = {
  titulo: 'Usuarios',
  icon: 'fas fa-users',
  items: [
    { label: 'Usuarios', icon: 'fas fa-user' },
    { label: 'Asignaciones', icon: 'fas fa-user-tag' },
    { label: 'Responsables de tareas', icon: 'fas fa-comments' },
    { label: 'Congelaciones', icon: 'fas fa-snowflake' },
  ],
};

const INSUMOS: Grupo = {
  titulo: 'Insumos',
  icon: 'fas fa-flask',
  items: [{ label: 'Insumos', icon: 'fas fa-flask' }],
};

const RECORRIDOS: Grupo = {
  titulo: 'Recorridos',
  icon: 'fas fa-route',
  items: [
    { label: 'Ubicaciones', icon: 'fas fa-location-dot' },
    { label: 'Recorridos', icon: 'fas fa-route' },
    { label: 'Calendario', icon: 'fas fa-calendar' },
  ],
};

const COBERTURAS: Grupo = {
  titulo: 'Coberturas, estudios y flujos',
  icon: 'fas fa-diagram-project',
  items: [
    { label: 'Nomencladores', icon: 'fas fa-tag' },
    { label: 'Coberturas', icon: 'fas fa-id-card' },
    { label: 'Tipos de estudios', icon: 'fas fa-images' },
    { label: 'Órganos', icon: 'fas fa-heart' },
    { label: 'Flujos', icon: 'fas fa-diagram-project' },
  ],
};

const TEMPLATES: Grupo = {
  titulo: 'Templates',
  icon: 'fas fa-file-lines',
  items: [
    { label: 'Templates', icon: 'fas fa-file-lines' },
    { label: 'Abreviaturas', icon: 'fas fa-font' },
  ],
};

const INTEGRACIONES: Grupo = {
  titulo: 'Integraciones',
  icon: 'fas fa-plug',
  items: [
    { label: 'IADT', icon: 'fas fa-wifi' },
    { label: 'Reporte ejecutivo', icon: 'fas fa-download' },
  ],
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const ANIOS = ['2024', '2025', '2026'];
const SEL = "h-8 px-2 pr-5 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

const CARD = "group bg-white border border-panel rounded-[14px] overflow-hidden relative transition-[box-shadow,border-color,transform] duration-200 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-[#a855f7] before:opacity-0 before:transition-opacity before:duration-200 hover:shadow-[0_8px_32px_rgba(41,16,80,0.12),0_2px_8px_rgba(41,16,80,0.06)] hover:border-accent/40 hover:-translate-y-0.5 hover:before:opacity-100";

function GrupoCard({ grupo }: { grupo: Grupo }) {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="w-10 h-10 rounded-[10px] bg-surf flex items-center justify-center text-[16px] text-accent flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(124,62,237,0.12)]">
          <i className={grupo.icon}></i>
        </div>
        <div className="text-[14px] font-bold text-vighi tracking-[-0.01em]">{grupo.titulo}</div>
      </div>
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        {grupo.items.map(item => (
          <button
            key={item.label}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-vighi transition-colors duration-[0.12s] hover:bg-surf hover:text-accent text-left"
          >
            <i className={`${item.icon} text-[11px] text-slate w-[14px] text-center`}></i>
            <span className="flex-1">{item.label}</span>
            <i className="fas fa-chevron-right text-[9px] text-panel"></i>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ConfiguracionesView() {
  const hoy = new Date();
  const [mesIndex, setMesIndex] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader eyebrow="Sistema" title="Configuraciones" icon="fas fa-gear" subtitle="Datos maestros, reportes e integraciones del sistema." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        <GrupoCard grupo={USUARIOS} />

        <div className={CARD}>
          <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <div className="w-10 h-10 rounded-[10px] bg-surf flex items-center justify-center text-[16px] text-accent flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(124,62,237,0.12)]">
              <i className="fas fa-chart-simple"></i>
            </div>
            <div className="text-[14px] font-bold text-vighi tracking-[-0.01em]">Reportes</div>
          </div>
          <div className="flex flex-col gap-2 px-5 pb-5">
            <div className="flex gap-2">
              <select className={SEL} value={mesIndex} onChange={e => setMesIndex(Number(e.target.value))}>
                {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select className={SEL} value={anio} onChange={e => setAnio(Number(e.target.value))}>
                {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <button className="flex items-center gap-2.5 px-1 py-1.5 rounded-lg text-[12.5px] font-medium text-vighi transition-colors duration-[0.12s] hover:text-accent text-left">
              <i className="fas fa-download text-[11px] text-slate w-[14px] text-center"></i> Reporte Citotécnicos
            </button>
            <button className="flex items-center gap-2.5 px-1 py-1.5 rounded-lg text-[12.5px] font-medium text-vighi transition-colors duration-[0.12s] hover:text-accent text-left">
              <i className="fas fa-download text-[11px] text-slate w-[14px] text-center"></i> Reporte facturación
            </button>
            <button className="flex items-center gap-2.5 px-1 py-1.5 rounded-lg text-[12.5px] font-medium text-vighi transition-colors duration-[0.12s] hover:text-accent text-left">
              <i className="fas fa-chart-line text-[11px] text-slate w-[14px] text-center"></i> Analytics
            </button>
          </div>
        </div>

        <GrupoCard grupo={RECORRIDOS} />
        <GrupoCard grupo={COBERTURAS} />
        <GrupoCard grupo={INSUMOS} />
        <GrupoCard grupo={TEMPLATES} />
        <GrupoCard grupo={INTEGRACIONES} />
      </div>
    </div>
  );
}
