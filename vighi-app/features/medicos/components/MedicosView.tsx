'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

// BDD: reemplazar por fetch a la API
interface Medico {
  id: string;
  nombre: string;
  mn?: string;
  mp?: string;
}

const LETRAS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const MEDICOS: Medico[] = []; // BDD

export default function MedicosView() {
  const [letra, setLetra] = useState('');

  const filtered = letra
    ? MEDICOS.filter(m => m.nombre.toUpperCase().startsWith(letra))
    : MEDICOS;

  return (
    <div className="p-7 px-8 pb-18">
      <PageHeader
        eyebrow="Agenda"
        title="Médicos"
        icon="fas fa-user-md"
        action={
          <Link href="/medicos/nuevo" className="btn-primary">
            <i className="fa fa-plus"></i> Nuevo médico
          </Link>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="px-4 py-3 border-b border-panel bg-surf flex items-center gap-1 flex-wrap">
          <button
            className={`inline-flex items-center justify-center min-w-[28px] h-7 px-2.5 rounded-md font-sans text-[11px] font-semibold cursor-pointer transition-[background,color,border-color] duration-100 border mr-1 ${letra === '' ? 'bg-accent text-white border-accent' : 'bg-white text-vighi border-panel hover:bg-white hover:text-vighi hover:border-panel'}`}
            onClick={() => setLetra('')}
          >
            Todos
          </button>
          {LETRAS.map(l => (
            <button
              key={l}
              className={`inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-md font-mono text-[11px] font-semibold cursor-pointer transition-[background,color,border-color] duration-100 border ${letra === l ? 'bg-accent text-white border-accent' : 'border-transparent bg-transparent text-slate hover:bg-white hover:text-vighi hover:border-panel'}`}
              onClick={() => setLetra(l)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="px-5 py-2.5 border-b border-panel flex items-center justify-between">
          {filtered.length > 0 && (
            <span className="font-mono text-[11px] text-slate bg-[rgba(124,62,237,0.08)] px-2.5 py-0.5 rounded-md">
              {filtered.length} médico{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <table className="w-full border-collapse font-sans m-0">
          <thead>
            <tr className="bg-surf border-b-2 border-panel">
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Médico</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">MN</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">MP</th>
              <th className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-center" style={{ width: 60 }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-14 text-center text-slate text-[13px]">
                  No hay médicos cargados{letra ? ` con la letra "${letra}"` : ''}.
                </td>
              </tr>
            ) : (
              filtered.map(m => (
                <tr key={m.id} className="hover:bg-surf transition-colors border-b border-panel">
                  <td className="px-5 py-[11px] text-[12px] text-[#333] align-middle font-semibold text-vighi">{m.nombre}</td>
                  <td className="px-5 py-[11px] text-[12px] text-[#333] align-middle font-mono text-slate">{m.mn || '—'}</td>
                  <td className="px-5 py-[11px] text-[12px] text-[#333] align-middle font-mono text-slate">{m.mp || '—'}</td>
                  <td className="px-5 py-[11px] text-[12px] text-[#333] align-middle text-center">
                    <Link href={`/medicos/${m.id}`} className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surf border border-panel text-slate cursor-pointer text-[11px] transition-[background,color,border-color] duration-[0.12s] no-underline hover:bg-[rgba(124,62,237,0.10)] hover:text-accent hover:border-accent">
                      <i className="fa fa-pencil"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
