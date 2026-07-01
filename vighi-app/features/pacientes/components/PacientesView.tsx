'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

interface Paciente {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNac?: string;
  cobertura?: string;
}

type ModoApellido = 'empieza' | 'contiene' | 'exacto';

const INPUT = "h-9 px-2.5 text-[13px] rounded-[7px] border border-panel bg-white text-vighi font-sans outline-none transition-[border-color,box-shadow] duration-[0.12s] placeholder:text-[#bbb] focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,62,237,0.10)]";
const SELECT = "h-9 px-2.5 text-[13px] rounded-[7px] border border-panel bg-white text-vighi font-sans outline-none transition-[border-color,box-shadow] duration-[0.12s] cursor-pointer appearance-none pr-6 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,62,237,0.10)]";

export default function PacientesView() {
  const [modoApellido, setModoApellido] = useState<ModoApellido>('empieza');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [resultados, setResultados] = useState<Paciente[] | null>(null);
  const [buscando, setBuscando] = useState(false);

  async function buscarPorNombre() {
    if (!apellido.trim()) return;
    setBuscando(true);
    // BDD: reemplazar por fetch a la API
    await new Promise(r => setTimeout(r, 300));
    setResultados([]);
    setBuscando(false);
  }

  async function buscarPorDni() {
    if (!dni.trim()) return;
    setBuscando(true);
    // BDD: reemplazar por fetch a la API
    await new Promise(r => setTimeout(r, 300));
    setResultados([]);
    setBuscando(false);
  }

  return (
    <div className="p-7 px-8 pb-18">
      <PageHeader
        eyebrow="Agenda"
        title="Pacientes"
        icon="fas fa-id-card"
        action={
          <button className="btn-primary">
            <i className="fas fa-plus"></i> Nuevo paciente
          </button>
        }
      />

      {/* Búsqueda */}
      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] p-5 pb-6 flex items-end gap-0 mb-4 flex-wrap">
        <div className="flex items-end gap-2.5 flex-wrap flex-1">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-vighi tracking-[0.01em]">Apellido</label>
            <select
              className={SELECT}
              style={{ width: 130 }}
              value={modoApellido}
              onChange={e => setModoApellido(e.target.value as ModoApellido)}
            >
              <option value="empieza">Empieza con</option>
              <option value="contiene">Contiene</option>
              <option value="exacto">Exacto</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-vighi tracking-[0.01em]">&nbsp;</label>
            <input
              type="text"
              className={INPUT}
              placeholder="Apellido..."
              style={{ width: 160 }}
              value={apellido}
              onChange={e => setApellido(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && buscarPorNombre()}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-vighi tracking-[0.01em]">
              Nombre <span className="font-normal text-slate ml-1">(opcional)</span>
            </label>
            <input
              type="text"
              className={INPUT}
              placeholder="Nombre..."
              style={{ width: 140 }}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold cursor-pointer border-none bg-accent text-white transition-colors duration-150 whitespace-nowrap flex-shrink-0 self-end hover:bg-vighi"
            onClick={buscarPorNombre}
          >
            <i className="fa fa-search"></i> Buscar
          </button>
        </div>

        <div className="w-px h-12 bg-panel mx-5 flex-shrink-0 self-center" />

        {/* Por DNI */}
        <div className="flex items-end gap-2.5 flex-wrap flex-[0_0_auto]">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-vighi tracking-[0.01em]">Por DNI</label>
            <input
              type="text"
              className={INPUT}
              placeholder="Ej: 30123456"
              style={{ width: 150 }}
              value={dni}
              onChange={e => setDni(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && buscarPorDni()}
              autoComplete="off"
            />
          </div>
          <button
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold cursor-pointer border-none bg-accent text-white transition-colors duration-150 whitespace-nowrap flex-shrink-0 self-end hover:bg-vighi"
            onClick={buscarPorDni}
          >
            <i className="fa fa-search"></i> Buscar
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        {resultados === null ? (
          <div className="py-14 px-6 text-center">
            <i className="fas fa-id-card block text-[32px] text-[rgba(124,62,237,0.25)] mb-3.5"></i>
            <p className="text-[13px] text-slate m-0">Ingresá un apellido o DNI para buscar pacientes.</p>
          </div>
        ) : buscando ? (
          <div className="py-14 px-6 text-center">
            <p className="text-[13px] text-slate m-0"><i className="fas fa-spinner fa-spin"></i> Buscando...</p>
          </div>
        ) : (
          <>
            <div className="px-5 py-3 border-b border-panel bg-surf flex items-center justify-between">
              <span className="text-[12px] font-bold text-vighi tracking-[0.01em]">Resultados</span>
              <span className="font-mono text-[11px] text-slate bg-[rgba(124,62,237,0.08)] px-2 py-0.5 rounded-md">{resultados.length} paciente{resultados.length !== 1 ? 's' : ''}</span>
            </div>
            {resultados.length === 0 ? (
              <div className="py-14 px-6 text-center">
                <i className="fas fa-id-card block text-[32px] text-[rgba(124,62,237,0.25)] mb-3.5"></i>
                <p className="text-[13px] text-slate m-0">No se encontraron pacientes con esos datos.</p>
              </div>
            ) : (
              <table className="w-full border-collapse font-sans m-0">
                <thead>
                  <tr className="bg-surf border-b-2 border-panel">
                    <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">DNI</th>
                    <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Paciente</th>
                    <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Cobertura</th>
                    <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-center" style={{ width: 60 }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map(p => (
                    <tr key={p.id} className="hover:bg-surf transition-colors border-b border-panel">
                      <td className="px-4 py-[11px] text-[13px] text-[#333] align-middle font-mono text-[12px] font-semibold text-vighi">{p.dni}</td>
                      <td className="px-4 py-[11px] text-[13px] text-[#333] align-middle">
                        <div className="font-semibold text-vighi">{p.apellido}, {p.nombre}</div>
                        {p.fechaNac && <div className="text-[11px] text-slate mt-px">{p.fechaNac}</div>}
                      </td>
                      <td className="px-4 py-[11px] text-[13px] text-[#333] align-middle">{p.cobertura || '—'}</td>
                      <td className="px-4 py-[11px] text-[13px] text-[#333] align-middle text-center">
                        <button className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surf border border-panel text-slate cursor-pointer text-[11px] transition-[background,color,border-color] duration-[0.12s] hover:bg-[rgba(124,62,237,0.10)] hover:text-accent hover:border-accent">
                          <i className="fa fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
