// pacientes.js
// Buscador de pacientes — por ahora sin BDD conectada

// Referencias
const inputApellido   = document.getElementById('inputApellido');
const inputNombre     = document.getElementById('inputNombre');
const modoApellido    = document.getElementById('modoApellido');
const inputDni        = document.getElementById('inputDni');
const btnBuscarApell  = document.getElementById('btnBuscarApellido');
const btnBuscarDni    = document.getElementById('btnBuscarDni');
const resultadosDiv   = document.getElementById('pacientes-resultados');

// Mostrar estado vacío con mensaje personalizado
function mostrarVacio(mensaje) {
  resultadosDiv.innerHTML = `
    <div class="pacientes-vacio">
      <i class="fas fa-user-injured pacientes-vacio-icono"></i>
      <p>${mensaje}</p>
    </div>`;
}

// Mostrar tabla de resultados
function mostrarResultados(pacientes) {
  if (!pacientes || pacientes.length === 0) {
    mostrarVacio('No se encontraron pacientes con ese criterio.');
    return;
  }

  const filas = pacientes.map(p => `
    <tr>
      <td>${p.dni || '—'}</td>
      <td>${p.apellido || '—'}</td>
      <td>${p.nombre || '—'}</td>
      <td>${p.fechaNacimiento || '—'}</td>
      <td>${p.obraSocial || '—'}</td>
      <td class="text-center">
        <button class="btn btn-xs usuarios-btn-accion" title="Ver">
          <i class="fa fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');

  resultadosDiv.innerHTML = `
    <div class="table-responsive">
      <table class="table table-hover usuarios-tabla">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Fecha de nacimiento</th>
            <th>Obra social</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
    <div class="usuarios-contador">${pacientes.length} resultado${pacientes.length !== 1 ? 's' : ''}</div>
  `;
}

// Búsqueda por apellido/nombre (placeholder — conectar a BDD real)
function buscarPorApellido() {
  const apellido = inputApellido.value.trim();
  if (!apellido) {
    mostrarVacio('Ingresá un apellido para buscar.');
    return;
  }
  // TODO: conectar a BDD real
  mostrarVacio('Sin resultados. La base de datos de pacientes aún no está conectada.');
}

// Búsqueda por DNI (placeholder — conectar a BDD real)
function buscarPorDni() {
  const dni = inputDni.value.trim();
  if (!dni) {
    mostrarVacio('Ingresá un DNI para buscar.');
    return;
  }
  // TODO: conectar a BDD real
  mostrarVacio('Sin resultados. La base de datos de pacientes aún no está conectada.');
}

// Eventos
btnBuscarApell.addEventListener('click', buscarPorApellido);
btnBuscarDni.addEventListener('click', buscarPorDni);

// Enter en los inputs
inputApellido.addEventListener('keypress', e => { if (e.key === 'Enter') buscarPorApellido(); });
inputNombre.addEventListener('keypress',   e => { if (e.key === 'Enter') buscarPorApellido(); });
inputDni.addEventListener('keypress',      e => { if (e.key === 'Enter') buscarPorDni(); });
