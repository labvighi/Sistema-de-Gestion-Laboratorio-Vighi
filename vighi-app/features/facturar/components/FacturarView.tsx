'use client';

import { useState } from 'react';
import Link from 'next/link';

const SEL = "h-[34px] px-2.5 text-[12px] rounded-[7px] border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 disabled:bg-surf disabled:text-slate";
const DATE = "h-[34px] px-2.5 text-[12px] rounded-[7px] border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

function Campo({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 ${wide ? 'flex-[1.4] min-w-[160px]' : 'min-w-[110px]'}`}>
      <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">{label}</label>
      {children}
    </div>
  );
}

export default function FacturarView() {
  const [buscado, setBuscado] = useState(false);
  const [planHabilitado, setPlanHabilitado] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-1.5 text-[12px] text-slate">
        <Link href="/admin" className="text-slate hover:text-accent transition-colors">Administración</Link>
        <i className="fas fa-chevron-right text-[8px] opacity-50"></i>
        <span className="text-vighi font-medium">Facturar</span>
      </div>

      <div>
        <div className="font-mono text-[10px] font-medium text-accent tracking-[0.12em] uppercase mb-1">Administración</div>
        <h1 className="text-[26px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2.5">
          <i className="fas fa-file-invoice-dollar text-accent text-[22px]"></i> Facturar
        </h1>
      </div>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-end gap-3 flex-wrap">
            <Campo label="Desde"><input type="date" className={DATE} /></Campo>
            <Campo label="Hasta"><input type="date" className={DATE} /></Campo>
            <Campo label="Cobertura" wide>
              <select className={SEL}><option value="">[ Todas ]</option></select>
            </Campo>
            <Campo label="Plan" wide>
              <select className={SEL} disabled={!planHabilitado}><option value="">[ n/d ]</option></select>
            </Campo>
            <Campo label="Procedencia" wide>
              <select className={SEL}><option value="">[ Todas ]</option></select>
            </Campo>
          </div>

          <div className="flex items-end gap-3 flex-wrap">
            <Campo label="IVA">
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option value="exento">Exento</option>
                <option value="gravado">Gravado</option>
              </select>
            </Campo>
            <Campo label="Flujo">
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option>BP</option><option>CT</option><option>LIQ</option><option>PAP</option><option>IMHQ</option>
              </select>
            </Campo>
            <Campo label="Estudios" wide>
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option value="derm">Dermatológico</option>
                <option value="gine">Ginecológico</option>
                <option value="quir">Quirúrgico</option>
              </select>
            </Campo>
            <Campo label="Tipo" wide>
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option value="biop">Biopsias</option>
                <option value="cito">Citologías</option>
                <option value="ihq">Inmunohistoquímicas</option>
              </select>
            </Campo>
            <Campo label="Informados">
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option value="si">Informados</option>
                <option value="no">No informados</option>
              </select>
            </Campo>
            <Campo label="Diagnóstico">
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option>MA</option><option>NE</option><option>NG</option><option>NMA</option><option>SP</option>
              </select>
            </Campo>
            <Campo label="Prioridad técnicos" wide>
              <select className={SEL}>
                <option value="">[ Todos ]</option>
                <option value="cong">Congelaciones</option>
                <option value="ihq">IHQ</option>
                <option value="nc">Nuevos Cortes</option>
                <option value="te">Técnicas Especiales</option>
              </select>
            </Campo>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-transparent uppercase select-none">.</label>
              <button
                className="inline-flex items-center gap-1.5 h-[34px] px-4 rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi"
                onClick={() => setBuscado(true)}
              >
                <i className="fas fa-search"></i> Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      {buscado && (
        <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <i className="fas fa-file-invoice text-[28px] text-accent/20"></i>
            <p className="text-[13px] text-slate m-0">No se encontraron protocolos para facturar con los filtros seleccionados.</p>
          </div>
        </div>
      )}
    </div>
  );
}
