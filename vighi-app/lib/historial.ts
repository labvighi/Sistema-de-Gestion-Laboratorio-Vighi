const MAX = 10;

export interface HistProtocolo {
  numero: string;
  fecha: string;
  paciente: string;
  medico: string;
  procedencia: string;
  tipo?: string;
  eliminado?: boolean;
}

export interface HistNombre {
  nombre: string;
}

function get<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('historial_' + key) || '[]'); }
  catch { return []; }
}

function add<T extends { numero?: string; nombre?: string }>(key: string, item: T) {
  if (typeof window === 'undefined') return;
  try {
    const id = item.numero || item.nombre;
    let list = get<T>(key).filter(e => (e.numero || e.nombre) !== id);
    list.unshift(item);
    if (list.length > MAX) list = list.slice(0, MAX);
    localStorage.setItem('historial_' + key, JSON.stringify(list));
  } catch {}
}

export const historial = {
  getProtocolos: () => get<HistProtocolo>('protocolos'),
  getMedicos:    () => get<HistNombre>('medicos'),
  getPacientes:  () => get<HistNombre>('pacientes'),
  addProtocolo:  (item: HistProtocolo) => add('protocolos', item),
  addMedico:     (item: HistNombre) => add('medicos', item),
  addPaciente:   (item: HistNombre) => add('pacientes', item),
};
