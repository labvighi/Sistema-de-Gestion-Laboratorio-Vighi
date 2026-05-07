// usuarios.js
// Listado de usuarios con filtros

const perfilesNombre = {
  "1": "Administración",
  "2": "Citotécnico",
  "3": "Dirección",
  "4": "Externo",
  "5": "Gerencial",
  "6": "Patólogo",
  "7": "Técnico"
};

let todosLosUsuarios = [];

// Cargar usuarios desde JSON o localStorage
async function cargarUsuarios() {
  try {
    const response = await fetch('usuarios.json');
    if (response.ok) {
      const data = await response.json();
      todosLosUsuarios = Array.isArray(data) ? data : data.usuarios;
      return;
    }
  } catch (e) {
    console.log('No se pudo cargar usuarios.json, usando localStorage...');
  }

  // Fallback a localStorage
  const local = localStorage.getItem('usuarios');
  if (local) {
    todosLosUsuarios = JSON.parse(local);
  }
}

// Renderizar la tabla con el array filtrado
function renderTabla(usuarios) {
  const tbody = document.getElementById('tbodyUsuarios');
  const contador = document.getElementById('usuarios-contador');

  if (!usuarios.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center usuarios-vacio">No se encontraron usuarios.</td></tr>';
    contador.textContent = '';
    return;
  }

  tbody.innerHTML = usuarios.map((u, idx) => {
    const tipo = perfilesNombre[String(u.perfil)] || u.perfil || '—';
    const nombre = u.nombre || '—';
    const apellido = u.apellido || '—';
    return `
      <tr>
        <td class="usuarios-td-id">${u.id || idx + 1}</td>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${u.mail || '—'}</td>
        <td><span class="usuarios-badge">${tipo}</span></td>
        <td class="text-center">
          <a href="crearUsuario.html" class="btn btn-xs usuarios-btn-accion" title="Editar">
            <i class="fa fa-pencil"></i>
          </a>
        </td>
      </tr>
    `;
  }).join('');

  contador.textContent = `Mostrando ${usuarios.length} usuario${usuarios.length !== 1 ? 's' : ''}`;
}

// Aplicar filtros
function aplicarFiltros() {
  const tipo = document.getElementById('filtroTipo').value;
  const buscar = document.getElementById('filtroBuscar').value.toLowerCase().trim();

  let resultado = todosLosUsuarios;

  if (tipo) {
    resultado = resultado.filter(u => String(u.perfil) === tipo);
  }

  if (buscar) {
    resultado = resultado.filter(u =>
      (u.nombre || '').toLowerCase().includes(buscar) ||
      (u.apellido || '').toLowerCase().includes(buscar) ||
      (u.mail || '').toLowerCase().includes(buscar)
    );
  }

  renderTabla(resultado);
}

// Inicializar
window.addEventListener('DOMContentLoaded', async () => {
  await cargarUsuarios();
  renderTabla(todosLosUsuarios);

  document.getElementById('filtroTipo').addEventListener('change', aplicarFiltros);
  document.getElementById('filtroBuscar').addEventListener('input', aplicarFiltros);
});
