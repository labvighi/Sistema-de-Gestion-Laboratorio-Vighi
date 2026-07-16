'use client';

import { useState } from 'react';
import type { InformeHistopatologicoData, MaterialItem, Foto } from '../types';

// BDD: reemplazar por listado real de patólogos y firmas registradas en el sistema
const FIRMAS_SISTEMA = [
  { nombre: 'Dra. Diana Miserendino', mn: '98395', mp: '451876', firmaUrl: '/FirmaDianaMiserendino.png' },
  { nombre: 'Dra. Andrea Paparatto', mn: '', mp: '', firmaUrl: '/FirmaAndreaPaparatto.jpg' },
];

const INPUT = "w-full h-9 px-2.5 text-[12px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const TEXTAREA = `${INPUT} h-auto py-2 resize-y`;
const LABEL = "text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1 block";

function Campo({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

interface Props {
  initialData: InformeHistopatologicoData;
  onGuardar: (data: InformeHistopatologicoData) => void;
}

export default function InformeForm({ initialData, onGuardar }: Props) {
  const [paciente, setPaciente] = useState(initialData.paciente);
  const [medicoSolicitante, setMedicoSolicitante] = useState(initialData.medicoSolicitante);
  const [institucion, setInstitucion] = useState(initialData.institucion);
  const [institucionLogoUrl, setInstitucionLogoUrl] = useState(initialData.institucionLogoUrl);
  const [cobertura, setCobertura] = useState(initialData.cobertura);
  const [protocolo, setProtocolo] = useState(initialData.protocolo);
  const [fecha, setFecha] = useState(initialData.fecha);
  const [pagina, setPagina] = useState(initialData.pagina);
  const [diagnosticoFinal, setDiagnosticoFinal] = useState(initialData.diagnosticoFinal);
  const [hallazgos, setHallazgos] = useState(initialData.hallazgos);
  const [macroscopia, setMacroscopia] = useState(initialData.macroscopia);
  const [microscopia, setMicroscopia] = useState(initialData.microscopia);
  const [comentario, setComentario] = useState(initialData.comentario);
  const [material, setMaterial] = useState<MaterialItem[]>(initialData.material);
  const [fotos, setFotos] = useState<Foto[]>(initialData.fotos);
  const [patologaNombre, setPatologaNombre] = useState(initialData.patologa.nombre);
  const [patologaMn, setPatologaMn] = useState(initialData.patologa.mn);
  const [patologaMp, setPatologaMp] = useState(initialData.patologa.mp);
  const [firmaUrl, setFirmaUrl] = useState(initialData.patologa.firmaUrl);

  function actualizarMaterial(i: number, campo: keyof MaterialItem, valor: string) {
    setMaterial(prev => prev.map((m, idx) => idx === i ? { ...m, [campo]: valor } : m));
  }

  function agregarMaterial() {
    const siguienteLetra = String.fromCharCode(65 + material.length);
    setMaterial(prev => [...prev, { letra: siguienteLetra, desc: '' }]);
  }

  function eliminarMaterial(i: number) {
    setMaterial(prev => prev.filter((_, idx) => idx !== i));
  }

  function actualizarFotoCaption(i: number, valor: string) {
    setFotos(prev => prev.map((f, idx) => idx === i ? { ...f, caption: valor } : f));
  }

  function actualizarFotoArchivo(i: number, archivo: File) {
    const url = URL.createObjectURL(archivo);
    setFotos(prev => prev.map((f, idx) => idx === i ? { ...f, url } : f));
  }

  function actualizarLogoInstitucion(archivo: File) {
    setInstitucionLogoUrl(URL.createObjectURL(archivo));
  }

  function elegirFirmaSistema(nombre: string) {
    const firma = FIRMAS_SISTEMA.find(f => f.nombre === nombre);
    if (!firma) return;
    setPatologaNombre(firma.nombre);
    setPatologaMn(firma.mn);
    setPatologaMp(firma.mp);
    setFirmaUrl(firma.firmaUrl);
  }

  function subirFirmaPropia(archivo: File) {
    setFirmaUrl(URL.createObjectURL(archivo));
  }

  function agregarFoto() {
    setFotos(prev => [...prev, { caption: '' }]);
  }

  function eliminarFoto(i: number) {
    setFotos(prev => prev.filter((_, idx) => idx !== i));
  }

  function guardar() {
    onGuardar({
      paciente, medicoSolicitante, institucion, cobertura, protocolo, fecha, pagina,
      diagnosticoFinal, hallazgos, macroscopia, microscopia, comentario,
      material, fotos,
      institucionLogoUrl,
      patologa: { nombre: patologaNombre, mn: patologaMn, mp: patologaMp, firmaUrl },
    });
  }

  return (
    <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
      <div className="px-5 py-3 border-b border-panel bg-surf text-[13px] font-bold text-vighi">Datos del informe</div>

      <div className="p-5 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Campo label="Paciente"><input className={INPUT} value={paciente} onChange={e => setPaciente(e.target.value)} /></Campo>
          <Campo label="Protocolo"><input className={INPUT} value={protocolo} onChange={e => setProtocolo(e.target.value)} /></Campo>
          <Campo label="Médico solicitante"><input className={INPUT} value={medicoSolicitante} onChange={e => setMedicoSolicitante(e.target.value)} /></Campo>
          <Campo label="Fecha"><input className={INPUT} value={fecha} onChange={e => setFecha(e.target.value)} placeholder="dd/mm/aaaa" /></Campo>
          <Campo label="Institución">
            <div className="flex items-center gap-2">
              <input className={INPUT} value={institucion} onChange={e => setInstitucion(e.target.value)} />
              <div className="w-9 h-9 rounded-md border border-panel bg-surf flex items-center justify-center flex-shrink-0 overflow-hidden">
                {institucionLogoUrl ? (
                  <img src={institucionLogoUrl} alt="" className="w-full h-full object-contain" />
                ) : (
                  <i className="fas fa-image text-accent/30 text-[14px]"></i>
                )}
              </div>
              <label className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-vighi transition-colors duration-[0.12s] hover:border-accent hover:text-accent cursor-pointer whitespace-nowrap flex-shrink-0">
                <i className="fas fa-upload"></i> Logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && actualizarLogoInstitucion(e.target.files[0])}
                />
              </label>
            </div>
          </Campo>
          <Campo label="Página"><input className={INPUT} value={pagina} onChange={e => setPagina(e.target.value)} placeholder="1 de 1" /></Campo>
          <Campo label="Cobertura"><input className={INPUT} value={cobertura} onChange={e => setCobertura(e.target.value)} /></Campo>
        </div>

        <hr className="border-t border-panel" />

        <div className="grid grid-cols-1 gap-3">
          <Campo label="Diagnóstico final"><input className={INPUT} value={diagnosticoFinal} onChange={e => setDiagnosticoFinal(e.target.value)} /></Campo>
          <Campo label="Hallazgos"><textarea className={TEXTAREA} rows={2} value={hallazgos} onChange={e => setHallazgos(e.target.value)} /></Campo>
        </div>

        <hr className="border-t border-panel" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className={LABEL.replace('mb-1 block', '')}>Material</span>
            <button type="button" onClick={agregarMaterial} className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-accent transition-colors duration-[0.12s] hover:border-accent hover:bg-accent/5">
              <i className="fa fa-plus"></i> Agregar
            </button>
          </div>
          {material.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={`${INPUT} w-14 text-center font-bold`} value={m.letra} onChange={e => actualizarMaterial(i, 'letra', e.target.value.toUpperCase())} maxLength={2} />
              <input className={INPUT} value={m.desc} onChange={e => actualizarMaterial(i, 'desc', e.target.value)} placeholder="Descripción..." />
              <button type="button" onClick={() => eliminarMaterial(i)} className="inline-flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0 border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#fee2e2]">
                <i className="fa fa-times"></i>
              </button>
            </div>
          ))}
        </div>

        <hr className="border-t border-panel" />

        <div className="grid grid-cols-1 gap-3">
          <Campo label="Macroscopía"><textarea className={TEXTAREA} rows={3} value={macroscopia} onChange={e => setMacroscopia(e.target.value)} /></Campo>
          <Campo label="Microscopía"><textarea className={TEXTAREA} rows={4} value={microscopia} onChange={e => setMicroscopia(e.target.value)} /></Campo>
          <Campo label="Comentario"><textarea className={TEXTAREA} rows={2} value={comentario} onChange={e => setComentario(e.target.value)} /></Campo>
        </div>

        <hr className="border-t border-panel" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className={LABEL.replace('mb-1 block', '')}>Fotomicrografías</span>
            <button type="button" onClick={agregarFoto} className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-accent transition-colors duration-[0.12s] hover:border-accent hover:bg-accent/5">
              <i className="fa fa-plus"></i> Agregar
            </button>
          </div>
          {fotos.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-md border border-panel bg-surf flex items-center justify-center flex-shrink-0 overflow-hidden">
                {f.url ? (
                  <img src={f.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <i className="fas fa-image text-accent/30 text-[16px]"></i>
                )}
              </div>
              <label className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-vighi transition-colors duration-[0.12s] hover:border-accent hover:text-accent cursor-pointer whitespace-nowrap flex-shrink-0">
                <i className="fas fa-upload"></i> Subir
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && actualizarFotoArchivo(i, e.target.files[0])}
                />
              </label>
              <input className={INPUT} value={f.caption} onChange={e => actualizarFotoCaption(i, e.target.value)} placeholder="Ej: A. HE 40x" />
              <button type="button" onClick={() => eliminarFoto(i)} className="inline-flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0 border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#fee2e2]">
                <i className="fa fa-times"></i>
              </button>
            </div>
          ))}
        </div>

        <hr className="border-t border-panel" />

        <div className="flex flex-col gap-3">
          <Campo label="Firma del sistema">
            <select className={INPUT} value="" onChange={e => e.target.value && elegirFirmaSistema(e.target.value)}>
              <option value="">Seleccioná una firma registrada...</option>
              {FIRMAS_SISTEMA.map(f => <option key={f.nombre} value={f.nombre}>{f.nombre}</option>)}
            </select>
          </Campo>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Campo label="Patóloga/o"><input className={INPUT} value={patologaNombre} onChange={e => setPatologaNombre(e.target.value)} /></Campo>
            <Campo label="Matrícula nacional"><input className={INPUT} value={patologaMn} onChange={e => setPatologaMn(e.target.value)} /></Campo>
            <Campo label="Matrícula provincial"><input className={INPUT} value={patologaMp} onChange={e => setPatologaMp(e.target.value)} /></Campo>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-md border border-panel bg-surf flex items-center justify-center flex-shrink-0 overflow-hidden">
              {firmaUrl ? (
                <img src={firmaUrl} alt="" className="w-full h-full object-contain" />
              ) : (
                <i className="fas fa-signature text-accent/30 text-[16px]"></i>
              )}
            </div>
            <label className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-vighi transition-colors duration-[0.12s] hover:border-accent hover:text-accent cursor-pointer whitespace-nowrap flex-shrink-0">
              <i className="fas fa-upload"></i> Subir otra firma
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && subirFirmaPropia(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={guardar}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi"
          >
            <i className="fas fa-eye"></i> Guardar y ver informe
          </button>
        </div>
      </div>
    </div>
  );
}
