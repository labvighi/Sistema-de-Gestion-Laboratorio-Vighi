// soporte.js
// Soporte — BDD pendiente de conexión

// ── Datos dashboard ──────────────────────────────────────────
const dashData = [
  { tipo: 'Evolutivo',  ontime: 0, delayed: 0, late: 23, late5: 0, late510: 0, late10: 23, total: 23 },
  { tipo: 'Resolutivo', ontime: 0, delayed: 0, late: 18, late5: 1, late510: 0, late10: 17, total: 18 },
];

// ── Datos tickets (ejemplo) ──────────────────────────────────
const ticketsData = [
  {
    id: 88452,
    urgente: true,
    asunto: 'Actualización reglas de asignacion - Pilar Carballo',
    deadline: '22/04/26',
    atraso: 'LATE',
    diasAtraso: 19,
    estado: 'Resuelto',
    schedule: 'Resolutivo',
  },
];

// ── Dashboard ────────────────────────────────────────────────
function celda(valor, clase) {
  // Siempre usa la clase (color difuminado por defecto)
  // soporte-dash-con-valor "prende" el color completo
  if (valor > 0) {
    return `<td class="${clase} soporte-dash-con-valor">${valor}</td>`;
  }
  return `<td class="${clase}"></td>`;
}

function renderDashRow(rowId, data) {
  const tr = document.getElementById(rowId);
  if (!tr) return;
  tr.innerHTML = `
    <td class="soporte-dash-tipo">${data.tipo}</td>
    ${celda(data.ontime,  'soporte-dash-ontime')}
    ${celda(data.delayed, 'soporte-dash-delayed')}
    ${celda(data.late,    'soporte-dash-late')}
    ${celda(data.late5,   'soporte-dash-late5')}
    ${celda(data.late510, 'soporte-dash-late510')}
    ${celda(data.late10,  'soporte-dash-late10')}
    <td class="soporte-dash-total soporte-dash-con-valor">${data.total}</td>`;
}

// ── Tabla tickets ────────────────────────────────────────────
function badgeAtraso(atraso, dias) {
  if (atraso === 'LATE') {
    return `<button class="btn btn-xs btn-ihq-lt soporte-badge-atraso">
      <i class="far fa-clock"></i> LATE ${dias}d
    </button>`;
  }
  if (atraso === 'Delayed') {
    return `<button class="btn btn-xs soporte-badge-delayed soporte-badge-atraso">
      <i class="far fa-clock"></i> Delayed
    </button>`;
  }
  return `<button class="btn btn-xs soporte-badge-ontime soporte-badge-atraso">
    <i class="fas fa-check"></i> On Time
  </button>`;
}

function iconoSchedule(sched) {
  if (sched === 'Resolutivo') return 'fa-wrench';
  if (sched === 'Evolutivo')  return 'fa-rocket';
  return 'fa-tag';
}

function renderTickets(lista) {
  const tbody = document.getElementById('tbodySoporte');
  if (!tbody) return;

  if (!lista || lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center estudios-vacio">
          <i class="fas fa-life-ring estudios-vacio-icono"></i>
          <p>No hay tickets cargados.</p>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = lista.map(t => `
    <tr>
      <td class="soporte-td-num">
        #${t.id}
        ${t.urgente ? '<i class="fas fa-fire soporte-fuego"></i>' : ''}
      </td>
      <td>${t.asunto}</td>
      <td class="soporte-td-fecha">${t.deadline}</td>
      <td class="soporte-td-tipo">${badgeAtraso(t.atraso, t.diasAtraso)}</td>
      <td class="soporte-td-estado">${t.estado}</td>
      <td class="soporte-td-sched">
        <i class="fas ${iconoSchedule(t.schedule)}"></i> ${t.schedule}
      </td>
    </tr>`).join('');
}

// ── Init ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  renderDashRow('dashRowEvolutivo',  dashData[0]);
  renderDashRow('dashRowResolutivo', dashData[1]);
  renderTickets(ticketsData);
});
