export interface LoteActivo {
  tipo: string;
  lote: string;
  cantidad: number;
}

export interface Lote {
  id: string;
  nombre: string;
  estado: 'activo' | 'cerrado' | 'anulado';
  actividad?: string;
}

export type TipoLote = 'PAP' | 'CT' | 'BP' | 'IHQ';
