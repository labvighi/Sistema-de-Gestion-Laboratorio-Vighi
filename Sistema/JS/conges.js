// conges.js
// Congelaciones ‚?? BDD pendiente de conexi√≥n

let todasLasConges = [];

// Renderizar tabla agrupada por actividad
function renderTabla(lista) {
  const tbody = document.getElementById('tbodyConges');

  if (!lista || lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center estudios-vacio">
          <i class="fas fa-snowflake estudios-vacio-icono"></i>
          <p>No hay congelaciones registradas.</p>
        </td>
      </tr>`;
    return;
  }

  // Agrupar por actividad
  const grupos = lista.reduce((acc, c) => {
    if (!acc[c.actividad]) acc[c.actividad] = [];
    acc[c.actividad].push(c);
    return acc;
  }, {});

  let html = '';
  Object.entries(grupos).forEach(([actividad, items]) => {
    items.forEach((c, idx) => {
      const esUrgente = c.urgente || false;
      html += `
        <tr>
          <td class="conges-td-actividad">${idx === 0 ? `<span class="conges-actividad-label">${actividad}</span>` : ''}</td>
          <td class="estudios-td-flujo">
            <a href="#">${c.protocolo || '‚??'}</a>
            <div class="estudios-subtexto">${c.tipo || ''}</div>
          </td>
          <td class="estudios-subtexto">${c.procedencia || '‚??'}</td>
          <td>
            <div class="estudios-nombre">${c.cobertura || '‚??'}</div>
            <div class="estudios-subtexto">${c.coberturaSub || ''}</div>
          </td>
          <td class="conges-td-mat">${c.pc || '‚??'}</td>
          <td class="conges-td-mat">${c.mf || '‚??'}</td>
          <td class="estudios-nombre">${c.medico || '‚??'}</td>
          <td class="text-center">
            <button class="btn btn-xs ${esUrgente ? 'btn-conges-urgente' : 'btn-estudios-ot'}">
              <i class="far fa-clock"></i> ${esUrgente ? 'DE 9h' : 'OT'}
            </button>
          </td>
        </tr>`;
    });
  });

  tbody.innerHTML = html;
}

// ‚??‚?? AGENDA ‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??

const DIAS   = ['Lunes','Martes','Mi√©rcoles','Jueves','Viernes','S√°bado','Domingo'];
const MESES  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// Obtener lunes de la semana actual
function lunesDe(fecha) {
  const d = new Date(fecha);
  const dia = d.getDay();
  const diff = (dia === 0 ? -6 : 1 - dia);
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}

// Semanas del mes (lunes a domingo que tocan el mes)
function semanasDelMes(anio, mesIdx) {
  const semanas = [];
  let lunes = lunesDe(new Date(anio, mesIdx, 1));
  while (lunes.getMonth() <= mesIdx || lunes.getFullYear() < anio) {
    const domingo = new Date(lunes); domingo.setDate(domingo.getDate() + 6);
    if (lunes.getFullYear() > anio || lunes.getMonth() > mesIdx) break;
    semanas.push({ lunes: new Date(lunes), domingo: new Date(domingo) });
    lunes.setDate(lunes.getDate() + 7);
  }
  return semanas;
}

function formatRango(lunes, domingo) {
  return `${lunes.getDate()} - ${domingo.getDate()}`;
}

let semanaActiva = null;

function renderSemanas(anio, mesIdx) {
  const cont = document.getElementById('agendaSemanas');
  if (!cont) return;
  const semanas = semanasDelMes(anio, mesIdx);
  const hoy = lunesDe(new Date());

  cont.innerHTML = semanas.map((s, i) => {
    const activa = s.lunes.getTime() === hoy.getTime() ? 'active' : '';
    if (activa) semanaActiva = s;
    return `<button class="btn btn-agenda-semana ${activa}" data-idx="${i}"
              data-lunes="${s.lunes.toISOString()}">${formatRango(s.lunes, s.domingo)}</button>`;
  }).join('');

  if (!semanaActiva && semanas.length) semanaActiva = semanas[0];

  cont.querySelectorAll('.btn-agenda-semana').forEach(btn => {
    btn.addEventListener('click', function() {
      cont.querySelectorAll('.btn-agenda-semana').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      semanaActiva = semanas[+this.dataset.idx];
      renderGrilla(semanaActiva);
    });
  });

  renderGrilla(semanaActiva || semanas[0]);
}

function renderGrilla(semana) {
  const grilla = document.getElementById('agendaGrilla');
  if (!grilla || !semana) return;

  let html = '';
  for (let i = 0; i < 7; i++) {
    const fecha = new Date(semana.lunes);
    fecha.setDate(fecha.getDate() + i);
    const diaLabel = DIAS[i];
    const numDia   = fecha.getDate();

    // Congelaciones del d√≠a (filtrar por fecha cuando haya datos)
    const congesDia = todasLasConges.filter(c => {
      if (!c.fecha) return false;
      const f = new Date(c.fecha);
      return f.toDateString() === fecha.toDateString();
    });

    const fechaISO = fecha.toISOString().split('T')[0];
    html += `
      <div class="agenda-col">
        <div class="agenda-col-header">
          <a href="nuevaCongelacion.html?fecha=${fechaISO}" class="btn btn-agenda-add-dia"><i class="fas fa-plus"></i></a>
          ${diaLabel} ${numDia}
        </div>
        <div class="agenda-col-body">
          ${congesDia.length
            ? congesDia.map(c => renderTarjeta(c)).join('')
            : `<div class="agenda-dia-vacio"></div>`
          }
        </div>
      </div>`;
  }

  grilla.innerHTML = html;
}

function claseEstado(estado) {
  if (!estado) return 'agendada';
  const e = estado.toLowerCase();
  if (e === 'confirmada') return 'confirmada';
  if (e === 'cancelada')  return 'cancelada';
  return 'agendada';
}

function iconoEstado(estado) {
  if (!estado) return 'fa-calendar';
  const e = estado.toLowerCase();
  if (e === 'confirmada') return 'fa-thumbs-up';
  if (e === 'cancelada')  return 'fa-times-circle';
  return 'fa-calendar';
}

function renderTarjeta(c) {
  return `
    <div class="agenda-tarjeta">
      <div class="agenda-tarjeta-header ${claseEstado(c.estado)}">
        <i class="fas ${iconoEstado(c.estado)}"></i> ${c.estado || 'Agendada'}
      </div>
      <div class="agenda-tarjeta-body">
        <div class="agenda-tarjeta-hora">${c.hora || ''} <strong>${c.paciente || ''}</strong></div>
        <div class="agenda-tarjeta-dato"><i class="fas fa-building"></i> ${c.ubicacion || ''}</div>
        <div class="agenda-tarjeta-dato"><i class="fas fa-user-md"></i> ${c.patologo || ''}</div>
        <div class="agenda-tarjeta-dato"><i class="fas fa-user"></i> ${c.tecnico || ''}</div>
        <div class="agenda-tarjeta-dato">${c.cobertura || ''}</div>
        <div class="agenda-tarjeta-tag">
          <span class="agenda-tag">${c.tag || ''}</span> ${c.procedimiento || ''}
        </div>
      </div>
    </div>`;
}

// ‚??‚?? DASHBOARD ‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??

// Datos de ejemplo ‚?? conectar a BDD
const dashboardData = [
  { patologo: 'CARBALLO',       meses: [2,  5,  8,  14, 2,  0,0,0,0,0,0,0] },
  { patologo: 'COSTOYA',        meses: [9,  20, 25, 21, 10, 0,0,0,0,0,0,0] },
  { patologo: 'DOMENIANNI',     meses: [62, 30, 48, 60, 27, 0,0,0,0,0,0,0] },
  { patologo: 'FERRANDO',       meses: [29, 8,  20, 21, 5,  0,0,0,0,0,0,0] },
  { patologo: 'LOPEZ',          meses: [12, 9,  8,  10, 4,  0,0,0,0,0,0,0] },
  { patologo: 'MISERENDINO',    meses: [15, 21, 39, 21, 24, 2,0,0,0,0,0,0] },
  { patologo: 'PAPARATTO',      meses: [2,  1,  1,  1,  0,  0,0,0,0,0,0,0] },
  { patologo: 'PARDO',          meses: [12, 19, 43, 24, 15, 0,0,0,0,0,0,0] },
  { patologo: 'RODR√çGUEZ',      meses: [28, 26, 31, 25, 11, 0,0,0,0,0,0,0] },
  { patologo: 'VEGA',           meses: [14, 24, 19, 19, 15, 0,0,0,0,0,0,0] },
  { patologo: 'VILA MELGAREJO', meses: [21, 14, 15, 21, 12, 0,0,0,0,0,0,0] },
  { patologo: 'WOOLLANDS',      meses: [4,  4,  8,  3,  0,  0,0,0,0,0,0,0] },
];

function renderDashboard() {
  const tbody = document.getElementById('tbodyDashboard');
  const tfoot = document.getElementById('tfootDashboard');
  if (!tbody || !tfoot) return;

  // Filas por pat√≥logo
  tbody.innerHTML = dashboardData.map(d => {
    const totalPatologo = d.meses.reduce((a, b) => a + b, 0);
    return `
    <tr>
      <td class="dash-td-patologo">${d.patologo}</td>
      ${d.meses.map(v => `<td class="${v === 0 ? 'dash-cero' : ''}">${v}</td>`).join('')}
      <td class="dash-td-total-fila">${totalPatologo}</td>
    </tr>`;
  }).join('');

  // Fila de totales por mes + gran total
  const totales = Array(12).fill(0);
  dashboardData.forEach(d => d.meses.forEach((v, i) => { totales[i] += v; }));
  const granTotal = totales.reduce((a, b) => a + b, 0);
  tfoot.innerHTML = `
    <tr>
      <td></td>
      ${totales.map(t => `<td>${t}</td>`).join('')}
      <td class="dash-td-total-fila">${granTotal}</td>
    </tr>`;
}

function initDashboardFiltros() {
  // Toggles tipo / horario
  document.querySelectorAll('.btn-dash-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const grupo = this.dataset.grupo;
      document.querySelectorAll(`.btn-dash-toggle[data-grupo="${grupo}"]`)
        .forEach(b => b.classList.remove('active'));
      this.classList.toggle('active', !this.classList.contains('active'));
      // TODO: aplicar filtro cuando haya BDD
    });
  });
}

// ‚??‚?? AGENDA PAT√?LOGO ‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??‚??

const DIAS_AP  = ['Domingo','Lunes','Martes','Mi√©rcoles','Jueves','Viernes','S√°bado'];
const MESES_AP = ['ene.','feb.','mar.','abr.','may.','jun.','jul.','ago.','sep.','oct.','nov.','dic.'];

// Datos de ejemplo ‚?? conectar a BDD
const agendaPatologoData = [
  { id:1, patologo:'COSTOYA, M',  estado:'Agendada',   fecha:'2026-05-15', hora:'15:30', ubicacion:'Instituto Quir√∫rgico del Callao', medico:'Dra. Santamar√≠a, Antonella', paciente:'FRENCH, SOLANGE',    cobertura:'UNI√?N PERSONAL', tipo:'QR',  procedimiento:'BRQ + GC' },
  { id:2, patologo:'COSTOYA, M',  estado:'Agendada',   fecha:'2026-05-19', hora:'07:30', ubicacion:'Sanatorio Suizo Argentina',       medico:'Dr. Loza, Carlos Mart√≠n',    paciente:'MARCENARO, SUSANA',  cobertura:'SMG',            tipo:'GI',  procedimiento:'Congelaci√≥n de mama' },
  { id:3, patologo:'COSTOYA, M',  estado:'Agendada',   fecha:'2026-05-26', hora:'15:00', ubicacion:'IADT',                            medico:'Dra. Barchuk, Sabrina',      paciente:'GINOCCHIO, MARISA',  cobertura:'OSDE',           tipo:'QR',  procedimiento:'MAMA, CUADRANTECTOM√çA CON BIOPSIA GANGLIONAR UNILA' },
  { id:4, patologo:'COSTOYA, M',  estado:'Confirmada', fecha:'2026-05-16', hora:'09:00', ubicacion:'IADT',                            medico:'Dr. P√©rez, Juan',            paciente:'RODR√çGUEZ, ANA',     cobertura:'OSDE',           tipo:'GI',  procedimiento:'Biopsia de tiroides' },
  { id:5, patologo:'COSTOYA, M',  estado:'Confirmada', fecha:'2026-05-20', hora:'11:00', ubicacion:'Centro Medicus',                  medico:'Dra. Garc√≠a, Mar√≠a',         paciente:'LOPEZ, ROBERTO',     cobertura:'SWISS MEDICAL',  tipo:'PUN', procedimiento:'Biopsia ganglionar' },
  { id:6, patologo:'DOMENIANNI',  estado:'Agendada',   fecha:'2026-05-22', hora:'08:00', ubicacion:'IADT',                            medico:'Dr. N√∫√±ez, Pablo',           paciente:'MART√çNEZ, LAURA',    cobertura:'OSDE',           tipo:'GI',  procedimiento:'Congelaci√≥n hep√°tica' },
  { id:7, patologo:'DOMENIANNI',  estado:'Confirmada', fecha:'2026-05-23', hora:'10:30', ubicacion:'Sanatorio Suizo Argentina',       medico:'Dra. Torres, Claudia',       paciente:'G√?MEZ, PEDRO',       cobertura:'PAMI',           tipo:'QR',  procedimiento:'N√≥dulo tiroideo' },
];

let apPatologoActivo    = '';
let apEstadoActivo      = '';
let apProcedenciaActiva = 'Todas';

function formatFechaAP(fechaStr, hora) {
  const f = new Date(fechaStr + 'T12:00:00');
  return `${DIAS_AP[f.getDay()]} ${f.getDate()} ${MESES_AP[f.getMonth()]} ${hora}hs`;
}

function getDatosAP() {
  return agendaPatologoData.filter(c => c.patologo === apPatologoActivo);
}

function renderAPFiltros(datos) {
  // Estado con conteos
  const grupoEstado = document.getElementById('apEstadoGroup');
  if (grupoEstado) {
    grupoEstado.innerHTML = ['Agendada','Confirmada'].map(e => {
      const count  = datos.filter(c => c.estado === e).length;
      const active = apEstadoActivo === e ? 'active' : '';
      return `<button class="btn btn-ap-toggle ${active}" data-ap-estado="${e}">${e} (${count})</button>`;
    }).join('');
    grupoEstado.querySelectorAll('.btn-ap-toggle').forEach(btn => {
      btn.addEventListener('click', function () {
        const val = this.dataset.apEstado;
        apEstadoActivo      = apEstadoActivo === val ? '' : val;
        apProcedenciaActiva = 'Todas';
        renderAPFiltros(datos);
        renderAPCards(datos);
      });
    });
  }

  // Procedencia con conteos (filtrada por estado activo)
  const base = apEstadoActivo ? datos.filter(c => c.estado === apEstadoActivo) : datos;
  const locs  = [...new Set(datos.map(c => c.ubicacion))].sort();
  const grupoProcedencia = document.getElementById('apProcedenciaGroup');
  if (grupoProcedencia) {
    const btnTodas = `<button class="btn btn-ap-toggle ${apProcedenciaActiva === 'Todas' ? 'active' : ''}" data-ap-proc="Todas">Todas (${base.length})</button>`;
    const btnLocs  = locs.map(loc => {
      const count = base.filter(c => c.ubicacion === loc).length;
      if (count === 0) return '';
      const active = apProcedenciaActiva === loc ? 'active' : '';
      return `<button class="btn btn-ap-toggle ${active}" data-ap-proc="${loc}">${loc} (${count})</button>`;
    }).join('');
    grupoProcedencia.innerHTML = btnTodas + btnLocs;
    grupoProcedencia.querySelectorAll('.btn-ap-toggle').forEach(btn => {
      btn.addEventListener('click', function () {
        apProcedenciaActiva = this.dataset.apProc;
        renderAPFiltros(datos);
        renderAPCards(datos);
      });
    });
  }
}

function renderAPCards(datos) {
  const cont = document.getElementById('apCards');
  if (!cont) return;

  let lista = [...datos];
  if (apEstadoActivo)                lista = lista.filter(c => c.estado === apEstadoActivo);
  if (apProcedenciaActiva !== 'Todas') lista = lista.filter(c => c.ubicacion === apProcedenciaActiva);
  lista.sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

  if (lista.length === 0) {
    cont.innerHTML = `<div class="text-center estudios-vacio" style="padding:30px 0">
      <i class="fas fa-calendar-times estudios-vacio-icono"></i>
      <p>No hay congelaciones para mostrar.</p>
    </div>`;
    return;
  }

  cont.innerHTML = lista.map(c => `
    <div class="ap-card">
      <div class="ap-card-header ${claseEstado(c.estado)}">
        <i class="fas fa-calendar-alt"></i> ${c.estado}
      </div>
      <div class="ap-card-body">
        <div class="ap-dato ap-dato-fecha"><i class="fas fa-calendar-alt"></i> ${formatFechaAP(c.fecha, c.hora)}</div>
        <div class="ap-dato"><i class="fas fa-hospital"></i> ${c.ubicacion}</div>
        <div class="ap-dato"><i class="fas fa-stethoscope"></i> ${c.medico}</div>
        <div class="ap-dato"><i class="fas fa-user"></i> ${c.paciente} <span class="ap-cobertura">(${c.cobertura})</span></div>
        <div class="ap-dato"><span class="ap-tag">${c.tipo}</span> ${c.procedimiento}</div>
        <div class="ap-acciones">
          <button class="btn btn-ap-confirmar" onclick="apConfirmar(${c.id})">
            <i class="fas fa-thumbs-up"></i> Confirmar
          </button>
          <button class="btn btn-ap-rechazar" onclick="apRechazar(${c.id})">
            <i class="fas fa-thumbs-down"></i> Rechazar
          </button>
        </div>
      </div>
    </div>`).join('');
}

function renderAgendaPatologo() {
  const datos = getDatosAP();
  renderAPFiltros(datos);
  renderAPCards(datos);
}

function apConfirmar(id) { console.log('Confirmar:', id); /* TODO: BDD */ }
function apRechazar(id)  { console.log('Rechazar:', id);  /* TODO: BDD */ }

function initAgendaPatologo() {
  const sel = document.getElementById('apPatologo');
  if (!sel) return;
  const patologos = [...new Set(agendaPatologoData.map(c => c.patologo))].sort();
  sel.innerHTML = '<option value="">[ Seleccionar pat√≥logo ]</option>' +
    patologos.map(p => `<option value="${p}">${p}</option>`).join('');
  sel.addEventListener('change', function () {
    apPatologoActivo    = this.value;
    apEstadoActivo      = '';
    apProcedenciaActiva = 'Todas';
    renderAgendaPatologo();
  });
}

// Cambio de mes/a√±o en agenda
function initAgendaFiltros() {
  const selAnio = document.getElementById('agendaAnio');
  const selMes  = document.getElementById('agendaMes');
  if (!selAnio || !selMes) return;

  const actualizar = () => {
    const anio   = parseInt(selAnio.value);
    const mesIdx = selMes.selectedIndex;
    renderSemanas(anio, mesIdx);
  };

  selAnio.addEventListener('change', actualizar);
  selMes.addEventListener('change', actualizar);

  // Inicializar con valores actuales
  actualizar();
}

window.addEventListener('DOMContentLoaded', () => {
  renderTabla(todasLasConges);
  initAgendaFiltros();
  renderDashboard();
  initDashboardFiltros();
  initAgendaPatologo();

  // Ocultar filtros compartidos en Dashboard y Agenda pat√≥logo
  const filtrosCompartidos = document.querySelector('.estudios-filtros-wrapper');
  const tabsSinFiltros = ['#tab-dashboard', '#tab-agenda-patologo'];
  document.querySelectorAll('.estudios-tabs a[data-toggle="tab"]').forEach(a => {
    a.addEventListener('click', function () {
      if (!filtrosCompartidos) return;
      filtrosCompartidos.style.display =
        tabsSinFiltros.includes(this.getAttribute('href')) ? 'none' : '';
    });
  });
});
