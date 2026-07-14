'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

type TabId = 'tablero' | 'agenda' | 'dashboard' | 'patologo';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'tablero',   label: 'Tablero',         icon: 'fas fa-table-cells' },
  { id: 'agenda',    label: 'Agenda',           icon: 'fas fa-calendar-alt' },
  { id: 'dashboard', label: 'Dashboard',        icon: 'fas fa-chart-bar' },
  { id: 'patologo',  label: 'Agenda patólogo',  icon: 'fas fa-user-md' },
];

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEMANA = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const ANIOS = ['2024', '2025', '2026'];

const SEL = "h-[30px] px-2 text-[11px] rounded-md border border-panel bg-white text-vighi font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent/10";
const SEL_SELECT = `${SEL} pr-5`;
const FGLABEL = "text-[9px] font-bold text-slate uppercase tracking-[0.08em] m-0";
const TOGGLE = "inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md text-[11px] font-semibold border transition-colors duration-[0.12s] cursor-pointer whitespace-nowrap";
const TOGGLE_OFF = `${TOGGLE} bg-white text-vighi border-panel hover:border-accent hover:text-accent`;
const TOGGLE_ON = `${TOGGLE} bg-accent text-white border-accent`;

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function buildWeeks(anio: number, mesIndex: number) {
  const primerDia = new Date(anio, mesIndex, 1);
  const ultimoDia = new Date(anio, mesIndex + 1, 0);
  const weeks: Date[][] = [];
  let cursor = getMonday(primerDia);
  while (cursor <= ultimoDia) {
    const semana = Array.from({ length: 7 }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i));
    weeks.push(semana);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7);
  }
  return weeks;
}

function fechaISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function indiceSemanaActual(weeks: Date[][], hoy: Date) {
  const hoyISO = fechaISO(hoy);
  const idx = weeks.findIndex(sem => sem.some(d => fechaISO(d) === hoyISO));
  return idx === -1 ? 0 : idx;
}

function Wip({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-14 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fef3c7] text-[#d97706] text-[11px] font-semibold">
        <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
        En construcción
      </div>
      <div className="text-[13px] text-slate">{text} — disponible próximamente</div>
    </div>
  );
}

export default function CongesView() {
  const [activeTab, setActiveTab] = useState<TabId>('tablero');
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mesIndex, setMesIndex] = useState(hoy.getMonth());
  const semanasIniciales = useMemo(() => buildWeeks(hoy.getFullYear(), hoy.getMonth()), []);
  const [semanaIdx, setSemanaIdx] = useState(() => indiceSemanaActual(semanasIniciales, hoy));
  const [horario, setHorario] = useState<'en' | 'fuera' | null>(null);

  const semanas = useMemo(() => buildWeeks(anio, mesIndex), [anio, mesIndex]);
  const semanaActiva = semanas[Math.min(semanaIdx, semanas.length - 1)] || [];

  function cambiarPeriodo(nuevoAnio: number, nuevoMes: number) {
    setAnio(nuevoAnio);
    setMesIndex(nuevoMes);
    setSemanaIdx(0);
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Laboratorio"
        title="Congelaciones"
        icon="fas fa-snowflake"
        action={
          <Link href="/conges/nueva" className="btn-primary">
            <i className="fas fa-plus"></i> Nueva congelación
          </Link>
        }
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="flex items-stretch border-b border-panel bg-surf overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-[color,border-color] duration-[0.12s] bg-transparent cursor-pointer ${activeTab === t.id ? 'text-accent border-accent' : 'text-slate border-transparent hover:text-vighi hover:border-panel'}`}
              onClick={() => setActiveTab(t.id)}
            >
              <i className={t.icon}></i> {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'tablero' && (
          <div className="px-5 py-3.5 border-b border-panel bg-surf flex flex-col gap-2.5">
            <div className="flex items-end gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Usuario asignado</label>
                <select className={SEL_SELECT} style={{ width: 180 }}><option>[ Todos ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Patólogo</label>
                <select className={SEL_SELECT} style={{ width: 180 }}><option>[ Todos ]</option></select>
              </div>
            </div>
            <div className="flex items-end gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Actividad</label>
                <select className={SEL_SELECT} style={{ width: 160 }}><option>[ Todas ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Flujo</label>
                <select className={SEL_SELECT} style={{ width: 160 }}><option>[ Todos ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Tipo</label>
                <select className={SEL_SELECT} style={{ width: 120 }}><option>[ Todos ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Procedencia</label>
                <select className={SEL_SELECT} style={{ width: 130 }}><option>[ Todas ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Cobertura</label>
                <select className={SEL_SELECT} style={{ width: 180 }}><option>[ Todas ]</option></select>
              </div>
              <div className="flex flex-col gap-1">
                <label className={FGLABEL}>Médico</label>
                <select className={SEL_SELECT} style={{ width: 180 }}><option>[ Todos ]</option></select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tablero' && (
          <table className="w-full border-collapse font-sans m-0">
            <thead>
              <tr className="bg-surf border-b-2 border-panel">
                {['Actividad','# Protocolo','Procedencia','Cobertura','PC','MF','Médico',''].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate whitespace-nowrap text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="py-14 text-center text-slate text-[13px]">
                  <i className="fas fa-snowflake block text-[28px] text-[rgba(124,62,237,0.2)] mb-3"></i>
                  <p>No hay congelaciones registradas.</p>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {activeTab === 'agenda' && (
          <>
            <div className="px-5 py-3 border-t border-panel bg-surf flex flex-col gap-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL_SELECT} style={{ width: 170 }}><option>[ Procedencia: todas ]</option></select>
                <select className={SEL_SELECT} style={{ width: 160 }}><option>[ Patólogo: todos ]</option></select>
                <select className={SEL_SELECT} style={{ width: 210 }}><option>[ Médico tratante: todos ]</option></select>
                <select className={SEL_SELECT} style={{ width: 170 }}><option>[ Vinculadas: todas ]</option></select>
                {['GI','QR','PUN'].map(tag => (
                  <button key={tag} className={`${SEL} cursor-pointer font-bold`}>{tag}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select className={SEL_SELECT} value={anio} onChange={e => cambiarPeriodo(Number(e.target.value), mesIndex)}>
                  {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select className={SEL_SELECT} value={mesIndex} onChange={e => cambiarPeriodo(anio, Number(e.target.value))}>
                  {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <div className="w-px h-4 bg-panel mx-0.5 flex-shrink-0" />
                {semanas.map((sem, i) => (
                  <button
                    key={i}
                    className={semanaIdx === i ? TOGGLE_ON : TOGGLE_OFF}
                    onClick={() => setSemanaIdx(i)}
                  >
                    {sem[0].getDate()} - {sem[6].getDate()}
                  </button>
                ))}
                <div className="w-px h-4 bg-panel mx-0.5 flex-shrink-0" />
                <button
                  className={horario === 'en' ? TOGGLE_ON : TOGGLE_OFF}
                  onClick={() => setHorario(h => h === 'en' ? null : 'en')}
                >
                  <i className="far fa-clock"></i> En horario
                </button>
                <button
                  className={horario === 'fuera' ? TOGGLE_ON : TOGGLE_OFF}
                  onClick={() => setHorario(h => h === 'fuera' ? null : 'fuera')}
                >
                  <i className="far fa-clock"></i> Fuera de horario
                </button>
                <button className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md text-[11px] font-semibold border border-panel bg-white text-vighi transition-colors duration-[0.12s] hover:border-accent hover:text-accent cursor-pointer ml-auto">
                  <i className="fas fa-download"></i> Descargar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 divide-x divide-panel border-t border-panel">
              {semanaActiva.map((dia, i) => (
                <div key={i} className="flex flex-col min-w-0">
                  <Link
                    href={`/conges/nueva?fecha=${fechaISO(dia)}`}
                    className="flex items-center justify-center gap-1.5 px-2 py-2.5 text-[11px] font-semibold text-vighi bg-surf hover:bg-accent hover:text-white transition-colors duration-[0.12s] border-b border-panel whitespace-nowrap"
                    title={`Crear congelación para ${DIAS_SEMANA[i]} ${dia.getDate()}`}
                  >
                    <i className="fa fa-plus text-[9px]"></i> {DIAS_SEMANA[i]} {dia.getDate()}
                  </Link>
                  <div className="flex-1 min-h-[160px] flex items-center justify-center px-2 py-6 text-center">
                    <span className="text-[10.5px] text-slate">Sin congelaciones</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'dashboard' && <Wip text="Dashboard de congelaciones" />}

        {activeTab === 'patologo' && <Wip text="Agenda de patólogo" />}
      </div>
    </div>
  );
}
