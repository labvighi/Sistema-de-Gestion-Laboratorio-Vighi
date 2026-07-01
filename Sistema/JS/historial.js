// Lee el historial guardado por el usuario en localStorage.
// BDD: cuando exista backend, reemplazar con fetch a la API.
var HISTORIAL_DATA = {
  protocolos: historialObtener('protocolos'),
  medicos:    historialObtener('medicos'),
  pacientes:  historialObtener('pacientes')
};

function renderProtocolos() {
  var tbody = document.getElementById('hisProcTbody');
  tbody.innerHTML = HISTORIAL_DATA.protocolos.map(function(p) {
    var tipo = p.tipo ? '<span class="his-tipo">' + p.tipo + '</span>' : '';
    var elim = p.eliminado ? '<span class="his-badge-eliminado"><i class="fas fa-trash-alt"></i> Eliminado</span>' : '';
    return '<tr>' +
      '<td><a href="protocolo.html?p=' + p.numero + '" class="his-link-prot">#' + p.numero + '</a></td>' +
      '<td class="his-td-fecha">' + p.fecha + '</td>' +
      '<td>' + p.paciente + '</td>' +
      '<td>' + p.medico + '</td>' +
      '<td>' + p.procedencia + '</td>' +
      '<td>' + tipo + '</td>' +
      '<td>' + elim + '</td>' +
    '</tr>';
  }).join('');
}

function renderMedicos() {
  var tbody = document.getElementById('hisMedTbody');
  if (!HISTORIAL_DATA.medicos.length) {
    tbody.innerHTML = '<tr><td style="color:#aaa;font-size:11px;padding:8px 14px;">Sin historial</td></tr>';
    return;
  }
  tbody.innerHTML = HISTORIAL_DATA.medicos.map(function(m) {
    var nombre = typeof m === 'string' ? m : m.nombre;
    return '<tr><td><a href="medicos.html" class="his-link">' + nombre + '</a></td></tr>';
  }).join('');
}

function renderPacientes() {
  var tbody = document.getElementById('hisPacTbody');
  if (!HISTORIAL_DATA.pacientes.length) {
    tbody.innerHTML = '<tr><td style="color:#aaa;font-size:11px;padding:8px 14px;">Sin historial</td></tr>';
    return;
  }
  tbody.innerHTML = HISTORIAL_DATA.pacientes.map(function(p) {
    var nombre = typeof p === 'string' ? p : p.nombre;
    return '<tr><td><a href="pacientes.html" class="his-link">' + nombre + '</a></td></tr>';
  }).join('');
}

function aplicarAlturaFilas(wrap, thead, rows) {
  if (!wrap || !thead || !rows.length) return;
  var rowH = Math.floor((wrap.clientHeight - thead.clientHeight) / rows.length);
  // Restar padding vertical del td (5px arriba + 5px abajo = 10px)
  var tdH = Math.max(rowH - 10, 11);
  rows.forEach(function(r) {
    r.querySelectorAll('td').forEach(function(td) {
      td.style.height = tdH + 'px';
    });
  });
}

function expandirFilas() {
  aplicarAlturaFilas(
    document.querySelector('.his-page > .his-card .his-tabla-wrap'),
    document.querySelector('.his-page > .his-card .his-tabla thead'),
    document.querySelectorAll('#hisProcTbody tr')
  );
}

function expandirFilasSec(card) {
  if (!card) return;
  aplicarAlturaFilas(
    card.querySelector('.his-tabla-wrap'),
    card.querySelector('.his-tabla thead'),
    card.querySelectorAll('tbody tr')
  );
}

document.addEventListener('DOMContentLoaded', function() {
  renderProtocolos();
  renderMedicos();
  renderPacientes();
  setTimeout(function() {
    expandirFilas();
    document.querySelectorAll('.his-cols .his-card').forEach(function(c) {
      expandirFilasSec(c);
    });
  }, 80);
});
