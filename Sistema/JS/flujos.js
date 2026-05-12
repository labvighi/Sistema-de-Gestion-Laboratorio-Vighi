// flujos.js
// Página genérica de estación — se auto-completa según ?ida=XX

const FLUJOS_DATA = {
  // TRASLADOS — LABORATORIO
  14:  { estacion:'TRASLADOS',    seccion:'LABORATORIO',    paso:'Lab > Informar',      proxIda: null,  proxLabel:'Borrador / DRAFT' },
  40:  { estacion:'TRASLADOS',    seccion:'LABORATORIO',    paso:'Lab > Colorear',      proxIda: 14,    proxLabel:'Lab > Informar' },
  102: { estacion:'TRASLADOS',    seccion:'LABORATORIO',    paso:'Lab > Revisar',       proxIda: 40,    proxLabel:'Lab > Colorear' },
  120: { estacion:'TRASLADOS',    seccion:'LABORATORIO',    paso:'Lab > Archivar',      proxIda: 102,   proxLabel:'Lab > Revisar' },
  105: { estacion:'TRASLADOS',    seccion:'LABORATORIO',    paso:'Lab Ext > Procesar',  proxIda: null,  proxLabel: null },
  // TRASLADOS — CITOTÉCNICOS
  90:  { estacion:'TRASLADOS',    seccion:'CITOTÉCNICOS',   paso:'Cito > Informar',     proxIda: null,  proxLabel: null },
  // TRASLADOS — DEVOLUCIÓN
  110: { estacion:'TRASLADOS',    seccion:'DEVOLUCIÓN',     paso:'Cons > Entregar',     proxIda: null,  proxLabel: null },
  // LABORATORIO — PROCESAMIENTO
  106: { estacion:'LABORATORIO',  seccion:'PROCESAMIENTO',  paso:'IHQ > Procesar',      proxIda: null,  proxLabel: null },
  50:  { estacion:'LABORATORIO',  seccion:'PROCESAMIENTO',  paso:'Histo > Procesar',    proxIda: null,  proxLabel: null },
  57:  { estacion:'LABORATORIO',  seccion:'PROCESAMIENTO',  paso:'Liq > Centrifugar',   proxIda: null,  proxLabel: null },
  // LABORATORIO — INCLUSIÓN
  60:  { estacion:'LABORATORIO',  seccion:'INCLUSIÓN',      paso:'Cassette > Incluir',  proxIda: null,  proxLabel: null },
  // LABORATORIO — CORTE PH
  70:  { estacion:'LABORATORIO',  seccion:'CORTE PH',       paso:'Taco > Cortar',       proxIda: null,  proxLabel: null },
  104: { estacion:'LABORATORIO',  seccion:'CORTE PH',       paso:'Taco IHQ > Cortar',   proxIda: null,  proxLabel: null },
  // LABORATORIO — COLOREADO
  80:  { estacion:'LABORATORIO',  seccion:'COLOREADO',      paso:'Porta > Colorear',    proxIda: null,  proxLabel: null },
  // LABORATORIO — ARCHIVO
  130: { estacion:'LABORATORIO',  seccion:'ARCHIVO',        paso:'Porta > Archivar',    proxIda: null,  proxLabel: null },
  118: { estacion:'LABORATORIO',  seccion:'ARCHIVO',        paso:'Taco > Archivar',     proxIda: null,  proxLabel: null },
  // LABORATORIO — RESERVA
  140: { estacion:'LABORATORIO',  seccion:'RESERVA',        paso:'Reserva > Tirar',     proxIda: null,  proxLabel: null },
  // DIAGNÓSTICOS — MACROSCOPÍA
  20:  { estacion:'DIAGNÓSTICOS', seccion:'MACROSCOPÍA',    paso:'Macro > Informar',    proxIda: null,  proxLabel: null },
  // DIAGNÓSTICOS — MICROSCOPÍA
  100: { estacion:'DIAGNÓSTICOS', seccion:'MICROSCOPÍA',    paso:'Micro > Informar',    proxIda: null,  proxLabel: null },
  108: { estacion:'DIAGNÓSTICOS', seccion:'MICROSCOPÍA',    paso:'Micro > Interpretar', proxIda: null,  proxLabel: null },
  103: { estacion:'DIAGNÓSTICOS', seccion:'MICROSCOPÍA',    paso:'Micro > Revisar',     proxIda: null,  proxLabel: null },
};

function getIda() {
  return parseInt(new URLSearchParams(window.location.search).get('ida')) || null;
}

function poblarDias() {
  const sel = document.getElementById('flDia');
  if (!sel) return;
  sel.innerHTML = '<option value="">[ día ]</option>';
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    sel.appendChild(opt);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  poblarDias();

  const ida   = getIda();
  const flujo = ida ? FLUJOS_DATA[ida] : null;

  // Nombre estación y paso
  document.getElementById('flEstacion').textContent = flujo ? flujo.estacion : 'Estación';
  document.getElementById('flPaso').textContent     = flujo
    ? `${flujo.seccion} / ${flujo.paso}`
    : '—';
  document.title = flujo ? `${flujo.paso} - Susana Vighi` : 'Estación - Susana Vighi';

  // Próxima etapa
  const elProxima = document.getElementById('flProxima');
  if (flujo && flujo.proxLabel) {
    elProxima.innerHTML = flujo.proxIda
      ? `Próxima: <a href="flujos.html?ida=${flujo.proxIda}" class="flujos-proxima-link">${flujo.proxLabel}</a>`
      : `Próxima: <span class="flujos-proxima-link">${flujo.proxLabel}</span>`;
  }
});
