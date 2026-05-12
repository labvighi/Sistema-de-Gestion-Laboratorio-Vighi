// activacion.js

// Datos de ejemplo
const ACT_DATA = [
  { fr:'11/05', protocolo:'P1100749', tipo:'PAPS', lote:'BB-0511.1', procedencia:'COSTA RICA 5108', estado:'Nuevo (no activado)', medico:'GOMEZ',    estudios:2, cobertura:'OSDE',  paciente:'BONES',         viendo:'CA',  autorizacion:null,          imagen:true,  tieneMedico:true,  tieneEstudios:true,  tienePaciente:true  },
  { fr:'11/05', protocolo:'P1100771', tipo:'PAPS', lote:'BB-0511.1', procedencia:'PALPA2570',       estado:'Nuevo (no activado)', medico:'BURLANDO', estudios:2, cobertura:'SMG',   paciente:'WICHMACKI',     viendo:'CA',  autorizacion:'494187200',   imagen:true,  tieneMedico:true,  tieneEstudios:true,  tienePaciente:true  },
  { fr:'11/05', protocolo:'P1100776', tipo:'PAPS', lote:'BB-0511.1', procedencia:'PALPA2570',       estado:'Nuevo (no activado)', medico:'BURLANDO', estudios:2, cobertura:'SMG',   paciente:'JUAREZ SANCHEZ',viendo:null,  autorizacion:'',            imagen:true,  tieneMedico:true,  tieneEstudios:false, tienePaciente:true  },
  { fr:'11/05', protocolo:'P1100782', tipo:'PAPS', lote:'BB-0511.1', procedencia:'PALPA2570',       estado:'Nuevo (no activado)', medico:'MACIAS',   estudios:1, cobertura:'SMG',   paciente:'PERALTA',       viendo:null,  autorizacion:'312004411',   imagen:true,  tieneMedico:true,  tieneEstudios:true,  tienePaciente:false },
  { fr:'11/05', protocolo:'P1100736', tipo:'PAPS', lote:'BB-0511.1', procedencia:'CMVILELLA',       estado:'Nuevo (no activado)', medico:'FABENI',   estudios:1, cobertura:'OSPJN', paciente:'Serrano',       viendo:null,  autorizacion:null,          imagen:false, tieneMedico:true,  tieneEstudios:false, tienePaciente:false },
  { fr:'11/05', protocolo:'P1100737', tipo:'PAPS', lote:'BB-0511.1', procedencia:'CMVILELLA',       estado:'Nuevo (no activado)', medico:'FABENI',   estudios:2, cobertura:'SANCOR',paciente:'DE',            viendo:null,  autorizacion:'',            imagen:false, tieneMedico:false, tieneEstudios:false, tienePaciente:false },
  { fr:'11/05', protocolo:'P1100738', tipo:'PAPS', lote:'BB-0511.1', procedencia:'CMVILELLA',       estado:'Nuevo (no activado)', medico:'FABENI',   estudios:1, cobertura:'',      paciente:'WAINBERG',      viendo:null,  autorizacion:null,          imagen:false, tieneMedico:true,  tieneEstudios:false, tienePaciente:true  },
  { fr:'11/05', protocolo:'P1100740', tipo:'PAPS', lote:'BB-0511.1', procedencia:'CMVILELLA',       estado:'Nuevo (no activado)', medico:'ELIZALDE', estudios:1, cobertura:'OSDE',  paciente:'GARCIA NADIA',  viendo:null,  autorizacion:'887123400',   imagen:false, tieneMedico:true,  tieneEstudios:true,  tienePaciente:true  },
  { fr:'11/05', protocolo:'P1100742', tipo:'PAPS', lote:'BB-0511.1', procedencia:'CMVILELLA',       estado:'Nuevo (no activado)', medico:'ELIZALDE', estudios:1, cobertura:'',      paciente:'GIAQUINTA',     viendo:null,  autorizacion:null,          imagen:false, tieneMedico:false, tieneEstudios:false, tienePaciente:false },
  { fr:'11/05', protocolo:'P1100744', tipo:'PAPS', lote:'BB-0511.1', procedencia:'CMVILELLA',       estado:'Nuevo (no activado)', medico:'FALLOTICO',estudios:1, cobertura:'',      paciente:'RODRIGUEZ',     viendo:null,  autorizacion:null,          imagen:false, tieneMedico:false, tieneEstudios:false, tienePaciente:false },
];

// null = no aplica (sin columna), '' = definida pero sin número, 'XXXXX' = tiene número
function celdaAuth(item) {
  if (item.autorizacion === null) return '<td class="act-td-auth"></td>';
  const tieneNum = item.autorizacion !== '';
  const tooltip  = tieneNum ? '# Autorización ' + item.autorizacion : 'Sin autorización definida';
  const clase    = tieneNum ? 'act-auth-con' : 'act-auth-sin';
  return `<td class="act-td-auth">
    <span class="act-auth-grupo ${clase}" title="${tooltip}">
      <i class="fas fa-check"></i>
      <i class="fas fa-desktop"></i>
      <i class="fas fa-hourglass-half"></i>
    </span>
  </td>`;
}

function semaforo(item) {
  const campos = [item.imagen, item.tieneMedico, item.tieneEstudios, item.tienePaciente];
  const completos = campos.filter(Boolean).length;
  if (completos === 4) return '<span class="act-semaforo act-sem-verde"></span>';
  if (completos === 0) return '<span class="act-semaforo act-sem-rojo"></span>';
  return '<span class="act-semaforo act-sem-amarillo"></span>';
}

function renderTabla(lista) {
  const tbody = document.getElementById('actTbody');
  const cont  = document.getElementById('actContador');
  if (!tbody) return;

  if (cont) cont.textContent = lista.length + ' protocolo' + (lista.length !== 1 ? 's' : '');

  if (!lista.length) {
    tbody.innerHTML = `<tr><td colspan="12" class="act-vacio"><i class="fas fa-info-circle"></i> No hay protocolos para los filtros seleccionados.</td></tr>`;
    return;
  }

  tbody.innerHTML = lista.map(function(p) {
    return `<tr>
      <td class="act-td-fr">${p.fr}</td>
      <td><a href="#" class="act-link-protocolo">#${p.protocolo}</a></td>
      <td>${p.tipo}</td>
      <td>${p.lote}</td>
      <td>${p.procedencia}</td>
      <td class="act-td-estado"><i class="fas fa-user-plus"></i> ${p.estado}</td>
      <td>${p.medico}</td>
      <td class="act-td-num">${p.estudios}</td>
      <td>${p.cobertura}</td>
      <td>${p.paciente}</td>
      <td class="act-td-viendo">${p.viendo ? `<span class="act-viendo"><i class="fas fa-eye"></i> ${p.viendo}</span>` : ''}</td>
      <td class="act-td-acciones">
        <span class="act-icono act-icono-img ${p.imagen ? 'act-img-con' : 'act-img-sin'}" title="${p.imagen ? 'Con imagen' : 'Sin imagen'}"><i class="fas fa-image"></i></span>
      </td>
      ${celdaAuth(p)}
      <td class="act-td-sem">${semaforo(p)}</td>
    </tr>`;
  }).join('');
}

window.addEventListener('DOMContentLoaded', function() {
  renderTabla(ACT_DATA);
});
