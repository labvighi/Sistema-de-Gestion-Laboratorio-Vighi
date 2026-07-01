// autorizaciones.js
// BDD: reemplazar AUTORIZACIONES_DATA con fetch a la API

var MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var AUTORIZACIONES_DATA = [
  { protocolo:'P1118341', cobertura:'AMCI', estado:'Informado', fecha:'24/06/2026', elegibilidad:true,  estudios:'0/1', resultado:''      },
  { protocolo:'P1114538', cobertura:'AMCI', estado:'Informado', fecha:'12/06/2026', elegibilidad:true,  estudios:'0/3', resultado:'Error'  },
  { protocolo:'P1111400', cobertura:'AMCI', estado:'Informado', fecha:'05/06/2026', elegibilidad:true,  estudios:'0/2', resultado:'Error'  },
  { protocolo:'P1109201', cobertura:'OSDE', estado:'Informado', fecha:'01/06/2026', elegibilidad:false, estudios:'1/1', resultado:'Ok'     },
  { protocolo:'P1107830', cobertura:'SMG',  estado:'Pendiente', fecha:'28/05/2026', elegibilidad:true,  estudios:'0/4', resultado:''       },
  { protocolo:'P1106554', cobertura:'OSDE', estado:'Pendiente', fecha:'20/05/2026', elegibilidad:true,  estudios:'2/4', resultado:'Error'  },
];

function filtrar() {
  var cob    = document.getElementById('autCobertura').value;
  var eleg   = document.getElementById('autElegibilidad').value;
  var autori = document.getElementById('autAutorizaciones').value;
  var fact   = document.getElementById('autFacturado').value;
  // BDD: también filtrar por anio/mes/dia

  return AUTORIZACIONES_DATA.filter(function(a) {
    if (cob  && a.cobertura !== cob) return false;
    if (eleg === 'aprobada'    && !a.elegibilidad) return false;
    if (eleg === 'no_aprobada' &&  a.elegibilidad) return false;
    if (autori === 'pendientes' && a.resultado !== '') return false;
    if (autori === 'completas'  && a.resultado === '') return false;
    // BDD: filtro facturado contra dato real
    return true;
  });
}

function renderTabla(lista) {
  var tbody = document.getElementById('autTbody');
  var footer = document.getElementById('autFooter');

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:#6b6b8a;font-size:12px;">Sin resultados para los filtros seleccionados.</td></tr>';
    footer.textContent = '0 items';
    return;
  }

  tbody.innerHTML = lista.map(function(a) {
    var elegHtml = a.elegibilidad
      ? '<i class="fas fa-check aut-check"></i>'
      : '<i class="fas fa-times aut-cross"></i>';

    var resultHtml = '';
    if (a.resultado === 'Error') resultHtml = '<span class="aut-resultado-error">Error</span>';
    else if (a.resultado === 'Ok') resultHtml = '<span class="aut-resultado-ok">Ok</span>';

    return '<tr>' +
      '<td><div class="aut-prot-cell">' +
        '<a href="protocolo.html?id=' + a.protocolo + '" class="aut-prot-link">#' + a.protocolo + '</a>' +
        '<a href="autorizacion.html?id=' + a.protocolo + '" class="aut-btn-autorizar"><i class="fas fa-wifi"></i> Autorizar</a>' +
      '</div></td>' +
      '<td><span class="aut-estado">' + a.estado + '</span></td>' +
      '<td><span class="aut-fecha">' + a.fecha + '</span></td>' +
      '<td>' + elegHtml + '</td>' +
      '<td><span class="aut-estudios">' + a.estudios + '</span></td>' +
      '<td>' + resultHtml + '</td>' +
    '</tr>';
  }).join('');

  footer.textContent = lista.length + ' item' + (lista.length !== 1 ? 's' : '');
}

document.addEventListener('DOMContentLoaded', function() {
  var hoy = new Date();

  // Poblar años
  var selAnio = document.getElementById('autAnio');
  var anioActual = hoy.getFullYear();
  for (var y = anioActual; y >= anioActual - 4; y--) {
    var opt = document.createElement('option');
    opt.value = y; opt.textContent = y;
    if (y === anioActual) opt.selected = true;
    selAnio.appendChild(opt);
  }

  // Poblar meses
  var selMes = document.getElementById('autMes');
  MESES_ES.forEach(function(m, i) {
    var opt = document.createElement('option');
    opt.value = i; opt.textContent = m;
    if (i === hoy.getMonth()) opt.selected = true;
    selMes.appendChild(opt);
  });

  // Poblar días
  var selDia = document.getElementById('autDia');
  for (var d = 1; d <= 31; d++) {
    var opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    selDia.appendChild(opt);
  }

  renderTabla(filtrar());

  ['autCobertura','autElegibilidad','autAutorizaciones','autFacturado','autAnio','autMes','autDia'].forEach(function(id) {
    document.getElementById(id).addEventListener('change', function() {
      renderTabla(filtrar());
    });
  });
});
