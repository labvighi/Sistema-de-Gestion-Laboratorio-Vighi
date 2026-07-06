'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const INPUT = "w-full h-[34px] px-2.5 text-[12px] rounded-[7px] border border-panel text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

interface Ubicacion { id: string; nombre: string; }

// BDD: cargar desde API
const UBICACIONES_MOCK: Ubicacion[] = [];

export default function NuevoMedicoView() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('Dr.');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mn, setMn] = useState('');
  const [mp, setMp] = useState('');
  const [mails, setMails] = useState(['']);
  const [ubicaciones, setUbicaciones] = useState(['']);
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<{ msg: string; error: boolean } | null>(null);
  const [guardando, setGuardando] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nuevosErrores: Record<string, boolean> = {};
    if (!nombre.trim()) nuevosErrores.nombre = true;
    if (!apellido.trim()) nuevosErrores.apellido = true;
    if (!mn.trim() && !mp.trim()) nuevosErrores.matricula = true;

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setStatus({ msg: 'Por favor, completá los campos requeridos.', error: true });
      return;
    }

    setErrores({});
    setGuardando(true);

    // BDD: reemplazar por POST a la API — por ahora persiste en localStorage
    const nuevoMedico = {
      id: Date.now(),
      titulo, nombre: nombre.trim(), apellido: apellido.trim(), mn: mn.trim(), mp: mp.trim(),
      mails: mails.map(m => m.trim()).filter(Boolean),
      ubicaciones: ubicaciones.filter(Boolean),
    };
    const pendientes = JSON.parse(localStorage.getItem('medicos_nuevos') || '[]');
    pendientes.push(nuevoMedico);
    localStorage.setItem('medicos_nuevos', JSON.stringify(pendientes));

    setStatus({ msg: '¡Médico creado exitosamente! Redirigiendo...', error: false });
    setTimeout(() => router.push('/medicos'), 1200);
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-3">
        <Link href="/medicos" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-panel bg-white text-slate text-[14px] transition-colors duration-[0.12s] hover:border-accent hover:text-accent">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <div>
          <div className="font-mono text-[10px] font-medium text-accent tracking-[0.12em] uppercase mb-0.5">Administración</div>
          <h1 className="text-[22px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2">
            <i className="fas fa-user-md text-accent text-[18px]"></i> Nuevo médico
          </h1>
        </div>
      </div>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="p-6">
          {status && (
            <div className={`text-[13px] rounded-lg px-3.5 py-2.5 mb-4 ${status.error ? 'bg-[#fff0f0] border border-[#fcc] text-[#c0392b]' : 'bg-[#f0fff4] border border-[#b2dfdb] text-[#1a7f5a]'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 flex-wrap mb-1">
              <div className="flex flex-col gap-1" style={{ width: 72 }}>
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Título</label>
                <select className={INPUT} value={titulo} onChange={e => setTitulo(e.target.value)}>
                  <option value="Dr.">Dr.</option>
                  <option value="Dra.">Dra.</option>
                  <option value="Lic.">Lic.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="">—</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 flex-[1.5] min-w-[120px]">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Nombre</label>
                <input className={INPUT} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre..." />
                {errores.nombre && <span className="text-[11px] text-[#dc2626] mt-0.5">Requerido</span>}
              </div>
              <div className="flex flex-col gap-1 flex-[1.5] min-w-[120px]">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Apellido</label>
                <input className={INPUT} value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido..." />
                {errores.apellido && <span className="text-[11px] text-[#dc2626] mt-0.5">Requerido</span>}
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Matrícula Nacional</label>
                <input className={INPUT} value={mn} onChange={e => setMn(e.target.value)} placeholder="MN..." />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Matrícula Provincial</label>
                <input className={INPUT} value={mp} onChange={e => setMp(e.target.value)} placeholder="MP..." />
                {errores.matricula && <span className="text-[11px] text-[#dc2626] mt-0.5">Ingresá al menos una matrícula</span>}
              </div>
            </div>

            <hr className="border-t border-panel my-5" />

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-vighi flex items-center gap-1.5"><i className="fas fa-envelope text-accent"></i> Correos electrónicos</span>
                <button type="button" className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-accent transition-colors duration-[0.12s] hover:border-accent hover:bg-accent/5"
                  onClick={() => setMails(m => [...m, ''])}>
                  <i className="fa fa-plus"></i> Agregar
                </button>
              </div>
              {mails.map((mail, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="email" className={INPUT} value={mail} placeholder="Mail..."
                    onChange={e => setMails(m => m.map((v, idx) => idx === i ? e.target.value : v))} />
                  <button type="button" className="inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#fee2e2]"
                    onClick={() => setMails(m => m.length > 1 ? m.filter((_, idx) => idx !== i) : [''])}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              ))}
            </div>

            <hr className="border-t border-panel my-5" />

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-vighi flex items-center gap-1.5"><i className="fas fa-map-marker-alt text-accent"></i> Ubicaciones</span>
                <button type="button" className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-accent transition-colors duration-[0.12s] hover:border-accent hover:bg-accent/5"
                  onClick={() => setUbicaciones(u => [...u, ''])}>
                  <i className="fa fa-plus"></i> Agregar
                </button>
              </div>
              {ubicaciones.map((u, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select className={INPUT} value={u}
                    onChange={e => setUbicaciones(arr => arr.map((v, idx) => idx === i ? e.target.value : v))}>
                    <option value="">Seleccioná una ubicación...</option>
                    {UBICACIONES_MOCK.map(op => <option key={op.id} value={op.id}>{op.nombre}</option>)}
                  </select>
                  <button type="button" className="inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-[#fee2e2]"
                    onClick={() => setUbicaciones(arr => arr.length > 1 ? arr.filter((_, idx) => idx !== i) : [''])}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              ))}
            </div>

            <hr className="border-t border-panel my-5" />

            <div className="flex items-center justify-end gap-2">
              <Link href="/medicos" className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[7px] text-[12px] font-semibold border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-accent hover:text-accent">
                <i className="fa fa-arrow-left"></i> Cancelar
              </Link>
              <button type="submit" disabled={guardando}
                className="inline-flex items-center gap-1.5 h-[34px] px-[18px] rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi disabled:opacity-60 disabled:cursor-not-allowed">
                <i className="fa fa-plus-circle"></i> {guardando ? 'Guardando...' : 'Crear médico'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
