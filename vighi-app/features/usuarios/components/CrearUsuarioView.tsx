'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const INPUT = "w-full h-[34px] px-2.5 text-[12px] rounded-[7px] border border-panel text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

const PERFILES = ['Administración', 'Citotécnico', 'Dirección', 'Externo', 'Gerencial', 'Patólogo', 'Técnico'];

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CrearUsuarioView() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState(PERFILES[0]);
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<{ msg: string; error: boolean } | null>(null);
  const [guardando, setGuardando] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nuevosErrores: Record<string, boolean> = {};
    if (!nombre.trim()) nuevosErrores.nombre = true;
    if (!apellido.trim()) nuevosErrores.apellido = true;
    if (!validarEmail(email)) nuevosErrores.email = true;
    if (clave.length < 6) nuevosErrores.clave = true;
    if (clave !== confirmarClave) nuevosErrores.confirmar = true;

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setStatus({ msg: 'Por favor, corregí los errores marcados.', error: true });
      return;
    }

    // BDD: reemplazar por POST a la API — usa localStorage como placeholder
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some((u: { mail: string }) => u.mail.toLowerCase() === email.toLowerCase())) {
      setStatus({ msg: 'Este email ya está registrado.', error: true });
      return;
    }

    setErrores({});
    setGuardando(true);

    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u: { id: number }) => u.id)) + 1 : 1;
    usuarios.push({ id: nuevoId, nombre: nombre.trim(), apellido: apellido.trim(), mail: email.trim(), clave, perfil });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    setStatus({ msg: '¡Usuario creado exitosamente! Redirigiendo...', error: false });
    setTimeout(() => router.push('/usuarios'), 1200);
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-3">
        <Link href="/usuarios" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-panel bg-white text-slate text-[14px] transition-colors duration-[0.12s] hover:border-accent hover:text-accent">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <div>
          <div className="font-mono text-[10px] font-medium text-accent tracking-[0.12em] uppercase mb-0.5">Administración</div>
          <h1 className="text-[22px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2">
            <i className="fas fa-user-plus text-accent text-[18px]"></i> Nuevo usuario
          </h1>
        </div>
      </div>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="p-6 max-w-[640px]">
          {status && (
            <div className={`text-[13px] rounded-lg px-3.5 py-2.5 mb-4 ${status.error ? 'bg-[#fff0f0] border border-[#fcc] text-[#c0392b]' : 'bg-[#f0fff4] border border-[#b2dfdb] text-[#1a7f5a]'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Nombre</label>
                <input className={INPUT} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre..." />
                {errores.nombre && <span className="text-[11px] text-[#dc2626] mt-0.5">Requerido</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Apellido</label>
                <input className={INPUT} value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido..." />
                {errores.apellido && <span className="text-[11px] text-[#dc2626] mt-0.5">Requerido</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">E-mail</label>
                <input type="email" className={INPUT} value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail..." />
                {errores.email && <span className="text-[11px] text-[#dc2626] mt-0.5">E-mail inválido</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Tipo de usuario</label>
                <select className={INPUT} value={perfil} onChange={e => setPerfil(e.target.value)}>
                  {PERFILES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Contraseña</label>
                <input type="password" className={INPUT} value={clave} onChange={e => setClave(e.target.value)} placeholder="Contraseña..." minLength={6} />
                {errores.clave && <span className="text-[11px] text-[#dc2626] mt-0.5">Mínimo 6 caracteres</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Confirmar contraseña</label>
                <input type="password" className={INPUT} value={confirmarClave} onChange={e => setConfirmarClave(e.target.value)} placeholder="Confirmar contraseña..." />
                {errores.confirmar && <span className="text-[11px] text-[#dc2626] mt-0.5">Las contraseñas no coinciden</span>}
              </div>
            </div>

            <hr className="border-t border-panel my-5" />

            <div className="flex items-center justify-end gap-2">
              <Link href="/usuarios" className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[7px] text-[12px] font-semibold border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-accent hover:text-accent">
                <i className="fa fa-arrow-left"></i> Cancelar
              </Link>
              <button type="submit" disabled={guardando}
                className="inline-flex items-center gap-1.5 h-[34px] px-[18px] rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi disabled:opacity-60 disabled:cursor-not-allowed">
                <i className="fa fa-plus-circle"></i> {guardando ? 'Creando...' : 'Crear usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
