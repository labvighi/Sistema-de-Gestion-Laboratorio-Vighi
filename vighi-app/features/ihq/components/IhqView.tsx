'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const FGLABEL = "text-[9px] font-bold text-slate uppercase tracking-[0.08em] m-0";

export default function IhqView() {
  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Laboratorio"
        title="Tablero IHQ"
        icon="fas fa-star-of-life"
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-panel bg-surf flex flex-col gap-2.5">
          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Patólogo</label>
              <select className={SEL} style={{ width: 180 }}><option>[ Patólogo: todos ]</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Actividad</label>
              <select className={SEL} style={{ width: 160 }}><option>[ Actividad: todas ]</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Flujo</label>
              <select className={SEL} style={{ width: 160 }}><option>[ Flujo: todos ]</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Tipo biopsia</label>
              <select className={SEL} style={{ width: 130 }}><option>[ Tipo biopsia: todos ]</option></select>
            </div>
          </div>
          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Cobertura</label>
              <select className={SEL} style={{ width: 160 }}><option>[ Cobertura: todas ]</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Procedencia</label>
              <select className={SEL} style={{ width: 130 }}><option>[ Procedencia: todas ]</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={FGLABEL}>Médico</label>
              <select className={SEL} style={{ width: 200 }}><option>[ Médico: todos ]</option></select>
            </div>
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi self-end transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
              <i className="fas fa-print"></i> Imprimir listado
            </button>
          </div>
        </div>

        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              <th className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Actividad</th>
              <th className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left"># Protocolo</th>
              <th className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Patólogo</th>
              <th className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Paciente</th>
              <th className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Médico</th>
              <th className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left" style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="py-14 text-center text-slate text-[13px]">
                <i className="fas fa-star-of-life block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                <p>No hay protocolos IHQ cargados.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
