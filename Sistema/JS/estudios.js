// estudios.js
// Listado de estudios/protocolos — BDD pendiente de conexión

let protocolos = [];

// Cuando haya BDD real, reemplazar con fetch a la API
async function cargarProtocolos() {
  // TODO: fetch('BDD/protocolos.json') o endpoint de API
  protocolos = [];
  renderTabla(protocolos);
}

function renderTabla(lista) {
  const tbody    = document.getElementById('tbodyEstudios');
  const contador = document.getElementById('contadorEstudios');

  contador.textContent = `0 / ${lista.length}`;

  if (!lista.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center estudios-vacio">
          <i class="fas fa-flask estudios-vacio-icono"></i>
          <p>No hay protocolos cargados para los filtros seleccionados.</p>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = lista.map(p => `
    <tr>
      <td class="estudios-td-check"><input type="checkbox" class="check-protocolo"></td>
      <td class="estudios-td-flujo">
        <a href="#">${p.flujo || '—'}</a>
        <div class="estudios-subtexto">${p.tipo || ''}</div>
      </td>
      <td>
        <div class="estudios-nombre">${p.paciente || '—'}</div>
        <div class="estudios-subtexto">${p.cobertura || ''}</div>
      </td>
      <td>
        <div class="estudios-nombre">${p.medico || '—'}</div>
        <div class="estudios-subtexto">${p.ubicacion || ''}</div>
      </td>
      <td class="estudios-fecha">${p.recoleccion || '—'}</td>
      <td class="estudios-fecha">${p.entrega || '—'}</td>
      <td class="text-center">
        <button class="btn btn-xs btn-estudios-ot">
          <i class="far fa-clock"></i> OT
        </button>
      </td>
    </tr>
  `).join('');

  // Actualizar contador al tildar
  document.querySelectorAll('.check-protocolo').forEach(cb => {
    cb.addEventListener('change', actualizarContador);
  });
}

function actualizarContador() {
  const total      = document.querySelectorAll('.check-protocolo').length;
  const marcados   = document.querySelectorAll('.check-protocolo:checked').length;
  document.getElementById('contadorEstudios').textContent = `${marcados} / ${total}`;
}

// Check all
document.getElementById('checkAll').addEventListener('change', function () {
  document.querySelectorAll('.check-protocolo').forEach(cb => cb.checked = this.checked);
  actualizarContador();
});

window.addEventListener('DOMContentLoaded', cargarProtocolos);
