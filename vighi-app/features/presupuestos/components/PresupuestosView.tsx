'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

type EstadoBadge = 'borrador' | 'enviado' | 'aprobado' | 'rechazado';

const BADGE: Record<EstadoBadge, { cls: string; label: string }> = {
  borrador:  { cls: 'bg-surf text-slate border border-panel',              label: 'Borrador'  },
  enviado:   { cls: 'bg-[#eff6ff] text-[#3b82f6]',                        label: 'Enviado'   },
  aprobado:  { cls: 'bg-[#ecfdf5] text-[#059669]',                        label: 'Aprobado'  },
  rechazado: { cls: 'bg-[#fef2f2] text-[#dc2626]',                        label: 'Rechazado' },
};

// BDD: reemplazar por fetch a la API
const PRESUPUESTOS: {
  id: string; fecha: string; paciente: string;
  cobertura: string; estado: EstadoBadge; importe?: number;
}[] = [];

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

export default function PresupuestosView() {
  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-1.5 text-[11px] text-slate mb-1">
        <Link href="/admin" className="text-accent font-medium no-underline hover:underline">Administración</Link>
        <i className="fas fa-chevron-right text-[8px] text-panel"></i>
        <span className="text-vighi font-medium">Presupuestos</span>
      </div>

      <PageHeader
        eyebrow="Administración"
        title="Presupuestos"
        icon="fas fa-file-invoice-dollar"
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 180 }}>
            <option value="">[ Cobertura: todos ]</option>
          </select>
          <select className={SEL} style={{ width: 140 }}>
            <option value="">[ Estado: todos ]</option>
            <option value="borrador">Borrador</option>
            <option value="enviado">Enviado</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </select>
          <select className={SEL} style={{ width: 140 }}>
            <option value="con">[ Con items ]</option>
            <option value="sin">[ Sin items ]</option>
            <option value="todos">[ Con o sin items ]</option>
          </select>
          <a
            href="https://outlook.office.com/mail/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi no-underline transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent"
          >
            <i className="fas fa-envelope"></i> Webmail presupuestos
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-sans m-0">
            <thead>
              <tr className="bg-surf border-b-2 border-panel">
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Fecha</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Paciente</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Cobertura</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Estado</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Importe</th>
                <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left" style={{ width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {PRESUPUESTOS.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-slate text-[13px]">
                    <i className="fas fa-file-invoice-dollar block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                    <p>No hay presupuestos registrados.</p>
                  </td>
                </tr>
              ) : (
                PRESUPUESTOS.map(p => {
                  const b = BADGE[p.estado];
                  return (
                    <tr key={p.id} className="hover:bg-surf transition-colors border-b border-panel">
                      <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{p.fecha}</td>
                      <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{p.paciente}</td>
                      <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{p.cobertura}</td>
                      <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">
                        <span className={`inline-flex items-center h-[22px] px-[9px] rounded-[20px] text-[11px] font-semibold whitespace-nowrap ${b.cls}`}>{b.label}</span>
                      </td>
                      <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle">{p.importe != null ? `$${p.importe.toLocaleString('es-AR')}` : '—'}</td>
                      <td className="px-5 py-2.5 text-[12px] text-[#333] align-middle"></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
