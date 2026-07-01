export interface Taco {
  cassette: string;
  cant: string | number;
  nombre: string;
  subtipo?: string;
  material: string;
  icono: 'pagina' | 'ihq' | 'persona' | 'material';
  checkT: boolean;
  checkA: boolean;
}

export interface Estudio {
  titulo: string;
  patologo: string;
  tacos: Taco[];
}

export interface Archivo {
  tipo: 'img' | 'pdf';
  label: string;
  cat?: string;
}

export interface Tarea {
  nombre: string;
  estado: string;
}

export interface Comentario {
  autor: string;
  fecha: string;
  texto: string;
}

export interface PresupuestoItem {
  protocolo: string;
  estudio: string;
  tipo: string;
  proveedor: string;
  monto: number;
  autorizacion: 'pendiente' | 'autorizado' | 'rechazado';
}

export interface InformeItem {
  titulo: string;
  flujo: string;
  estudio: boolean;
  ihq: boolean;
  ihqLeyenda: boolean;
  macroPublicado: boolean;
  publicado: boolean;
}

export interface Protocolo {
  numero: string;
  paciente: string;
  medico: string;
  procedencia: string;
  fecha: string;
  tipo: string;
  urgente?: boolean;
  cobertura?: string;
  dni?: string;
  anio?: number;
  lote?: string;
  loteNombre?: string;
  entregaEstimada?: string;
  firmante?: string;
  estudios: Estudio[];
  archivos: Archivo[];
  tareas: Tarea[];
  comentarios: Comentario[];
  presupuestos: PresupuestoItem[];
  informes: InformeItem[];
}
