// presupuestos.js
// BDD: reemplazar PRESUPUESTOS_DATA con fetch a la API

var PRESUPUESTOS_DATA = [
  { id:1, paciente:'CODUTTI, AIDA SANDRA',  items:5,  cobertura:'MEDICUS',    fecha:'3/10/2025 10:19:43', estado:'enviado'   },
  { id:2, paciente:'GIANNINI, MARTA',        items:3,  cobertura:'OSDE',       fecha:'5/10/2025 09:02:11', estado:'aprobado'  },
  { id:3, paciente:'TORRES, LUIS ALBERTO',   items:0,  cobertura:'GALENO',     fecha:'6/10/2025 14:33:50', estado:'borrador'  },
  { id:4, paciente:'ROMERO, CLAUDIA ELENA',  items:2,  cobertura:'SMG',        fecha:'7/10/2025 11:45:22', estado:'rechazado' },
  { id:5, paciente:'FERNANDEZ, JOSE MARIA',  items:7,  cobertura:'MEDICUS',    fecha:'8/10/2025 08:17:04', estado:'enviado'   },
  { id:6, paciente:'LOPEZ, MARIA CRISTINA',  items:1,  cobertura:'PARTICULAR', fecha:'9/10/2025 16:00:30', estado:'borrador'  },
];

function estadoHtml(estado) {
  var cls = { borrador:'pre-estado-borrador', enviado:'pre-estado-enviado', aprobado:'pre-estado-aprobado', rechazado:'pre-estado-rechazado' }[estado] || '';
  var label = estado.charAt(0).toUpperCase() + estado.slice(1);
  return '<span class="' + cls + '">' + label + '</span>';
}

function filtrar() {
  var cob    = document.getElementById('preCobertura').value;
  var estado = document.getElementById('preEstado').value;
  var items  = document.getElementById('preItems').value;

  return PRESUPUESTOS_DATA.filter(function(p) {
    if (cob    && p.cobertura !== cob)         return false;
    if (estado && p.estado    !== estado)      return false;
    if (items === 'con'  && p.items === 0)     return false;
    if (items === 'sin'  && p.items  >  0)     return false;
    return true;
  });
}

function renderTabla(lista) {
  var tbody = document.getElementById('preTbody');
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:32px;color:#6b6b8a;font-size:12px;">Sin resultados para los filtros seleccionados.</td></tr>';
    return;
  }
  tbody.innerHTML = lista.map(function(p) {
    var countTxt = p.items > 0 ? ' <span class="pre-count">(' + p.items + ')</span>' : '';
    return '<tr>' +
      '<td><a href="#" class="pre-link">' + p.paciente + '</a>' + countTxt + '</td>' +
      '<td><span class="pre-cob">' + p.cobertura + '</span></td>' +
      '<td><span class="pre-fecha">' + p.fecha + '</span></td>' +
      '<td>' + estadoHtml(p.estado) + '</td>' +
    '</tr>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  renderTabla(filtrar());

  ['preCobertura', 'preEstado', 'preItems'].forEach(function(id) {
    document.getElementById(id).addEventListener('change', function() {
      renderTabla(filtrar());
    });
  });
});
