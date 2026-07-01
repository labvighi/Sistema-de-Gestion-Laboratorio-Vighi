// autorizacion.js
// BDD: reemplazar datos hardcodeados con fetch al protocolo por ID

var AUTORIZACION_MOCK = {
  P1118341: {
    num: '#P1118341',
    badges: [
      { tipo:'validado',  label:'Validado',        icon:'fa-eye' },
      { tipo:'gi',        label:'GI',               icon:'' },
      { tipo:'informado', label:'Informado',         icon:'fa-file-alt' },
      { tipo:'diag',      label:'NG',               icon:'' },
      { tipo:'prio',      label:'Prioridad regular', icon:'fa-star' }
    ],
    paciente:   'CASALI, ELIANA 27 (1999)',
    cobertura:  'AMCI',
    credencial: '#41308260-00',
    medico:     'MORELLI, NATALIA',
    procedencia:'CMMONSERRAT - QUILMES',
    recorrido:  'CMMONSERRAT - QUILMES',
    loteTipo:   'PAPS',
    loteNum:    'BB-0623.1',
    nomencladores: [
      { cod:'150106', estudio:'Citología Exocervical', autorizacion: 0 }
    ],
    json: '{\n  "nroCredencial": "41308260-00",\n  "fechaRecoleccion": "2026-06-23",\n  "estudios": [\n    {"cantidad": 1, "nomenclador": "150106"}\n  ]\n}',
    log: [],
    presupuestos: [],
    exentoIva: true
  }
};

function badgeHtml(b) {
  if (b.tipo === 'validado')  return '<span class="prot-badge prot-badge-validado"><i class="fas ' + b.icon + '"></i> ' + b.label + '</span>';
  if (b.tipo === 'gi')        return '<span class="prot-badge prot-badge-validado">' + b.label + '</span>';
  if (b.tipo === 'informado') return '<span class="prot-badge prot-badge-informado"><i class="fas ' + b.icon + '"></i> ' + b.label + '</span>';
  if (b.tipo === 'diag')      return '<span class="prot-badge prot-badge-sp">' + b.label + '</span>';
  if (b.tipo === 'prio')      return '<span class="prot-badge prot-badge-validado"><i class="fas ' + b.icon + '"></i> ' + b.label + '</span>';
  return '';
}

// El script está al final del body, el DOM ya está disponible
(function() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'P1118341';

  // BDD: fetch real del protocolo
  var d = AUTORIZACION_MOCK[id] || AUTORIZACION_MOCK['P1118341'];

  // Número
  document.getElementById('autNumero').textContent = d.num;

  // Badges
  document.getElementById('autBadges').innerHTML = d.badges.map(badgeHtml).join('');

  // Ficha
  document.getElementById('autPaciente').textContent    = d.paciente;
  document.getElementById('autCobertura').textContent   = d.cobertura;
  document.getElementById('autCredencial').innerHTML    = d.credencial + ' <i class="fas fa-check" style="color:#22c55e;font-size:10px"></i>';
  document.getElementById('autMedico').textContent      = d.medico;
  document.getElementById('autProcedencia').textContent = d.procedencia;
  document.getElementById('autRecorrido').textContent   = d.recorrido;
  document.getElementById('autLoteTipo').textContent    = d.loteTipo;
  document.getElementById('autLoteNum').textContent     = d.loteNum;

  // Nomencladores
  document.getElementById('autNomTbody').innerHTML = d.nomencladores.map(function(n) {
    return '<tr><td>' + n.cod + '</td><td>' + n.estudio + '</td><td>' + n.autorizacion + '</td></tr>';
  }).join('');

  // JSON
  document.getElementById('autJson').value = d.json;

  // Log
  if (d.log.length) {
    document.getElementById('autLogTbody').innerHTML = d.log.map(function(l) {
      return '<tr><td>' + l.fecha + '</td><td>' + l.usuario + '</td><td>' + l.tipo + '</td><td>' + l.evento + '</td></tr>';
    }).join('');
  }

  // Presupuestos (tab)
  if (d.presupuestos.length) {
    document.getElementById('aftPresupuestosTbody').innerHTML = d.presupuestos.map(function(p) {
      return '<tr><td>' + p.protocolo + '</td><td>' + p.estudio + '</td><td>' + p.tipo + '</td><td>' + p.proveedor + '</td><td>' + p.monto + '</td><td>' + p.autorizacion + '</td></tr>';
    }).join('');
  }

  // Exento IVA
  document.getElementById('aftExentoIva').checked = !!d.exentoIva;

  // Botón autorizar
  document.getElementById('autBtnAutorizar').addEventListener('click', function() {
    // BDD: llamar a la API de autorización
    alert('Enviando solicitud de autorización para ' + d.num + '�?�');
  });
})();
