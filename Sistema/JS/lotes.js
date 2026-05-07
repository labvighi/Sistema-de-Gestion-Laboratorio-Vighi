// lotes.js

// Lotes activos por tipo — datos de ejemplo, conectar a BDD cuando esté disponible
const lotesActivos = [
  { tipo: 'NO ONCO', lote: 'NO ONCO-0507.2', cantidad: 0 },
  { tipo: 'ENDO',    lote: 'ENDO-0507.2',    cantidad: 0 },
  { tipo: 'ONCO',    lote: 'ONCO-0507.1',    cantidad: 5 },
  { tipo: 'PAPURG',  lote: 'PAPURG-0507.1',  cantidad: 0 },
  { tipo: 'TACOS',   lote: 'TACOS-0507.1',   cantidad: 0 },
  { tipo: 'CT',      lote: 'CT-0507.1',      cantidad: 0 },
];

// Lotes históricos — vacío hasta conectar BDD
let todosLosLotes = [];

// Renderizar tabla de lotes activos
function renderLotesActivos() {
  const tbody = document.getElementById('tbodyLotesActivos');
  tbody.innerHTML = lotesActivos.map(l => `
    <tr>
      <td class="lotes-td-tipo">${l.tipo}</td>
      <td class="lotes-td-lote">
        <a href="#">${l.lote} (${l.cantidad})</a>
      </td>
      <td class="text-right">
        <button class="btn btn-xs usuarios-btn-accion lotes-btn-modificar">
          <i class="fa fa-pencil"></i> Modificar
        </button>
      </td>
    </tr>
  `).join('');
}

// Renderizar tabla de lotes históricos
function renderLotes(lista) {
  const tbody    = document.getElementById('tbodyLotes');
  const contador = document.getElementById('lotes-contador');

  if (!lista || lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center usuarios-vacio">
          <i class="fas fa-layer-group" style="font-size:28px; color:#d4b8ec; display:block; margin-bottom:8px;"></i>
          No hay lotes cargados.
        </td>
      </tr>`;
    contador.textContent = '';
    return;
  }

  tbody.innerHTML = lista.map(l => `
    <tr>
      <td class="lotes-td-lote"><a href="#">${l.nombre}</a></td>
      <td><span class="lotes-badge-estado lotes-estado-${l.estado.toLowerCase()}">${l.estado}</span></td>
      <td class="lotes-td-actividad">${l.actividad || '—'}</td>
    </tr>
  `).join('');

  contador.textContent = `${lista.length} lote${lista.length !== 1 ? 's' : ''}`;
}

window.addEventListener('DOMContentLoaded', () => {
  renderLotesActivos();
  renderLotes(todosLosLotes);
});
