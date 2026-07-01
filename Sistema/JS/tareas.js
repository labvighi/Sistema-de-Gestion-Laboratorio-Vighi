// BDD: reemplazar TAREAS_DATA con fetch a la API
var TAREAS_DATA = [
  { solicitud: 'Revisión micro',      protocolo: '1070192', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'DM',   responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '06 mar. 26' },
  { solicitud: 'Reclamo informe',     protocolo: '1073747', prot_status: 'En curso',  actividad: 'Macro › Informar',   autor: 'MMP',  responsable: 'MMP', urgente: false, estado: 'en_curso',   fecha: '10 mar. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1070192', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'MMP',  responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '26 mar. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1075629', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'TR',   responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '25 mar. 26' },
  { solicitud: 'Error autorización UP', protocolo: '1072003', prot_status: 'Informado', actividad: 'Taco › Archivar', autor: 'DAVM', responsable: 'AL',  urgente: false, estado: 'en_curso',   fecha: '26 mar. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1076602', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'DAVM', responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '30 mar. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1075729', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'PC',   responsable: 'PC',  urgente: true,  estado: 'en_curso',   fecha: '26 mar. 26' },
  { solicitud: 'Error autorización UP', protocolo: '1077570', prot_status: 'Informado', actividad: 'Taco › Archivar', autor: 'TR',   responsable: 'AL',  urgente: false, estado: 'en_curso',   fecha: '26 mar. 26' },
  { solicitud: 'Error autorización UP', protocolo: '1079057', prot_status: 'Informado', actividad: 'Taco › Archivar', autor: 'AFH',  responsable: 'AL',  urgente: false, estado: 'en_curso',   fecha: '26 mar. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1075665', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'AFH',  responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '10 abr. 26' },
  { solicitud: 'Solicitud taco',      protocolo: '1076498', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'AP',   responsable: 'AP',  urgente: false, estado: 'en_curso',   fecha: '07 abr. 26' },
  { solicitud: 'Solicitud taco',      protocolo: '1079950', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'AP',   responsable: 'AP',  urgente: false, estado: 'en_curso',   fecha: '09 abr. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1075662', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'AFH',  responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '31 mar. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1076581', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'AFH',  responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '31 mar. 26' },
  { solicitud: 'Error autorización UP', protocolo: '1082557', prot_status: 'Informado', actividad: 'Taco › Archivar', autor: 'DM',   responsable: 'AL',  urgente: false, estado: 'en_curso',   fecha: '05 abr. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1080582', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'DM',   responsable: 'AP',  urgente: true,  estado: 'en_curso',   fecha: '06 abr. 26' },
  { solicitud: 'Revisión micro',      protocolo: '1080575', prot_status: 'Informado', actividad: 'Taco › Archivar',    autor: 'PC',   responsable: 'PC',  urgente: true,  estado: 'en_curso',   fecha: '06 abr. 26' },
  { solicitud: 'Error autorización UP', protocolo: '1084770', prot_status: 'Informado', actividad: 'Taco › Archivar', autor: 'PC',   responsable: 'AL',  urgente: false, estado: 'en_curso',   fecha: '13 abr. 26' },
  { solicitud: 'Error autorización UP', protocolo: '1078266', prot_status: 'Informado', actividad: 'Taco › Archivar', autor: 'MGM', responsable: 'AL',   urgente: false, estado: 'en_curso',   fecha: '13 abr. 26' },
  { solicitud: 'Solicitud taco IHQ',  protocolo: '1085832', prot_status: 'En curso',  actividad: 'Taco IHQ › Cortar', autor: 'VDH', responsable: 'VDH', urgente: true,  estado: 'en_curso',   fecha: '14 abr. 26' },
];

var tareasActuales = [];

function inicializar() {
  tareasActuales = TAREAS_DATA.slice();
  poblarFiltros();
  aplicarFiltros();
}

function poblarFiltros() {
  var responsables = [...new Set(TAREAS_DATA.map(function(t) { return t.responsable; }))].sort();
  var actividades  = [...new Set(TAREAS_DATA.map(function(t) { return t.actividad; }))].sort();
  var selR = document.getElementById('filtroResponsable');
  var selA = document.getElementById('filtroActividad');
  responsables.forEach(function(r) {
    var o = document.createElement('option'); o.value = r; o.textContent = r;
    selR.appendChild(o);
  });
  actividades.forEach(function(a) {
    var o = document.createElement('option'); o.value = a; o.textContent = a;
    selA.appendChild(o);
  });
}

function aplicarFiltros() {
  var estado      = document.getElementById('filtroEstado').value;
  var responsable = document.getElementById('filtroResponsable').value;
  var actividad   = document.getElementById('filtroActividad').value;

  var lista = TAREAS_DATA.filter(function(t) {
    if (responsable && t.responsable !== responsable) return false;
    if (actividad   && t.actividad   !== actividad)   return false;
    if (estado === 'abiertas'    && t.estado === 'completada') return false;
    if (estado === 'en_curso'    && t.estado !== 'en_curso')   return false;
    if (estado === 'completadas' && t.estado !== 'completada') return false;
    return true;
  });

  renderTabla(lista);
}

function renderTabla(lista) {
  var tbody = document.getElementById('tarTbody');
  var cont  = document.getElementById('tarContador');
  cont.textContent = lista.length + ' tarea' + (lista.length !== 1 ? 's' : '');

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="tar-vacio"><i class="fas fa-list-check tar-vacio-icono"></i><p>No hay tareas para mostrar.</p></td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(function(t) {
    var statusCls = t.prot_status === 'Informado' ? 'tar-status-informado' : 'tar-status-en-curso';
    var estadoCls = 'tar-estado-' + t.estado.replace(' ', '-');
    var estadoTxt = t.estado === 'en_curso' ? 'En curso' : t.estado === 'completada' ? 'Completada' : 'Pendiente';
    var urg = t.urgente ? '<span class="tar-badge-urg"><i class="fas fa-fire"></i> URG</span>' : '';
    return '<tr>' +
      '<td class="tar-td-solicitud"><a href="nuevoTicket.html" class="tar-link-solicitud">' + t.solicitud + '</a></td>' +
      '<td><a href="protocolo.html?p=' + t.protocolo + '" class="tar-link-protocolo">#' + t.protocolo + '</a></td>' +
      '<td><span class="tar-status ' + statusCls + '">' + t.prot_status + '</span></td>' +
      '<td class="tar-td-actividad">' + t.actividad + '</td>' +
      '<td><span class="tar-iniciales">' + t.autor + '</span></td>' +
      '<td><span class="tar-iniciales">' + t.responsable + '</span></td>' +
      '<td>' + urg + '</td>' +
      '<td><span class="tar-estado ' + estadoCls + '"><span class="tar-estado-dot"></span>' + estadoTxt + '</span></td>' +
      '<td class="tar-td-fecha">' + t.fecha + '</td>' +
    '</tr>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  inicializar();
  document.getElementById('filtroEstado').addEventListener('change', aplicarFiltros);
  document.getElementById('filtroResponsable').addEventListener('change', aplicarFiltros);
  document.getElementById('filtroActividad').addEventListener('change', aplicarFiltros);
});
