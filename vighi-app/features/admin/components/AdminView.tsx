'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export default function AdminView() {
  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Finanzas"
        title="Administración"
        icon="fas fa-dollar-sign"
      />

      <div className="grid gap-5" style={{ gridTemplateColumns: '220px 1fr' }}>
        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-panel rounded-[10px] p-[14px]">
            <div className="text-[9px] font-bold text-slate uppercase tracking-[0.1em] mb-2">Ingresos</div>
            <Link href="/facturar" className="flex items-center gap-2 px-2 py-[7px] rounded-md text-[12px] font-medium text-vighi no-underline transition-colors duration-[0.12s] hover:bg-surf hover:text-accent">
              <i className="fas fa-plus-circle text-[11px] text-accent w-[14px]"></i> Nueva factura
            </Link>
            <Link href="/facturas" className="flex items-center gap-2 px-2 py-[7px] rounded-md text-[12px] font-medium text-vighi no-underline transition-colors duration-[0.12s] hover:bg-surf hover:text-accent">
              <i className="fas fa-list text-[11px] text-accent w-[14px]"></i> Facturas emitidas
            </Link>
          </div>
          <div className="bg-white border border-panel rounded-[10px] p-[14px]">
            <div className="text-[9px] font-bold text-slate uppercase tracking-[0.1em] mb-2">Presupuestos</div>
            <Link href="/presupuestos" className="flex items-center gap-2 px-2 py-[7px] rounded-md text-[12px] font-medium text-vighi no-underline transition-colors duration-[0.12s] hover:bg-surf hover:text-accent">
              <i className="fas fa-file-invoice-dollar text-[11px] text-accent w-[14px]"></i> Presupuestos
            </Link>
          </div>
          <div className="bg-white border border-panel rounded-[10px] p-[14px]">
            <div className="text-[9px] font-bold text-slate uppercase tracking-[0.1em] mb-2">Autorizaciones API</div>
            <Link href="/autorizaciones" className="flex items-center gap-2 px-2 py-[7px] rounded-md text-[12px] font-medium text-vighi no-underline transition-colors duration-[0.12s] hover:bg-surf hover:text-accent">
              <i className="fas fa-wifi text-[11px] text-accent w-[14px]"></i> Dashboard autorizaciones
            </Link>
          </div>
        </div>

        {/* Cobros previstos */}
        <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-panel bg-surf flex items-center justify-between">
            <span className="text-[13px] font-bold text-vighi">Cobros previstos</span>
          </div>
          <div className="grid p-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '8px' }}>
            <div className="py-14 text-center text-slate text-[13px] col-span-full">
              <i className="fas fa-calendar-check block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
              <p>Sin cobros cargados.</p>
            </div>
          </div>
          <div className="px-5 py-2.5 border-t border-panel bg-surf flex items-center gap-4 flex-wrap text-[11px] text-slate">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent"></span> FC cargada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> Cobro atrasado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span> Cobro atrasado +5d
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#94a3b8]"></span> FE tentativa
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fas fa-check text-[#10b981]"></i> FE confirmada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
