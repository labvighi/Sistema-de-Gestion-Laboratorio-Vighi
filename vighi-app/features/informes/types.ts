export interface MaterialItem {
  letra: string;
  desc: string;
}

export interface Foto {
  caption: string;
  url?: string;
}

export interface Patologa {
  nombre: string;
  mn: string;
  mp: string;
  firmaUrl?: string;
}

export interface InformeHistopatologicoData {
  paciente: string;
  medicoSolicitante: string;
  institucion: string;
  institucionLogoUrl?: string;
  cobertura: string;
  protocolo: string;
  fecha: string;
  pagina: string;
  diagnosticoFinal: string;
  hallazgos: string;
  material: MaterialItem[];
  macroscopia: string;
  microscopia: string;
  comentario: string;
  fotos: Foto[];
  patologa: Patologa;
}
