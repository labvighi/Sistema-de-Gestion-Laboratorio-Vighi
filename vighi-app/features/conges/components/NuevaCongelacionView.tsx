'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const INPUT = "w-full h-[34px] px-2.5 text-[12px] rounded-[7px] border border-panel text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const SELECT = `${INPUT} pr-6`;

function turnoDeHora(horaStr: string) {
  const [h, m] = horaStr.split(':').map(Number);
  const mins = h * 60 + m;
  if (mins <= 12 * 60) return 'Mañana';
  if (mins <= 16 * 60) return 'Mediodía';
  if (mins <= 20 * 60) return 'Tarde';
  return 'Noche';
}

function generarHoras() {
  const horas: string[] = [];
  for (let h = 6; h <= 23; h++) {
    horas.push(`${String(h).padStart(2, '0')}:00`);
    horas.push(`${String(h).padStart(2, '0')}:30`);
  }
  return horas;
}

const HORAS = generarHoras();

function Toggle({ options, value, onChange }: { options: { valor: string; label: string; icon: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map(o => (
        <button
          key={o.valor}
          type="button"
          className={`inline-flex items-center justify-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-semibold border transition-colors duration-[0.12s] ${value === o.valor ? 'bg-accent text-white border-accent' : 'bg-white text-slate border-panel hover:border-accent hover:text-accent'}`}
          onClick={() => onChange(o.valor)}
        >
          {o.icon && <i className={o.icon}></i>} {o.label}
        </button>
      ))}
    </div>
  );
}

export default function NuevaCongelacionView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fechaParam = searchParams.get('fecha');
  const [estado, setEstado] = useState('Agendada');
  const [tipo, setTipo] = useState('GI');
  const [ubicacion, setUbicacion] = useState('');
  const [hora, setHora] = useState(HORAS[0]);
  const turno = turnoDeHora(hora);
  const [patologo, setPatologo] = useState('');
  const [medico, setMedico] = useState('');
  const [material, setMaterial] = useState('');
  const [cobertura, setCobertura] = useState('particular');
  const [dni, setDni] = useState('');
  const [guardando, setGuardando] = useState(false);

  const fecha = fechaParam ? new Date(`${fechaParam}T00:00:00`) : new Date();
  const fechaTexto = fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  function handleAsignar() {
    setGuardando(true);
    // BDD: reemplazar por POST a la API
    setTimeout(() => router.push('/conges'), 800);
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-1.5 text-[12px] text-slate">
        <Link href="/conges" className="flex items-center gap-1.5 text-slate hover:text-accent transition-colors"><i className="fas fa-snowflake"></i> Congelaciones</Link>
        <span className="opacity-40">/</span>
        <Link href="/conges" className="text-slate hover:text-accent transition-colors">Agenda</Link>
        <span className="opacity-40">/</span>
        <span className="text-vighi font-medium">Asignar nueva congelación</span>
      </div>

      <h1 className="text-[22px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2">
        <i className="fas fa-plus-circle text-accent text-[18px]"></i> Asignar nueva congelación
      </h1>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="p-6 flex flex-col gap-5 max-w-[720px]">
          <div className="flex items-center gap-2 text-[13px] text-vighi font-medium">
            <i className="fas fa-calendar-alt text-accent"></i> {fechaTexto}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Estado inicial</label>
            <Toggle
              value={estado}
              onChange={setEstado}
              options={[
                { valor: 'Agendada', label: 'A confirmar', icon: 'fas fa-hourglass-half' },
                { valor: 'Confirmada', label: 'Confirmada', icon: 'fas fa-check' },
              ]}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Tipo</label>
            <Toggle
              value={tipo}
              onChange={setTipo}
              options={[
                { valor: 'GI', label: 'GI', icon: '' },
                { valor: 'QR', label: 'QR', icon: '' },
                { valor: 'PUN', label: 'PUN', icon: '' },
              ]}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-col gap-1 flex-1 min-w-[220px]">
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Ubicación</label>
              <select className={SELECT} value={ubicacion} onChange={e => setUbicacion(e.target.value)}>
                <option value="">Seleccioná una ubicación...</option>
              </select>
            </div>
            <div className="flex flex-col gap-1" style={{ width: 110 }}>
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Turno</label>
              <div className={`${INPUT} flex items-center bg-surf text-slate`}>{turno}</div>
            </div>
            <div className="flex flex-col gap-1" style={{ width: 110 }}>
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Hora</label>
              <select className={SELECT} value={hora} onChange={e => setHora(e.target.value)}>
                {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-[1.5] min-w-[200px]">
              <label className="text-[10px] font-bold text-slate uppercase tracking-[0.07em]">Patólogo</label>
              <select className={SELECT} value={patologo} onChange={e => setPatologo(e.target.value)}>
                <option value="">[ Seleccionar ]</option>
                <option>VEGA, Patricia</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Médico tratante</label>
            <div className="flex items-center gap-2">
              <input className={INPUT} value={medico} onChange={e => setMedico(e.target.value)} placeholder="Médico tratante..." />
              <button type="button" className="inline-flex items-center gap-1.5 h-[34px] px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-slate whitespace-nowrap transition-colors duration-[0.12s] hover:border-accent hover:text-accent"
                onClick={() => setMedico('')}>
                <i className="fas fa-times"></i> Limpiar
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Material</label>
            <input className={INPUT} value={material} onChange={e => setMaterial(e.target.value)} placeholder="Material..." />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Cobertura</label>
            <select className={SELECT} style={{ maxWidth: 260 }} value={cobertura} onChange={e => setCobertura(e.target.value)}>
              <option value="particular">[ particular ]</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Paciente</label>
            <div className="flex items-center gap-2">
              <input className={INPUT} style={{ maxWidth: 220 }} value={dni} onChange={e => setDni(e.target.value)} placeholder="Buscar DNI..." />
              <button type="button" className="inline-flex items-center gap-1.5 h-[34px] px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-vighi whitespace-nowrap transition-colors duration-[0.12s] hover:border-accent hover:text-accent">
                <i className="fas fa-search"></i> Buscar por DNI
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 h-[34px] px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-accent whitespace-nowrap transition-colors duration-[0.12s] hover:border-accent hover:bg-accent/5">
                <i className="fas fa-plus-circle"></i> Cargar uno nuevo
              </button>
            </div>
          </div>

          <hr className="border-t border-panel" />

          <div className="flex items-center justify-end gap-2">
            <Link href="/conges" className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[7px] text-[12px] font-semibold border border-panel bg-white text-slate transition-colors duration-[0.12s] hover:border-accent hover:text-accent">
              Cancelar
            </Link>
            <button type="button" disabled={guardando} onClick={handleAsignar}
              className="inline-flex items-center gap-1.5 h-[34px] px-[18px] rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi disabled:opacity-60 disabled:cursor-not-allowed">
              <i className="fas fa-plus-circle"></i> {guardando ? 'Asignando...' : 'Asignar congelación'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
