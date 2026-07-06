'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const INPUT = "w-full h-[34px] px-2.5 text-[12px] rounded-[7px] border border-panel text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";

function ToggleGroup({ options, value, onChange, urgentValue }: { options: { valor: string; label: string; icon: string }[]; value: string; onChange: (v: string) => void; urgentValue?: string }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map(o => {
        const active = value === o.valor;
        const isUrgent = o.valor === urgentValue;
        return (
          <button
            key={o.valor}
            type="button"
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11.5px] font-semibold border transition-colors duration-[0.12s] ${
              active
                ? (isUrgent ? 'bg-[#dc2626] text-white border-[#dc2626]' : 'bg-accent text-white border-accent')
                : 'bg-white text-slate border-panel hover:border-accent hover:text-accent'
            }`}
            onClick={() => onChange(o.valor)}
          >
            <i className={o.icon}></i> {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function NuevoTicketView() {
  const router = useRouter();
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [urgeProtocolo, setUrgeProtocolo] = useState(false);
  const [urgeFactura, setUrgeFactura] = useState(false);
  const [area, setArea] = useState('Gerencial');
  const [notificar, setNotificar] = useState(true);
  const [tipo, setTipo] = useState('Resolutivo');
  const [urgencia, setUrgencia] = useState('Regular');
  const [prioridad, setPrioridad] = useState('Baja');
  const [enviando, setEnviando] = useState(false);

  function handleCrear() {
    setEnviando(true);
    // BDD: reemplazar por POST a la API
    setTimeout(() => router.push('/soporte'), 800);
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <div className="flex items-center gap-1.5 text-[12px] text-slate">
        <Link href="/soporte" className="flex items-center gap-1.5 text-slate hover:text-accent transition-colors"><i className="fas fa-life-ring"></i> Soporte</Link>
        <span className="opacity-40">/</span>
        <span className="text-vighi font-medium">Nuevo ticket de soporte</span>
      </div>

      <h1 className="text-[22px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2">
        <i className="fas fa-plus-circle text-accent text-[18px]"></i> Nuevo ticket de soporte
      </h1>

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Asunto</label>
                <input className={INPUT} value={asunto} onChange={e => setAsunto(e.target.value)} autoFocus />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Descripción</label>
                <textarea rows={5} className="w-full px-2.5 py-2 text-[12px] rounded-[7px] border border-panel text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 resize-y"
                  value={descripcion} onChange={e => setDescripcion(e.target.value)} />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Urgencia</label>
                <label className="flex items-center gap-2 text-[12px] text-vighi mb-1.5 cursor-pointer">
                  <input type="checkbox" checked={urgeProtocolo} onChange={e => setUrgeProtocolo(e.target.checked)} />
                  Impide la entrega del informe de uno o más protocolos
                </label>
                <label className="flex items-center gap-2 text-[12px] text-vighi cursor-pointer">
                  <input type="checkbox" checked={urgeFactura} onChange={e => setUrgeFactura(e.target.checked)} />
                  Impide la entrega de una o más facturas que deben ser entregadas hoy
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Responsable asignado</label>
                <div className="flex items-center gap-2 flex-wrap">
                  <select className={INPUT} style={{ width: 160 }} value={area} onChange={e => setArea(e.target.value)}>
                    <option>Gerencial</option>
                    <option>Técnico</option>
                    <option>Administración</option>
                  </select>
                  <select className={INPUT} style={{ width: 200 }}>
                    <option>BACA, Tiago</option>
                  </select>
                  <label className="flex items-center gap-1.5 text-[11.5px] text-slate cursor-pointer">
                    <input type="checkbox" checked={notificar} onChange={e => setNotificar(e.target.checked)} />
                    Notificar por e-mail al responsable
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <button type="button" className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[7px] text-[12px] font-semibold border border-panel bg-white text-accent transition-colors duration-[0.12s] hover:border-accent hover:bg-accent/5">
                  <i className="fas fa-robot"></i> Analizar con IA
                </button>
                <button type="button" disabled={enviando} onClick={handleCrear}
                  className="inline-flex items-center gap-1.5 h-[34px] px-[18px] rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi disabled:opacity-60 disabled:cursor-not-allowed">
                  <i className="fas fa-paper-plane"></i> {enviando ? 'Creando...' : 'Crear ticket'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Tipo</label>
                <ToggleGroup value={tipo} onChange={setTipo} options={[
                  { valor: 'Resolutivo', label: 'Resolutivo', icon: 'fas fa-wrench' },
                  { valor: 'Evolutivo', label: 'Evolutivo', icon: 'fas fa-rocket' },
                ]} />
              </div>
              <hr className="border-t border-panel" />
              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Urgencia</label>
                <ToggleGroup value={urgencia} onChange={setUrgencia} urgentValue="Urgente" options={[
                  { valor: 'Regular', label: 'Regular', icon: 'far fa-clock' },
                  { valor: 'Urgente', label: 'Urgente', icon: 'fas fa-fire' },
                ]} />
              </div>
              <hr className="border-t border-panel" />
              <div>
                <label className="block text-[10px] font-bold text-slate uppercase tracking-[0.07em] mb-1.5">Prioridad</label>
                <ToggleGroup value={prioridad} onChange={setPrioridad} urgentValue="Alta" options={[
                  { valor: 'Baja', label: 'Baja', icon: 'fas fa-person-walking' },
                  { valor: 'Media', label: 'Media', icon: 'fas fa-person-running' },
                  { valor: 'Alta', label: 'Alta', icon: 'fas fa-bolt' },
                ]} />
              </div>
            </div>
          </div>

          <div className="border-t border-panel pt-4">
            <div className="flex flex-wrap gap-4 text-[11px] text-slate mb-2.5">
              <div className="flex items-center gap-1.5 font-semibold text-vighi"><i className="fas fa-camera"></i> Captura de pantalla (opcional)</div>
              <div className="flex items-center gap-1.5"><i className="fas fa-desktop"></i> Capturar con tecla Imprimir Pantalla</div>
              <div className="flex items-center gap-1.5"><i className="fas fa-paste"></i> Pegar con CTRL + V</div>
            </div>
            <div className="min-h-[100px] rounded-lg border border-dashed border-panel bg-surf flex items-center justify-center">
              <span className="text-[12px] text-slate flex items-center gap-1.5"><i className="fas fa-image"></i> La captura pegada aparecerá aquí</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
