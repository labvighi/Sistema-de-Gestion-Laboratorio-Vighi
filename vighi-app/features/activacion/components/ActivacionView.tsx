'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

type TabId = 'pap' | 'bp';

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

const COLS = ['FR', '#Protocolo', 'Tipo', 'Lote', 'Procedencia', 'Estado', 'Médico', '#E', 'Cobertura', 'Paciente', '', '', 'AUTH', ''];

export default function ActivacionView() {
  const [tab, setTab] = useState<TabId>('pap');

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader eyebrow="Recepción" title="Activación" icon="fas fa-user-check" subtitle="Activación de protocolos para avanzar al laboratorio." />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="flex items-stretch border-b border-panel bg-surf">
          {(['pap', 'bp'] as TabId[]).map(t => (
            <button
              key={t}
              className={`inline-flex items-center px-5 py-3 text-[12px] font-semibold uppercase whitespace-nowrap border-b-2 transition-[color,border-color] duration-[0.12s] bg-transparent cursor-pointer ${tab === t ? 'text-accent border-accent' : 'text-slate border-transparent hover:text-vighi hover:border-panel'}`}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {tab === 'pap' ? (
          <>
            <div className="px-4 py-3 flex flex-col gap-2 border-b border-panel">
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL} style={{ width: 90 }}>
                  <option>PAPS</option>
                  <option>CT</option>
                </select>
                <select className={SEL} style={{ width: 200 }}><option value="">[ Citotécnico: todos ]</option></select>
                <select className={SEL} style={{ width: 140 }}><option value="">[ Lote: todos ]</option></select>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL} style={{ width: 180 }}><option value="">[ Procedencia: todas ]</option></select>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL} style={{ width: 140 }}>
                  <option value="">[ Imagen: todos ]</option>
                  <option value="con">[ Con imagen ]</option>
                  <option value="sin">[ Sin imagen ]</option>
                </select>
                <select className={SEL} style={{ width: 200 }}><option value="">[ Médico: todos ]</option></select>
                <select className={SEL} style={{ width: 140 }}>
                  <option value="">[ Con estudios ]</option>
                  <option value="con">[ Con estudios ]</option>
                  <option value="sin">[ Sin estudios ]</option>
                </select>
                <select className={SEL} style={{ width: 200 }}><option value="">[ Cobertura: todos ]</option></select>
                <select className={SEL} style={{ width: 140 }}>
                  <option value="">[ Con paciente ]</option>
                  <option value="con">[ Con paciente ]</option>
                  <option value="sin">[ Sin paciente ]</option>
                </select>
              </div>
            </div>

            <table className="w-full border-collapse font-sans m-0">
              <thead>
                <tr className="bg-surf border-b-2 border-panel">
                  {COLS.map((h, i) => (
                    <th key={i} className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={COLS.length}>
                    <div className="flex items-center justify-center gap-2 text-[13px] text-slate py-14">
                      <i className="fas fa-info-circle text-accent/40"></i>
                      No hay protocolos para los filtros seleccionados.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="flex items-center gap-2 text-[13px] text-slate py-14">
              <i className="fas fa-info-circle text-accent/40"></i>
              No hay protocolos BP pendientes de activación.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
