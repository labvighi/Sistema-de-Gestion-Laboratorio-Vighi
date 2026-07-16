'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

interface Envio {
  id: number;
  destino: string;
  fecha: string;
  cantidad: number;
  tipo: string;
  observaciones?: string;
}

// BDD: reemplazar por fetch a la API
const ENVIOS_INICIALES: Envio[] = [
  { id: 1,  destino: 'Bulnes 1960 6° "12"',         fecha: '16/07/26', cantidad: 50,  tipo: 'VR' },
  { id: 2,  destino: 'Bulnes 1960 6° "12"',         fecha: '16/07/26', cantidad: 50,  tipo: 'SB' },
  { id: 3,  destino: 'Junín 1054 1° "A"',           fecha: '16/07/26', cantidad: 50,  tipo: 'VR' },
  { id: 4,  destino: 'Junín 1054 1° "A"',           fecha: '16/07/26', cantidad: 50,  tipo: 'SB' },
  { id: 5,  destino: 'Av. Cabildo 597 P.B "8"',     fecha: '14/07/26', cantidad: 50,  tipo: 'VR' },
  { id: 6,  destino: 'Av. Cabildo 597 P.B "8"',     fecha: '14/07/26', cantidad: 50,  tipo: 'SB' },
  { id: 7,  destino: 'IFER',                         fecha: '13/07/26', cantidad: 50,  tipo: 'VR' },
  { id: 8,  destino: 'IFER',                         fecha: '13/07/26', cantidad: 50,  tipo: 'SB' },
  { id: 9,  destino: 'Sanatorio Trinidad Palermo',  fecha: '13/07/26', cantidad: 20,  tipo: 'FR' },
  { id: 10, destino: 'Caaguazú 6093 1° "A"',        fecha: '08/07/26', cantidad: 50,  tipo: 'VR' },
  { id: 11, destino: 'Caaguazú 6093 1° "A"',        fecha: '08/07/26', cantidad: 50,  tipo: 'SB' },
  { id: 12, destino: 'Centro Médico Vilella',       fecha: '07/07/26', cantidad: 150, tipo: 'VR' },
  { id: 13, destino: 'Centro Médico Vilella',       fecha: '07/07/26', cantidad: 150, tipo: 'SB' },
  { id: 14, destino: 'Centro Médico Vilella',       fecha: '07/07/26', cantidad: 40,  tipo: 'FR' },
];

const TIPOS = ['ESPÁTULAS', 'FORMOL', 'FRASCOS', 'KITS HPV', 'SOBRES', 'SPRAY', 'VIDRIOS'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const ANIOS = ['2024', '2025', '2026'];
const DIAS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const SEL = "h-8 px-2 pr-5 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const INPUT = "h-8 px-2.5 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

export default function InsumosView() {
  const [envios, setEnvios] = useState(ENVIOS_INICIALES);
  const [mostrarForm, setMostrarForm] = useState(false);
  const hoy = new Date();
  const [destino, setDestino] = useState('');
  const [anio, setAnio] = useState(String(hoy.getFullYear()));
  const [mesIndex, setMesIndex] = useState(hoy.getMonth());
  const [dia, setDia] = useState(String(hoy.getDate()));
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [cantidad, setCantidad] = useState('');
  const [observaciones, setObservaciones] = useState('');

  function cancelar() {
    setMostrarForm(false);
    setDestino('');
    setCantidad('');
    setObservaciones('');
  }

  function cargarEnvio() {
    // BDD: reemplazar por POST a la API
    const fecha = `${String(dia).padStart(2, '0')}/${String(mesIndex + 1).padStart(2, '0')}/${anio.slice(2)}`;
    setEnvios(prev => [
      { id: Date.now(), destino, fecha, cantidad: Number(cantidad) || 0, tipo, observaciones: observaciones || undefined },
      ...prev,
    ]);
    cancelar();
  }

  function eliminarEnvio(id: number) {
    setEnvios(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader eyebrow="Sistema" title="Insumos" icon="fas fa-flask" />

      <div>
        <button
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi"
          onClick={() => setMostrarForm(true)}
        >
          <i className="fas fa-plus"></i> Cargar un envío
        </button>
      </div>

      {mostrarForm && (
        <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
          <div className="px-5 py-3 border-b border-panel bg-surf text-[13px] font-bold text-vighi">Cargar un envío</div>
          <div className="p-5 flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Destino</label>
              <select className={SEL} value={destino} onChange={e => setDestino(e.target.value)}>
                <option value="">[ Indicar ubicación destino ]</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Fecha de envío</label>
              <div className="flex gap-1.5">
                <select className={SEL} value={anio} onChange={e => setAnio(e.target.value)}>
                  {ANIOS.map(a => <option key={a}>{a}</option>)}
                </select>
                <select className={SEL} value={mesIndex} onChange={e => setMesIndex(Number(e.target.value))}>
                  {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <select className={SEL} value={dia} onChange={e => setDia(e.target.value)}>
                  {DIAS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Tipo</label>
              <select className={SEL} style={{ width: 130 }} value={tipo} onChange={e => setTipo(e.target.value)}>
                {TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1" style={{ width: 110 }}>
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Cantidad</label>
              <input className={INPUT} type="number" placeholder="Cantidad..." value={cantidad} onChange={e => setCantidad(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Observaciones (opcional)</label>
              <input className={INPUT} placeholder="Observaciones..." value={observaciones} onChange={e => setObservaciones(e.target.value)} />
            </div>
            <button
              className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md text-[11px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi whitespace-nowrap"
              onClick={cargarEnvio}
            >
              <i className="fas fa-plus"></i> Cargar envío
            </button>
            <button
              className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md text-[11px] font-semibold border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-accent hover:text-accent whitespace-nowrap"
              onClick={cancelar}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center gap-2 flex-wrap">
          <select className={SEL} style={{ width: 150 }}><option>[ Procedencia: todas ]</option></select>
          <select className={SEL} style={{ width: 130 }}><option>[ Tipo: todos ]</option></select>
        </div>

        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              {['Ubicación destino', 'Fecha del envío', 'Cantidad', 'Tipo', 'Observaciones', ''].map(h => (
                <th key={h} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {envios.map(e => (
              <tr key={e.id} className="hover:bg-surf transition-colors border-b border-panel">
                <td className="px-4 py-2.5 text-[12px] text-vighi font-medium align-middle">{e.destino}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate align-middle whitespace-nowrap">{e.fecha}</td>
                <td className="px-4 py-2.5 text-[12px] text-vighi align-middle">{e.cantidad}</td>
                <td className="px-4 py-2.5 text-[12px] text-vighi align-middle font-semibold">{e.tipo}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate align-middle">{e.observaciones || ''}</td>
                <td className="px-4 py-2.5 align-middle text-right">
                  <button
                    className="inline-flex items-center gap-1 h-6 px-2.5 rounded-[5px] text-[10px] font-semibold font-sans cursor-pointer border border-panel bg-white text-slate transition-all duration-[0.12s] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#fee2e2]"
                    onClick={() => eliminarEnvio(e.id)}
                  >
                    <i className="fa fa-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
