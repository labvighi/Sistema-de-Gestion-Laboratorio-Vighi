'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { historial, type HistProtocolo, type HistNombre } from '@/lib/historial';

export default function HistorialView() {
  const [protocolos, setProtocolos] = useState<HistProtocolo[]>([]);
  const [medicos, setMedicos]       = useState<HistNombre[]>([]);
  const [pacientes, setPacientes]   = useState<HistNombre[]>([]);

  useEffect(() => {
    setProtocolos(historial.getProtocolos());
    setMedicos(historial.getMedicos());
    setPacientes(historial.getPacientes());
  }, []);

  return (
    <div className="p-3.5 px-7 flex flex-col gap-2.5 h-[calc(100vh-56px)] overflow-hidden box-border">
      {/* Header compacto */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <span className="font-mono text-[9px] font-medium text-accent tracking-[0.12em] uppercase">Actividad reciente</span>
        <span className="w-px h-3.5 bg-panel" />
        <h1 className="text-[20px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2">
          <i className="fa fa-clock-rotate-left text-accent text-[17px]"></i> Historial
        </h1>
      </div>

      {/* Protocolos */}
      <div className="bg-white border border-panel rounded-[10px] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden flex flex-col min-h-0 flex-[11]">
        <div className="flex items-center gap-1.5 px-4 py-[7px] border-b border-panel bg-surf flex-shrink-0">
          <i className="fas fa-file-alt text-[11px] text-accent"></i>
          <span className="text-[14px] font-bold text-vighi">Protocolos</span>
        </div>
        <div className="overflow-y-auto flex-1 min-h-0">
          <table className="w-full border-collapse m-0">
            <thead>
              <tr className="border-b border-panel sticky top-0 bg-white z-10">
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left"># Protocolo</th>
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Recolección</th>
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Paciente</th>
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Médico</th>
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Procedencia</th>
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">Tipo</th>
                <th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left"></th>
              </tr>
            </thead>
            <tbody>
              {protocolos.length === 0 ? (
                <tr><td colSpan={7} className="px-3.5 py-[5px] text-[#aaa] text-[11px]">Sin historial</td></tr>
              ) : (
                protocolos.map(p => (
                  <tr key={p.numero} className="border-b border-panel hover:bg-surf transition-colors">
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap">
                      <Link href={`/protocolo/${p.numero}`} className="text-accent font-mono text-[10px] font-bold no-underline hover:underline">
                        #{p.numero}
                      </Link>
                    </td>
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap font-mono text-[10px] text-slate">{p.fecha}</td>
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap">{p.paciente}</td>
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap">{p.medico}</td>
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap">{p.procedencia}</td>
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap">
                      {p.tipo && <span className="inline-flex items-center h-4 px-1.5 rounded-[20px] text-[8px] font-bold bg-[rgba(124,62,237,0.10)] text-accent tracking-[0.04em]">{p.tipo}</span>}
                    </td>
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle whitespace-nowrap">
                      {p.eliminado && (
                        <span className="inline-flex items-center gap-[3px] h-4 px-1.5 rounded-[20px] text-[8px] font-bold bg-[rgba(220,38,38,0.08)] text-[#dc2626] border border-[rgba(220,38,38,0.18)]">
                          <i className="fas fa-trash-alt"></i> Eliminado
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Médicos + Pacientes */}
      <div className="grid grid-cols-2 gap-2.5 flex-[9] min-h-0">
        <div className="bg-white border border-panel rounded-[10px] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden flex flex-col flex-1">
          <div className="flex items-center gap-1.5 px-4 py-[7px] border-b border-panel bg-surf flex-shrink-0">
            <i className="fas fa-user-md text-[11px] text-accent"></i>
            <span className="text-[14px] font-bold text-vighi">Médicos</span>
          </div>
          <table className="w-full border-collapse m-0">
            <thead><tr><th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate text-left">Nombre</th></tr></thead>
            <tbody>
              {medicos.length === 0 ? (
                <tr><td className="px-3.5 py-[5px] text-[#aaa] text-[11px]">Sin historial</td></tr>
              ) : (
                medicos.map(m => (
                  <tr key={m.nombre} className="border-b border-panel hover:bg-surf transition-colors">
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle">
                      <Link href="/medicos" className="text-accent text-[11px] no-underline hover:underline">{m.nombre}</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-panel rounded-[10px] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden flex flex-col flex-1">
          <div className="flex items-center gap-1.5 px-4 py-[7px] border-b border-panel bg-surf flex-shrink-0">
            <i className="fas fa-id-card text-[11px] text-accent"></i>
            <span className="text-[14px] font-bold text-vighi">Pacientes</span>
          </div>
          <table className="w-full border-collapse m-0">
            <thead><tr><th className="px-3.5 py-[5px] text-[9px] font-bold uppercase tracking-[0.08em] text-slate text-left">Nombre</th></tr></thead>
            <tbody>
              {pacientes.length === 0 ? (
                <tr><td className="px-3.5 py-[5px] text-[#aaa] text-[11px]">Sin historial</td></tr>
              ) : (
                pacientes.map(p => (
                  <tr key={p.nombre} className="border-b border-panel hover:bg-surf transition-colors">
                    <td className="px-3.5 py-[5px] text-[11px] text-[#333] align-middle">
                      <Link href="/pacientes" className="text-accent text-[11px] no-underline hover:underline">{p.nombre}</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
