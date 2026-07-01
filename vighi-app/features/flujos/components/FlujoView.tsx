'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FLUJOS_DATA } from '../types';

type ChipFilter = 'ontime' | 'delayed' | 'late' | 'late5' | 'late510' | 'late10' | null;

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const SEL = "h-[28px] px-1.5 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

const CHIP_DOT: Record<string, string> = {
  ontime:  'bg-[#22c55e]',
  delayed: 'bg-[#f59e0b]',
  late:    'bg-[#ef4444]',
};

export default function FlujoView() {
  const params = useSearchParams();
  const idaStr = params.get('ida');
  const ida = idaStr ? parseInt(idaStr, 10) : null;
  const flujo = ida != null ? (FLUJOS_DATA[ida] ?? null) : null;

  const [activeChip, setActiveChip] = useState<ChipFilter>(null);
  const [moreOpen, setMoreOpen] = useState(false);

  function toggleChip(chip: ChipFilter) {
    setActiveChip(prev => prev === chip ? null : chip);
  }

  if (ida != null && !flujo) {
    return (
      <div className="flex flex-col gap-4 p-7 pb-18">
        <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] p-10 text-center">
          <div className="text-[16px] font-bold text-vighi mb-1">Estación no encontrada</div>
          <div className="text-[13px] text-slate">No existe ninguna estación con ID {ida}.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate mb-0.5">
            <span>{flujo ? flujo.estacion : 'Estación'}</span>
            <span className="text-panel">/</span>
            <span>{flujo ? flujo.seccion : '—'}</span>
          </div>
          <h1 className="text-[22px] font-bold text-vighi tracking-[-0.02em] m-0">{flujo ? flujo.paso : '—'}</h1>
          {flujo && (
            <div className="text-[12px] text-slate">{flujo.estacion} · {flujo.seccion}</div>
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-slate mt-0.5">
            <i className="fas fa-user-circle"></i>
            <span>Responsable:</span>
            <span>—</span>
          </div>
        </div>

        {flujo?.proxLabel && (
          <div className="bg-surf border border-panel rounded-[20px] px-4 py-2 flex items-center gap-2 text-[12px] flex-shrink-0">
            <span className="text-slate">Próxima etapa:</span>
            {flujo.proxIda ? (
              <Link href={`/flujos?ida=${flujo.proxIda}`} className="text-accent font-semibold no-underline hover:underline">
                {flujo.proxLabel} <i className="fas fa-arrow-right"></i>
              </Link>
            ) : (
              <strong className="text-[#3b82f6]">{flujo.proxLabel}</strong>
            )}
          </div>
        )}
      </div>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        {/* Status bar */}
        <div className="px-4 py-3 border-b border-panel bg-surf flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {([
              ['ontime',  'On time',   0],
              ['delayed', 'Delayed',   0],
              ['late',    'Late',      0],
            ] as [ChipFilter, string, number][]).map(([id, label, count]) => (
              <button
                key={id as string}
                className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-[20px] text-[11px] font-semibold border transition-[background,color,border-color] duration-[0.12s] cursor-pointer ${activeChip === id ? 'bg-accent text-white border-accent' : 'bg-white text-vighi border-panel hover:border-accent hover:text-accent'}`}
                onClick={() => toggleChip(id)}
              >
                {CHIP_DOT[id as string] && (
                  <span className={`inline-block w-[7px] h-[7px] rounded-full ${CHIP_DOT[id as string]}`}></span>
                )}
                {label}
                <span className="font-mono text-[10px] font-bold ml-0.5">{count}</span>
              </button>
            ))}

            <div className="w-px h-4 bg-panel mx-0.5 self-center" />

            {([
              ['late5',   'Late <5d',   0],
              ['late510', 'Late 5–10d', 0],
              ['late10',  'Late +10d',  0],
            ] as [ChipFilter, string, number][]).map(([id, label, count]) => (
              <button
                key={id as string}
                className={`inline-flex items-center gap-1 h-7 px-3 rounded-[20px] text-[11px] font-semibold border transition-[background,color,border-color] duration-[0.12s] cursor-pointer ${activeChip === id ? 'bg-accent text-white border-accent' : 'bg-white text-vighi border-panel hover:border-accent hover:text-accent'}`}
                onClick={() => toggleChip(id)}
              >
                {label}
                <span className="font-mono text-[10px] font-bold ml-0.5">{count}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
              <i className="fas fa-print"></i> Todos
            </button>
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border-none bg-accent text-white transition-colors duration-[0.12s] hover:bg-vighi">
              <i className="far fa-check-square"></i> Seleccionados
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col border-b border-panel">
          <div className="px-4 py-2.5 flex items-center gap-2 flex-wrap">
            <select className={SEL} style={{ width: 55 }}>
              <option value="">Día</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select className={SEL} style={{ width: 110 }}>
              <option value="">Mes</option>
              {MESES.map(m => <option key={m}>{m}</option>)}
            </select>
            <select className={SEL} style={{ width: 65 }}>
              <option>2024</option><option>2025</option><option>2026</option>
            </select>
            <div className="w-px h-4 bg-panel mx-0.5 self-center flex-shrink-0" />
            <select className={SEL} style={{ width: 70 }}>
              <option>BP</option><option>CT</option><option>PAP</option><option>IHQ</option>
            </select>
            <select className={SEL} style={{ width: 150 }}><option>Tipo de estudio</option></select>
            <select className={SEL} style={{ width: 150 }}><option>Presupuesto: todos</option></select>
            <div className="w-px h-4 bg-panel mx-0.5 self-center flex-shrink-0" />
            <button
              className={`inline-flex items-center gap-1.5 h-[28px] px-2.5 text-[11px] font-medium rounded-md border border-dashed border-panel bg-white text-slate transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent ${moreOpen ? 'border-accent text-accent' : ''}`}
              onClick={() => setMoreOpen(o => !o)}
            >
              Más filtros <i className={`fas fa-chevron-${moreOpen ? 'up' : 'down'} text-[9px]`}></i>
            </button>
          </div>

          {moreOpen && (
            <div className="px-4 pb-3 flex items-center gap-2 flex-wrap border-t border-panel pt-2.5">
              <select className={SEL} style={{ width: 180 }}><option>Citotécnico: todos</option></select>
              <select className={SEL} style={{ width: 180 }}><option>Médico firmante: todos</option></select>
              <select className={SEL} style={{ width: 120 }}><option>Lote: todos</option></select>
              <select className={SEL} style={{ width: 130 }}><option>Procedencia: todas</option></select>
              <select className={SEL} style={{ width: 200 }}><option>Médicos procedencia: todas</option></select>
              <select className={SEL} style={{ width: 180 }}><option>Cobertura: todas</option></select>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-8">
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <div className="w-8 h-8 rounded-[8px] bg-surf flex items-center justify-center text-[16px] text-[rgba(124,62,237,0.35)]">
              <i className="fas fa-layer-group"></i>
            </div>
            <div className="text-[13px] font-bold text-vighi mt-1">Sin protocolos</div>
            <p className="text-[12px] text-slate m-0">No hay protocolos para los filtros seleccionados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
