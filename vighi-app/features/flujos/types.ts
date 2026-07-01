export interface FlujoMeta {
  estacion: string;
  seccion: string;
  paso: string;
  proxIda: number | null;
  proxLabel: string | null;
}

// BDD: en producción esto vendrá de la API
export const FLUJOS_DATA: Record<number, FlujoMeta> = {
  14:  { estacion: 'TRASLADOS',    seccion: 'LABORATORIO',   paso: 'Lab > Informar',      proxIda: null, proxLabel: 'Borrador / DRAFT' },
  40:  { estacion: 'TRASLADOS',    seccion: 'LABORATORIO',   paso: 'Lab > Colorear',      proxIda: 14,   proxLabel: 'Lab > Informar' },
  102: { estacion: 'TRASLADOS',    seccion: 'LABORATORIO',   paso: 'Lab > Revisar',       proxIda: 40,   proxLabel: 'Lab > Colorear' },
  120: { estacion: 'TRASLADOS',    seccion: 'LABORATORIO',   paso: 'Lab > Archivar',      proxIda: 102,  proxLabel: 'Lab > Revisar' },
  105: { estacion: 'TRASLADOS',    seccion: 'LABORATORIO',   paso: 'Lab Ext > Procesar',  proxIda: null, proxLabel: null },
  90:  { estacion: 'TRASLADOS',    seccion: 'CITOTÉCNICOS',  paso: 'Cito > Informar',     proxIda: null, proxLabel: null },
  110: { estacion: 'TRASLADOS',    seccion: 'DEVOLUCIÓN',    paso: 'Cons > Entregar',     proxIda: null, proxLabel: null },
  106: { estacion: 'LABORATORIO',  seccion: 'PROCESAMIENTO', paso: 'IHQ > Procesar',      proxIda: null, proxLabel: null },
  50:  { estacion: 'LABORATORIO',  seccion: 'PROCESAMIENTO', paso: 'Histo > Procesar',    proxIda: null, proxLabel: null },
  57:  { estacion: 'LABORATORIO',  seccion: 'PROCESAMIENTO', paso: 'Liq > Centrifugar',   proxIda: null, proxLabel: null },
  60:  { estacion: 'LABORATORIO',  seccion: 'INCLUSIÓN',     paso: 'Cassette > Incluir',  proxIda: null, proxLabel: null },
  70:  { estacion: 'LABORATORIO',  seccion: 'CORTE PH',      paso: 'Taco > Cortar',       proxIda: null, proxLabel: null },
  104: { estacion: 'LABORATORIO',  seccion: 'CORTE PH',      paso: 'Taco IHQ > Cortar',   proxIda: null, proxLabel: null },
  80:  { estacion: 'LABORATORIO',  seccion: 'COLOREADO',     paso: 'Porta > Colorear',    proxIda: null, proxLabel: null },
  130: { estacion: 'LABORATORIO',  seccion: 'ARCHIVO',       paso: 'Porta > Archivar',    proxIda: null, proxLabel: null },
  118: { estacion: 'LABORATORIO',  seccion: 'ARCHIVO',       paso: 'Taco > Archivar',     proxIda: null, proxLabel: null },
  140: { estacion: 'LABORATORIO',  seccion: 'RESERVA',       paso: 'Reserva > Tirar',     proxIda: null, proxLabel: null },
  20:  { estacion: 'DIAGNÓSTICOS', seccion: 'MACROSCOPÍA',   paso: 'Macro > Informar',    proxIda: null, proxLabel: null },
  100: { estacion: 'DIAGNÓSTICOS', seccion: 'MICROSCOPÍA',   paso: 'Micro > Informar',    proxIda: null, proxLabel: null },
  108: { estacion: 'DIAGNÓSTICOS', seccion: 'MICROSCOPÍA',   paso: 'Micro > Interpretar', proxIda: null, proxLabel: null },
  103: { estacion: 'DIAGNÓSTICOS', seccion: 'MICROSCOPÍA',   paso: 'Micro > Revisar',     proxIda: null, proxLabel: null },
};
