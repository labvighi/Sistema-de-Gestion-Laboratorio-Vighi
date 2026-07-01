'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Protocolo, Taco, PresupuestoItem, InformeItem } from '../types';

// BDD: reemplazar por fetch a la API usando el id del protocolo
const MOCK_PROT: Protocolo = {
  numero: 'P1055268', urgente: true,
  paciente: 'GIANNINI, MARTA DOMINGA', cobertura: 'GALENO (ORO/PLA)',
  dni: '011596330014', anio: 1947,
  medico: 'AGUIAR, ANA M.', procedencia: 'TRINIPALERMO',
  fecha: '10/01/2026', tipo: '',
  lote: 'ONCO', loteNombre: 'ONCO-0121.1',
  entregaEstimada: '04/02/2026',
  firmante: 'Dra. MISERENDINO, Diana',
  estudios: [
    {
      titulo: '#P1055268-BPC (U) c/IHQ',
      patologo: 'DOMENIANNI, Miguel Angel',
      tacos: [
        { cassette:'1550116', cant:1, nombre:'Pas',                  material:'N/A', icono:'pagina', checkT:false, checkA:true  },
        { cassette:'1550116', cant:1, nombre:'Tricrómico de Masson', material:'N/A', icono:'pagina', checkT:false, checkA:true  },
        { cassette:'1550116', cant:1, nombre:'Metenamina Plata',     material:'N/A', icono:'pagina', checkT:false, checkA:true  },
        { cassette:'155054',  cant:1, nombre:'Inmunofluorescencia',  material:'N/A', icono:'ihq',   checkT:false, checkA:true  },
      ]
    },
    {
      titulo: '#P1055268-CT c/BPC (U) c/IHQ',
      patologo: 'DOMENIANNI, Miguel Angel',
      tacos: [
        { cassette:'1550115', cant:'A', nombre:'PAAF', subtipo:'Intrapuncion: Riñón', material:'Riñón', icono:'material', checkT:true, checkA:true  },
        { cassette:'150104',  cant:1,   nombre:'Intraoperatoria',       material:'N/A', icono:'persona', checkT:false, checkA:false },
        { cassette:'1550103', cant:1,   nombre:'Presencia de Patólogo', material:'N/A', icono:'persona', checkT:false, checkA:false },
      ]
    }
  ],
  archivos: [
    ...Array(12).fill({ tipo: 'img', label: 'Orden médica' }),
    { tipo:'pdf', label:'Presupuesto - GIANNINI, MARTA.pdf',                     cat:'Orden médica' },
    { tipo:'pdf', label:'AI_Giannini Marta Dominga_734441_26B-483944_42.pdf',    cat:'Orden médica' },
  ],
  tareas: [
    { nombre:'Procesamiento externo', estado:'Cerrado' },
    { nombre:'Reclamo informe',       estado:'Cerrado' },
    { nombre:'Procesamiento externo', estado:'Cerrado' },
  ],
  comentarios: [
    { autor:'Micaela', fecha:'21 ene. 11:32hs', texto:'MICROSCOPIA ELECTRONICA: 1055294' },
    { autor:'Micaela', fecha:'21 ene. 14:22hs', texto:'Se envía TODO el material a IOTTI ya que hacen todo ellos, menos los vidrios de la puncion' },
    { autor:'Micaela', fecha:'21 ene. 17:12hs', texto:'Se solicita el contacto de la persona encargada de realizar el estudio' },
    { autor:'Javier',  fecha:'26 ene. 5:45hs',  texto:'Hago macro provisoria para avanzar el protocolo hasta lleguen los resultados' },
    { autor:'Sabrina', fecha:'5 feb. 10:10hs',  texto:'Reclamo informe a IOTTI.' },
    { autor:'Sabrina', fecha:'5 feb. 13:15hs',  texto:'Adjunto informe de IOTTI (Me indican que corresponde a la MO e IF).' },
    { autor:'Sabrina', fecha:'5 feb. 13:33hs',  texto:'Solicito a IOTTI los preparados.' },
    { autor:'Diana',   fecha:'5 feb. 13:39hs',  texto:'LO QUE NECESITO ES SOLICITAR LOS VIDRIOS, LOS QUIERO VER' },
    { autor:'Sabrina', fecha:'23 feb. 17:33hs', texto:'Recibo 2 vidrios, retirados por Lucas, de Iotti para Diana.' },
    { autor:'Diana',   fecha:'24 feb. 10:43hs', texto:'archivo los vidrios que enviaron H-E y Met Plata' },
    { autor:'Micaela', fecha:'10 mar. 16:24hs', texto:'Galeno aprueba presupuesto' },
  ],
  presupuestos: [
    { protocolo:'P1055268', estudio:'Inmunofluorescencia', tipo:'PRE', proveedor:'', monto:0.00, autorizacion:'autorizado' },
  ],
  informes: [
    { titulo:'Informe Histológico',    flujo:'PAP c/BPC (U) c/IHQ', estudio:false, ihq:false, ihqLeyenda:false, macroPublicado:true,  publicado:true  },
    { titulo:'Informe Complementario', flujo:'BPC (U) c/IHQ',       estudio:false, ihq:true,  ihqLeyenda:true,  macroPublicado:false, publicado:true  },
  ],
};

function IconoTaco({ tipo }: { tipo: Taco['icono'] }) {
  if (tipo === 'ihq')     return <i className="fas fa-circle text-[#7c3eed] text-[11px]" title="IHQ"></i>;
  if (tipo === 'persona') return <i className="fas fa-user text-slate text-[11px]" title="Persona"></i>;
  if (tipo === 'material') return <a href="#" className="text-accent text-[11px] no-underline hover:underline"><i className="far fa-edit"></i> material</a>;
  return <i className="far fa-file text-slate text-[11px]"></i>;
}

function AuthBadge({ estado }: { estado: PresupuestoItem['autorizacion'] }) {
  const cls = estado === 'autorizado' ? 'bg-[#ecfdf5] text-[#059669]' : estado === 'rechazado' ? 'bg-[#fef2f2] text-[#dc2626]' : 'bg-[#fef3c7] text-[#d97706]';
  const label = estado === 'autorizado' ? 'Autorizado' : estado === 'rechazado' ? 'Rechazado' : 'Pendiente';
  const icon = estado === 'autorizado' ? 'fas fa-check' : estado === 'rechazado' ? 'fas fa-ban' : 'fas fa-hourglass-half';
  return <span className={`inline-flex items-center gap-1 h-5 px-2 rounded-[4px] text-[10px] font-semibold ${cls}`}><i className={icon}></i> {label}</span>;
}

function BoolCell({ val }: { val: boolean }) {
  return val
    ? <i className="fas fa-check text-[#10b981] text-[11px]"></i>
    : <i className="fas fa-times text-[rgba(107,107,138,0.4)] text-[11px]"></i>;
}

type FTab = 'eventos' | 'presupuestos' | 'informes' | 'eliminar';

interface Props { id: string; }

// Shared class snippets
const CARD = "bg-white border border-panel rounded-[12px] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden";
const INFO_LABEL = "text-[10px] font-bold text-slate uppercase tracking-[0.08em] flex items-center gap-1.5 mb-1.5";
const INFO_VALOR = "text-[13px] font-bold text-vighi";
const INFO_SUB = "text-[11px] text-slate mt-0.5";
const INFO_LINK = "cursor-pointer text-vighi hover:text-accent";
const TH_SM = "px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left";
const THC_SM = "px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-center";
const TD_SM = "px-3 py-2 text-[11px] text-[#333] align-middle";
const TDC_SM = "px-3 py-2 text-[11px] text-[#333] align-middle text-center";

export default function ProtocoloView({ id }: Props) {
  const prot = MOCK_PROT; // BDD: reemplazar por fetch a la API con id
  const [ftab, setFtab] = useState<FTab>('presupuestos');
  const [procMode, setProcMode] = useState<'interno' | 'externo'>('externo');

  const imgs = prot.archivos.filter(a => a.tipo === 'img');
  const pdfs = prot.archivos.filter(a => a.tipo === 'pdf');

  function handleCopy() {
    navigator.clipboard.writeText(prot.numero).catch(() => {});
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">

      {/* ── Card 1: Cabecera ── */}
      <div className={CARD}>
        <div className={`flex items-center justify-between gap-4 px-5 py-3.5 border-b border-panel ${prot.urgente ? 'border-t-[3px] border-t-[#ef4444]' : ''}`}>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[18px] font-bold text-vighi">#{prot.numero}</span>
            {prot.urgente && <span className="text-[11px] font-semibold text-[#dc2626]">(U)</span>}
            <i
              className="far fa-copy text-slate cursor-pointer text-[13px] transition-colors duration-[0.12s] hover:text-accent"
              title="Copiar número"
              onClick={handleCopy}
            ></i>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center h-[22px] px-2 rounded-[20px] text-[10px] font-bold bg-[rgba(245,158,11,0.12)] text-[#d97706]">SP</span>
            <span className="inline-flex items-center gap-1 h-[22px] px-2 rounded-[20px] text-[10px] font-bold bg-[#ecfdf5] text-[#059669]"><i className="fas fa-eye"></i> Validado</span>
            <span className="inline-flex items-center gap-1 h-[22px] px-2 rounded-[20px] text-[10px] font-bold bg-[#eff6ff] text-[#3b82f6]"><i className="fas fa-flag"></i> Informado</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
              <i className="fas fa-sync-alt"></i> Actualizar
            </button>
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent">
              <i className="fas fa-print"></i> Ver informe
            </button>
            <button className="inline-flex items-center gap-1.5 h-[30px] px-3 text-[11px] font-semibold rounded-md border-none bg-accent text-white transition-colors duration-[0.12s] hover:bg-vighi">
              <i className="fas fa-paper-plane"></i> Enviar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 divide-x divide-panel">
          {/* Paciente */}
          <div className="px-5 py-4">
            <div className={INFO_LABEL}><i className="fas fa-id-card"></i> Paciente <i className="far fa-edit text-accent cursor-pointer ml-auto opacity-60 hover:opacity-100"></i></div>
            <div className={`${INFO_VALOR} ${INFO_LINK}`}>{prot.paciente}</div>
            {prot.anio && <div className={INFO_SUB}>{new Date().getFullYear() - prot.anio} años ({prot.anio})</div>}
            {prot.cobertura && <div className={INFO_SUB}>{prot.cobertura}</div>}
            {prot.dni && (
              <div className={`${INFO_SUB} font-mono text-[10px]`}>
                #{prot.dni} <i className="fas fa-check text-[#10b981]"></i>
              </div>
            )}
          </div>
          {/* Médico */}
          <div className="px-5 py-4">
            <div className={INFO_LABEL}><i className="fas fa-user-md"></i> Médico</div>
            <div className={`${INFO_VALOR} ${INFO_LINK}`}>{prot.medico}</div>
            <div className={`${INFO_SUB} ${INFO_LINK}`}>{prot.procedencia}</div>
          </div>
          {/* Recorrido */}
          <div className="px-5 py-4">
            <div className={INFO_LABEL}><i className="fas fa-truck"></i> Recorrido</div>
            <div className={`${INFO_VALOR} ${INFO_LINK}`}>{prot.procedencia}</div>
            <div className={INFO_SUB}>LU (M), MA (M), MI (M), JU (M), VI (M)</div>
          </div>
          {/* Lote */}
          <div className="px-5 py-4">
            <div className={INFO_LABEL}><i className="fas fa-th-large"></i> Lote</div>
            {prot.lote && <div className={INFO_SUB}>{prot.lote}</div>}
            {prot.loteNombre && <div className={`${INFO_VALOR} ${INFO_LINK}`}>{prot.loteNombre}</div>}
          </div>
        </div>
      </div>

      {/* ── Card 2: Estudios ── */}
      <div className={CARD}>
        <div className="px-5 py-3 border-b border-panel bg-surf flex items-center justify-between gap-3">
          <span className="text-[13px] font-bold text-vighi">Estudios (QR)</span>
          {prot.entregaEstimada && (
            <span className="text-[11px] text-slate">Entrega estimada: {prot.entregaEstimada}</span>
          )}
        </div>

        {prot.estudios.map((est, i) => (
          <div key={i} className="border-b border-panel last:border-b-0 px-5 py-3">
            <div className="text-[12px] font-bold text-accent mb-1">{est.titulo}</div>
            <div className="text-[11px] text-slate mb-2 flex items-center gap-1.5">
              <i className="fas fa-user-circle"></i> {est.patologo}
            </div>
            {est.tacos.map((t, j) => (
              <div key={j} className="grid gap-2 py-1.5 border-b border-panel/50 last:border-b-0 text-[11px]" style={{ gridTemplateColumns: '130px 30px 1fr 80px 30px 1fr 60px' }}>
                <span className="text-slate font-mono text-[10px]"><i className="far fa-square mr-1"></i>{t.cassette}</span>
                <span className="text-center text-vighi font-bold">{t.cant}</span>
                <span>
                  <a href="#" className="text-accent no-underline hover:underline">{t.nombre}</a>
                  {t.subtipo && <span className="text-slate ml-1.5 text-[10px]">{t.subtipo}</span>}
                </span>
                <span className="text-slate">{t.material}</span>
                <span><IconoTaco tipo={t.icono} /></span>
                <span>
                  {t.icono !== 'material' && (
                    <button className="text-[10px] font-semibold text-[#dc2626] bg-none border-none cursor-pointer p-0 hover:underline">
                      <i className="fas fa-trash-alt"></i> eliminar
                    </button>
                  )}
                </span>
                <span className="text-[10px] text-[#059669] font-bold">
                  {t.checkT && <span className="mr-1">✓ T</span>}
                  {t.checkA && <span>✓ A</span>}
                </span>
              </div>
            ))}
          </div>
        ))}

        <div className="px-5 py-3 border-t border-panel flex items-center gap-3">
          <span className="text-[11px] font-semibold text-slate">Firmante</span>
          <div className="flex items-center gap-2 text-[12px] text-vighi">
            <i className="fas fa-lock text-slate opacity-50"></i>
            <i className="fas fa-signature text-slate opacity-50"></i>
            <span>{prot.firmante}</span>
            <a href="#" className="text-accent text-[11px] no-underline hover:underline ml-1"><i className="far fa-edit"></i> cambiar</a>
          </div>
        </div>
      </div>

      {/* ── Row: Archivos | Tareas | Comentarios ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Archivos */}
        <div className={CARD}>
          <div className="px-4 py-3 border-b border-panel bg-surf text-[12px] font-bold text-vighi">
            <i className="fas fa-folder-open text-accent mr-1.5"></i> Archivos
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
              {imgs.map((a, i) => (
                <div key={i} className="flex flex-col items-center gap-1 border border-panel rounded-[8px] p-2 text-center">
                  <div className="text-[22px] text-[#3b82f6]"><i className="fas fa-file-image"></i></div>
                  <div className="text-[9px] text-slate truncate w-full text-center">{a.label}</div>
                  <button className="text-[9px] font-semibold text-[#dc2626] bg-none border-none cursor-pointer p-0 hover:underline">
                    <i className="fas fa-trash-alt"></i> Eliminar
                  </button>
                </div>
              ))}
            </div>
            {pdfs.map((p, i) => (
              <div key={i} className="flex items-center gap-2 border-b border-panel py-1.5 last:border-b-0">
                <a href="#" className="text-accent text-[11px] no-underline hover:underline flex-1 truncate">
                  <i className="fas fa-share mr-1"></i> {p.label}
                </a>
                {p.cat && <span className="text-[9px] text-slate bg-surf px-1.5 py-px rounded flex-shrink-0">{p.cat}</span>}
                <button className="text-[10px] text-slate hover:text-[#dc2626] bg-none border-none cursor-pointer p-0">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
            <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[11px] font-semibold rounded-md border border-dashed border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent self-start mt-1">
              <i className="fas fa-plus"></i> Agregar archivo
            </button>
          </div>
        </div>

        {/* Tareas */}
        <div className={CARD}>
          <div className="px-4 py-3 border-b border-panel bg-surf text-[12px] font-bold text-vighi">
            <i className="fas fa-list text-accent mr-1.5"></i> Tareas
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              {prot.tareas.map((t, i) => (
                <div key={i} className="flex items-center justify-between gap-2 py-1.5 border-b border-panel last:border-b-0">
                  <a href="#" className="text-[12px] text-accent no-underline hover:underline">{t.nombre}</a>
                  <span className="text-[10px] text-slate flex items-center gap-1"><i className="fas fa-inbox"></i> {t.estado}</span>
                </div>
              ))}
            </div>
            <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[11px] font-semibold rounded-md border border-dashed border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent self-start">
              <i className="fas fa-plus"></i> Crear tarea
            </button>
            <div className="mt-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-vighi mb-2">
                <i className="fas fa-upload text-accent"></i> Procesamiento
              </div>
              <div className="flex items-center gap-1">
                <button
                  className={`h-7 px-3 text-[11px] font-semibold rounded-l-md border transition-[background,color,border-color] duration-[0.12s] cursor-pointer ${procMode === 'interno' ? 'bg-accent text-white border-accent' : 'bg-white text-vighi border-panel hover:border-accent hover:text-accent'}`}
                  onClick={() => setProcMode('interno')}
                >
                  <i className="fas fa-building mr-1"></i> Interno
                </button>
                <button
                  className={`h-7 px-3 text-[11px] font-semibold rounded-r-md border-t border-b border-r transition-[background,color,border-color] duration-[0.12s] cursor-pointer ${procMode === 'externo' ? 'bg-accent text-white border-accent' : 'bg-white text-vighi border-panel hover:border-accent hover:text-accent'}`}
                  onClick={() => setProcMode('externo')}
                >
                  <i className="fas fa-external-link-alt mr-1"></i> Externo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comentarios */}
        <div className={CARD}>
          <div className="px-4 py-3 border-b border-panel bg-surf text-[12px] font-bold text-vighi">
            <i className="fas fa-comments text-accent mr-1.5"></i> Comentarios
          </div>
          <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-[360px]">
            {prot.comentarios.map((c, i) => (
              <div key={i} className="bg-surf rounded-[8px] px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-vighi">{c.autor}</span>
                  <span className="text-[10px] text-slate">{c.fecha}</span>
                </div>
                <div className="text-[11px] text-[#333] leading-[1.5]">{c.texto}</div>
              </div>
            ))}
            <button className="inline-flex items-center gap-1.5 h-8 px-3 text-[11px] font-semibold rounded-md border border-dashed border-panel bg-white text-vighi transition-[border-color,color] duration-[0.12s] hover:border-accent hover:text-accent self-start mt-1">
              <i className="fas fa-plus"></i> Agregar comentario
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer tabs ── */}
      <div className={CARD}>
        <div className="flex items-stretch bg-surf border-b border-panel overflow-x-auto">
          {(['eventos','presupuestos','informes','eliminar'] as FTab[]).map(tab => (
            <button
              key={tab}
              className={`inline-flex items-center px-5 py-3 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-[color,border-color] duration-[0.12s] bg-transparent cursor-pointer ${tab === 'eliminar' ? (ftab === tab ? 'text-[#dc2626] border-[#dc2626]' : 'text-[#dc2626]/60 border-transparent hover:text-[#dc2626] hover:border-[rgba(220,38,38,0.4)]') : (ftab === tab ? 'text-accent border-accent' : 'text-slate border-transparent hover:text-vighi hover:border-panel')}`}
              onClick={() => setFtab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Eventos */}
        {ftab === 'eventos' && (
          <div className="px-5 py-4 text-[12px] text-slate">No hay eventos registrados.</div>
        )}

        {/* Presupuestos */}
        {ftab === 'presupuestos' && (
          <div className="p-4">
            <table className="w-full border-collapse m-0 text-[11px]">
              <thead>
                <tr className="bg-surf border-b border-panel">
                  <th className={TH_SM}>Protocolo</th>
                  <th className={TH_SM}>Estudio</th>
                  <th className={TH_SM}>Tipo</th>
                  <th className={TH_SM}>Proveedor</th>
                  <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-right">Monto</th>
                  <th className={TH_SM}>Autorización</th>
                </tr>
              </thead>
              <tbody>
                {prot.presupuestos.map((p, i) => (
                  <tr key={i} className="border-b border-panel hover:bg-surf">
                    <td className={TD_SM}>{p.protocolo}</td>
                    <td className={TD_SM}>{p.estudio}</td>
                    <td className={TD_SM}>{p.tipo}</td>
                    <td className={TD_SM}>{p.proveedor || '—'}</td>
                    <td className="px-3 py-2 text-[11px] text-[#333] align-middle text-right font-mono">$ {p.monto.toFixed(2).replace('.', ',')}</td>
                    <td className={TD_SM}><AuthBadge estado={p.autorizacion} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-1.5 text-[11px] text-vighi cursor-pointer">
                <input type="checkbox" /> Exento IVA
              </label>
              <button className="inline-flex items-center gap-1 h-7 px-2.5 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi hover:border-accent hover:text-accent transition-[border-color,color] duration-[0.12s]">
                <i className="fas fa-plus"></i> Nuevo presupuesto
              </button>
            </div>
          </div>
        )}

        {/* Informes */}
        {ftab === 'informes' && (
          <div className="p-4">
            <table className="w-full border-collapse m-0 text-[11px]">
              <thead>
                <tr className="bg-surf border-b border-panel">
                  <th className={TH_SM}>Título</th>
                  <th className={TH_SM}>Flujo</th>
                  <th className={THC_SM}>Estudio</th>
                  <th className={THC_SM}>IHQ</th>
                  <th className={THC_SM}>IHQ leyenda</th>
                  <th className={THC_SM}>Macro pub.</th>
                  <th className={THC_SM}>Publicado</th>
                  <th className={TH_SM}></th>
                </tr>
              </thead>
              <tbody>
                {prot.informes.map((inf, i) => (
                  <tr key={i} className="border-b border-panel hover:bg-surf">
                    <td className={TD_SM}>{inf.titulo}</td>
                    <td className={TD_SM}>{inf.flujo}</td>
                    <td className={TDC_SM}><BoolCell val={inf.estudio} /></td>
                    <td className={TDC_SM}><BoolCell val={inf.ihq} /></td>
                    <td className={TDC_SM}><BoolCell val={inf.ihqLeyenda} /></td>
                    <td className={TDC_SM}><BoolCell val={inf.macroPublicado} /></td>
                    <td className={TDC_SM}><BoolCell val={inf.publicado} /></td>
                    <td className={TD_SM}></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3">
              <button className="inline-flex items-center gap-1 h-7 px-2.5 text-[11px] font-semibold rounded-md border border-panel bg-white text-vighi hover:border-accent hover:text-accent transition-[border-color,color] duration-[0.12s]">
                <i className="fas fa-undo"></i> Actualizar
              </button>
            </div>
          </div>
        )}

        {/* Eliminar */}
        {ftab === 'eliminar' && (
          <div className="p-4">
            <div className="bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] rounded-[10px] px-5 py-4 flex items-center gap-4">
              <div className="text-[28px] text-[#ef4444] flex-shrink-0"><i className="fas fa-triangle-exclamation"></i></div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-[#dc2626] mb-0.5">Zona de peligro</div>
                <div className="text-[12px] text-[#dc2626]/80">Esta acción eliminará el protocolo y todos sus datos asociados. No se puede deshacer.</div>
              </div>
              <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-bold bg-[#dc2626] text-white border-none cursor-pointer transition-[background] duration-[0.12s] hover:bg-[#b91c1c]">
                <i className="fas fa-trash-alt"></i> Eliminar protocolo
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
