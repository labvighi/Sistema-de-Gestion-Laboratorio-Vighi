'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// BDD: reemplazar por fetch a la API
const AUTORIZACIONES: {
  id: string; protocolo: string; estado: string;
  fecha: string; elegibilidad: 'aprobada' | 'no_aprobada' | 'pendiente';
  estudios: number; resultado?: string;
}[] = [];

const ELEGIBILIDAD_CLS: Record<string, string> = {
  aprobada:    'bg-[#ecfdf5] text-[#059669]',
  no_aprobada: 'bg-[#fef2f2] text-[#dc2626]',
  pendiente:   'bg-[#fef3c7] text-[#d97706]',
};
const ELEGIBILIDAD_LABEL: Record<string, string> = {
  aprobada:    'Aprobada',
  no_aprobada: 'No aprobada',
  pendiente:   'Pendiente',
};

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

export default function AutorizacionesView() {
  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-1.5 text-[11px] text-slate mb-1">
        <Link href="/admin" className="text-accent font-medium no-underline hover:underline">Administración</Link>
        <i className="fas fa-chevron-right text-[8px] text-panel"></i>
        <span className="text-vighi font-medium">Autorizaciones</span>
      </div>

      <PageHeader
        eyebrow="Administración"
        title="Autorizaciones"
        icon="fas fa-wifi"
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        {/* Fila filtros 1 */}
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 70 }}>
            {[2024,2025,2026].map(y => <option key={y}>{y}</option>)}
          </select>
          <select className={SEL} style={{ width: 110 }}>
            {MESES.map(m => <option key={m}>{m}</option>)}
          </select>
          <select className={SEL} style={{ width: 110 }}>
            <option value="">[ Día: todos ]</option>
          </select>
        </div>
        {/* Fila filtros 2 */}
        <div className="px-5 py-3 border-b-2 border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 180 }}><option value="">[ Cobertura: todas ]</option></select>
          <select className={SEL} style={{ width: 160 }}>
            <option value="">[ Elegibilidad: todos ]</option>
            <option value="aprobada">Aprobada</option>
            <option value="no_aprobada">No aprobada</option>
          </select>
          <select className={SEL} style={{ width: 170 }}>
            <option value="">[ Autorizaciones: todas ]</option>
            <option value="pendientes">Pendientes</option>
            <option value="completas">Completas</option>
          </select>
          <select className={SEL} style={{ width: 150 }}>
            <option value="">[ Facturado: todas ]</option>
            <option value="si">Facturado: Sí</option>
            <option value="no">Facturado: No</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-sans m-0">
            <thead>
              <tr className="bg-surf border-b-2 border-panel">
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Protocolo</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Estado</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Fecha</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Elegibilidad</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Estudios</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {AUTORIZACIONES.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-slate text-[13px]">
                    <i className="fas fa-wifi block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                    <p>No hay autorizaciones registradas.</p>
                  </td>
                </tr>
              ) : (
                AUTORIZACIONES.map(a => (
                  <tr key={a.id} className="hover:bg-surf transition-colors border-b border-panel">
                    <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                      <Link href={`/protocolo/${a.protocolo}`} className="text-accent font-semibold no-underline hover:underline">
                        #{a.protocolo}
                      </Link>
                    </td>
                    <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{a.estado}</td>
                    <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{a.fecha}</td>
                    <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                      <span className={`inline-flex items-center h-[22px] px-[9px] rounded-[20px] text-[11px] font-semibold whitespace-nowrap ${ELEGIBILIDAD_CLS[a.elegibilidad]}`}>
                        {ELEGIBILIDAD_LABEL[a.elegibilidad]}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{a.estudios}</td>
                    <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{a.resultado ?? '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-2.5 border-t border-panel bg-surf text-[11px] text-slate">
          {AUTORIZACIONES.length} registro{AUTORIZACIONES.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
