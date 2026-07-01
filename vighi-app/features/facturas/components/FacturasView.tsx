'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

type EstadoFactura = 'borrador' | 'emitida' | 'cobrada';

const BADGE: Record<EstadoFactura, { cls: string; label: string }> = {
  borrador: { cls: 'bg-surf text-slate border border-panel', label: 'Borrador' },
  emitida:  { cls: 'bg-[#eff6ff] text-[#3b82f6]',           label: 'Emitida'  },
  cobrada:  { cls: 'bg-[#ecfdf5] text-[#059669]',            label: 'Cobrada'  },
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// BDD: reemplazar por fetch a la API
const FACTURAS: {
  id: string; numero: string; estado: EstadoFactura;
  fechaFactura: string; fechaCobro?: string;
  cobertura: string; exento: number; gravado: number; iva: number; total: number;
}[] = [];

function fmt(n: number) { return `$${n.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`; }

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const TH = "px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left";
const THR = "px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-right";
const TD = "px-4 py-2.5 text-[12px] text-[#333] align-middle";
const TDR = "px-4 py-2.5 text-[12px] text-[#333] align-middle text-right font-mono";

export default function FacturasView() {
  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-1.5 text-[11px] text-slate mb-1">
        <Link href="/admin" className="text-accent font-medium no-underline hover:underline">Administración</Link>
        <i className="fas fa-chevron-right text-[8px] text-panel"></i>
        <span className="text-vighi font-medium">Facturación</span>
      </div>

      <PageHeader
        eyebrow="Administración"
        title="Facturación"
        icon="fas fa-file-invoice"
        action={
          <Link href="/facturar" className="btn-primary">
            <i className="fas fa-plus"></i> Nueva factura
          </Link>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 180 }}><option value="">[ Cobertura ]</option></select>
          <select className={SEL} style={{ width: 70 }}>
            {[2024,2025,2026].map(y => <option key={y}>{y}</option>)}
          </select>
          <select className={SEL} style={{ width: 110 }}>
            {MESES.map(m => <option key={m}>{m}</option>)}
          </select>
          <select className={SEL} style={{ width: 150 }}>
            <option value="">[ Estado: todas ]</option>
            <option value="borrador">Borrador</option>
            <option value="emitida">Emitida</option>
            <option value="cobrada">Cobrada</option>
            <option value="sincobrar">Sin cobrar</option>
          </select>
          <select className={SEL} style={{ width: 180 }}>
            <option value="">[ Refacturación: todo ]</option>
            <option value="solo_refact">Solo refacturación</option>
            <option value="solo_fact">Solo facturación</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-sans m-0">
            <thead>
              <tr className="bg-surf border-b-2 border-panel">
                <th className={TH}>Nro. Factura</th>
                <th className={TH}>Estado</th>
                <th className={TH}>FF</th>
                <th className={TH}>FEC</th>
                <th className={TH}>Cobertura</th>
                <th className={THR}>Exento</th>
                <th className={THR}>Gravado</th>
                <th className={THR}>IVA</th>
                <th className={THR}>Total</th>
              </tr>
            </thead>
            <tbody>
              {FACTURAS.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-14 text-center text-slate text-[13px]">
                    <i className="fas fa-file-invoice block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                    <p>No hay facturas registradas.</p>
                  </td>
                </tr>
              ) : (
                FACTURAS.map(f => {
                  const b = BADGE[f.estado];
                  return (
                    <tr key={f.id} className="hover:bg-surf transition-colors border-b border-panel">
                      <td className={TD}>{f.numero}</td>
                      <td className={TD}>
                        <span className={`inline-flex items-center h-[22px] px-[9px] rounded-[20px] text-[11px] font-semibold whitespace-nowrap ${b.cls}`}>{b.label}</span>
                      </td>
                      <td className={TD}>{f.fechaFactura}</td>
                      <td className={TD}>{f.fechaCobro ?? '—'}</td>
                      <td className={TD}>{f.cobertura}</td>
                      <td className={TDR}>{fmt(f.exento)}</td>
                      <td className={TDR}>{fmt(f.gravado)}</td>
                      <td className={TDR}>{fmt(f.iva)}</td>
                      <td className={TDR}><strong>{fmt(f.total)}</strong></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {FACTURAS.length > 0 && (
          <div className="flex items-center gap-0 border-t-2 border-panel bg-surf px-5 py-2.5">
            {(['exento','gravado','iva','total'] as const).map(key => (
              <div key={key} className="flex flex-col gap-0.5 px-5 border-r border-panel last:border-r-0">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-slate">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span className="text-[14px] font-bold text-vighi">{fmt(FACTURAS.reduce((a,f) => a + f[key], 0))}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
