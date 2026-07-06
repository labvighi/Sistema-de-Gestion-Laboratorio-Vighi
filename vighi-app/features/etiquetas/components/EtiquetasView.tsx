'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEMANA = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const DIAS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const ANIOS = ['2024','2025','2026'];

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

function diaSemana(dia: string, mes: string, anio: string) {
  if (!dia || !mes || !anio) return '';
  const d = parseInt(dia), m = parseInt(mes), a = parseInt(anio);
  const fecha = new Date(a, m, d);
  if (fecha.getFullYear() === a && fecha.getMonth() === m && fecha.getDate() === d) {
    return DIAS_SEMANA[fecha.getDay()];
  }
  return '';
}

export default function EtiquetasView() {
  const hoy = new Date();
  const [tipo, setTipo] = useState('borradores');
  const [dia, setDia] = useState(String(hoy.getDate()));
  const [mes, setMes] = useState(String(hoy.getMonth()));
  const [anio, setAnio] = useState(String(hoy.getFullYear()));
  const [creado, setCreado] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader eyebrow="Recepción" title="Crear etiquetas" icon="fas fa-tags" subtitle="Para recepción de órdenes y muestras." />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 flex-wrap border-b border-panel bg-surf">
          <select className={SEL} value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="borradores">Borradores</option>
            <option value="creadas">Creadas</option>
            <option value="impresas">Impresas</option>
            <option value="todas">[ Todas ]</option>
          </select>
          <select className={SEL} value={dia} onChange={e => setDia(e.target.value)}>
            <option value="">[ Día: todos ]</option>
            {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className={SEL} value={mes} onChange={e => setMes(e.target.value)}>
            <option value="">[ Mes: todos ]</option>
            {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select className={SEL} value={anio} onChange={e => setAnio(e.target.value)}>
            {ANIOS.map(a => <option key={a}>{a}</option>)}
          </select>
          <span className="text-[11px] text-slate font-medium">{diaSemana(dia, mes, anio)}</span>
          <button
            className="ml-auto inline-flex items-center gap-1.5 h-[30px] px-3.5 text-[11px] font-semibold rounded-md border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi cursor-pointer"
            onClick={() => setCreado(true)}
          >
            <i className="fas fa-plus"></i> Crear etiquetas
          </button>
        </div>

        <div className="min-h-[220px] flex items-center justify-center">
          <div className="flex items-center gap-2 text-[13px] text-slate py-14">
            <i className="fas fa-info-circle text-accent/40"></i>
            {creado ? 'No hay etiquetas cargadas en esa fecha o período.' : 'No hay etiquetas cargadas en esa fecha o período.'}
          </div>
        </div>
      </div>
    </div>
  );
}
