// facturas.js
// BDD: reemplazar FACTURAS_DATA con fetch a la API

var MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// BDD: datos hardcodeados de ejemplo
var FACTURAS_DATA = [
  { nro:'000400000412', estado:'borrador', refact:false, ff:'09/06/26', fec:'09/07/26', cobertura:'LUIS PASTEUR', exento:1516942.68, gravado:224754.91, iva:23599.26 },
  { nro:'000400000413', estado:'borrador', refact:false, ff:'09/06/26', fec:'09/07/26', cobertura:'LUIS PASTEUR', exento:499117.78,  gravado:75119.76,  iva:7887.56  },
  { nro:'A1982',        estado:'emitida',  refact:false, ff:'05/06/26', fec:'02/07/26', cobertura:'CMG',          exento:21628661,   gravado:0,          iva:0        },
  { nro:'A1983',        estado:'emitida',  refact:false, ff:'08/06/26', fec:'15/07/26', cobertura:'CPI',          exento:6558639.30, gravado:0,          iva:0        },
  { nro:'A1984',        estado:'emitida',  refact:false, ff:'09/06/26', fec:'08/08/26', cobertura:'W. HOPE',      exento:251607.57,  gravado:8984.17,    iva:943.34   },
  { nro:'A1985',        estado:'emitida',  refact:false, ff:'09/06/26', fec:'27/08/26', cobertura:'PARTICULAR',   exento:220000,     gravado:0,          iva:0        },
  { nro:'A1986',        estado:'emitida',  refact:false, ff:'09/06/26', fec:'27/07/26', cobertura:'PROVIDENCIA',  exento:12426214,   gravado:0,          iva:0        },
  { nro:'A1987',        estado:'emitida',  refact:false, ff:'10/06/26', fec:'09/08/26', cobertura:'SMG',          exento:1855641.31, gravado:1031660.29, iva:108324.35},
  { nro:'A1988',        estado:'emitida',  refact:false, ff:'10/06/26', fec:'10/07/26', cobertura:'AMCI',         exento:454776.30,  gravado:0,          iva:0        },
  { nro:'A1990',        estado:'emitida',  refact:false, ff:'11/06/26', fec:'27/08/26', cobertura:'CM PUEYRREDON',exento:1268655.71, gravado:221531.57,  iva:23260.87 },
  { nro:'A1991',        estado:'emitida',  refact:false, ff:'16/06/26', fec:'16/07/26', cobertura:'IDIM',         exento:402423,     gravado:0,          iva:0        },
  { nro:'A1992',        estado:'emitida',  refact:false, ff:'16/06/26', fec:'31/07/26', cobertura:'HALITUS',      exento:128298,     gravado:0,          iva:0        },
  { nro:'A1993',        estado:'emitida',  refact:false, ff:'16/06/26', fec:'15/08/26', cobertura:'OSSEG',        exento:2284750.52, gravado:0,          iva:0        },
  { nro:'A1994',        estado:'emitida',  refact:false, ff:'16/06/26', fec:'24/07/26', cobertura:'LUIS PASTEUR', exento:147685.14,  gravado:52094.65,   iva:5469.95  },
  { nro:'A1995',        estado:'emitida',  refact:true,  ff:'17/06/26', fec:'24/07/26', cobertura:'LUIS PASTEUR', exento:524375.10,  gravado:106661.49,  iva:11199.50 },
  { nro:'A1996',        estado:'emitida',  refact:false, ff:'17/06/26', fec:'24/07/26', cobertura:'LUIS PASTEUR', exento:569596.20,  gravado:147685.14,  iva:15507.00 },
  { nro:'A1997',        estado:'emitida',  refact:false, ff:'17/06/26', fec:'24/07/26', cobertura:'LUIS PASTEUR', exento:880367.25,  gravado:106661.49,  iva:11199.50 },
  { nro:'A1998',        estado:'emitida',  refact:false, ff:'17/06/26', fec:'24/07/26', cobertura:'LUIS PASTEUR', exento:4348567.34, gravado:339654.28,  iva:35663.80 },
  { nro:'A1999',        estado:'cobrada',  refact:false, ff:'22/06/26', fec:'30/07/26', cobertura:'OSDIPP',       exento:309953.11,  gravado:0,          iva:0        },
  { nro:'A2000',        estado:'cobrada',  refact:false, ff:'22/06/26', fec:'21/08/26', cobertura:'VISITAR',      exento:35206.68,   gravado:0,          iva:0        },
];

function $m(n) { return '$ ' + n.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2}); }

function badgeHtml(estado) {
  if (estado === 'borrador') return '<span class="fct-badge fct-badge-borrador"><i class="fas fa-pencil-alt"></i> Borrador</span>';
  if (estado === 'emitida')  return '<span class="fct-badge fct-badge-emitida"><i class="fas fa-file-alt"></i> Emitida</span>';
  if (estado === 'cobrada')  return '<span class="fct-badge fct-badge-cobrada"><i class="fas fa-check"></i> Cobrada</span>';
  return '';
}

function filtrar() {
  var cob    = document.getElementById('fctCobertura').value;
  var anio   = document.getElementById('fctAnio').value;
  var mes    = document.getElementById('fctMes').value;      // 0-11
  var estado = document.getElementById('fctEstado').value;
  var refact = document.getElementById('fctRefact').value;

  return FACTURAS_DATA.filter(function(f) {
    if (cob    && f.cobertura !== cob) return false;
    if (estado === 'sincobrar' && f.estado === 'cobrada') return false;
    if (estado && estado !== 'sincobrar' && f.estado !== estado) return false;
    if (refact === 'solo_refact' && !f.refact) return false;
    if (refact === 'solo_fact'   &&  f.refact) return false;
    // BDD: filtrar por anio/mes contra fecha real del servidor
    return true;
  });
}

function renderTabla(lista) {
  var tbody = document.getElementById('fctTbody');
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:32px;color:#6b6b8a;font-size:12px;">Sin resultados para los filtros seleccionados.</td></tr>';
    document.getElementById('fctTotales').innerHTML = '';
    return;
  }
  var rows = lista.map(function(f) {
    var total = f.exento + f.gravado + f.iva;
    return '<tr>' +
      '<td><a href="#" class="fct-nro">' + f.nro + '</a></td>' +
      '<td>' + badgeHtml(f.estado) + '</td>' +
      '<td><span class="fct-fecha">' + f.ff + '</span></td>' +
      '<td><span class="fct-fec-wrap"><span class="fct-fecha">' + f.fec + '</span><i class="fas fa-question-circle fct-fec-hint" title="Fecha Estimada de Cobro"></i></span></td>' +
      '<td><span class="fct-cob">' + f.cobertura + '</span></td>' +
      '<td class="fct-num">' + $m(f.exento)  + '</td>' +
      '<td class="fct-num">' + $m(f.gravado) + '</td>' +
      '<td class="fct-num">' + $m(f.iva)     + '</td>' +
      '<td class="fct-num">' + $m(total)     + '</td>' +
    '</tr>';
  });
  tbody.innerHTML = rows.join('');

  // Totales
  var totTotal = lista.reduce(function(a,f){ return a + f.exento + f.gravado + f.iva; }, 0);
  document.getElementById('fctTotales').innerHTML =
    '<div class="fct-tot-item"><span class="fct-tot-label">Total</span><span class="fct-tot-val">' + $m(totTotal) + '</span></div>';
}

document.addEventListener('DOMContentLoaded', function() {
  // Poblar años
  var selAnio = document.getElementById('fctAnio');
  var hoy = new Date();
  var anioActual = hoy.getFullYear();
  for (var y = anioActual; y >= anioActual - 4; y--) {
    var opt = document.createElement('option');
    opt.value = y; opt.textContent = y;
    if (y === anioActual) opt.selected = true;
    selAnio.appendChild(opt);
  }

  // Poblar meses
  var selMes = document.getElementById('fctMes');
  MESES_ES.forEach(function(m, i) {
    var opt = document.createElement('option');
    opt.value = i; opt.textContent = m;
    if (i === hoy.getMonth()) opt.selected = true;
    selMes.appendChild(opt);
  });

  // Render inicial
  renderTabla(filtrar());

  // Listeners
  ['fctCobertura','fctAnio','fctMes','fctEstado','fctRefact'].forEach(function(id) {
    document.getElementById(id).addEventListener('change', function() {
      renderTabla(filtrar());
    });
  });
});
