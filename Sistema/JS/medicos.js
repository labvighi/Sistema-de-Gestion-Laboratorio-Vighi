// medicos.js
// Listado de médicos con filtro alfabético

let todosMedicos = [];
let letraActiva = '';

// Cargar médicos desde BDD/medicos.json
async function cargarMedicos() {
  try {
    const response = await fetch('BDD/medicos.json?v=1');
    console.log('fetch medicos.json status:', response.status);
    if (response.ok) {
      const data = await response.json();
      todosMedicos = Array.isArray(data) ? data : (data.medicos || []);
      console.log('Médicos cargados:', todosMedicos.length);
      return;
    } else {
      console.warn('medicos.json respondió con status:', response.status);
    }
  } catch (e) {
    console.error('Error cargando medicos.json:', e);
  }
  todosMedicos = [];
}

// Renderizar tabla
function renderTabla(medicos) {
  const tbody = document.getElementById('tbodyMedicos');
  const contador = document.getElementById('medicos-contador');

  if (!medicos || medicos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center usuarios-vacio">
          <i class="fas fa-user-md" style="font-size:28px; color:#d4b8ec; display:block; margin-bottom:8px;"></i>
          No hay médicos cargados en la base de datos.
        </td>
      </tr>`;
    contador.textContent = '';
    return;
  }

  tbody.innerHTML = medicos.map(m => `
    <tr style="cursor:pointer" onclick="registrarMedicoHistorial('${(m.apellido||'').replace(/'/g,"\\'")}','${(m.nombre||'').replace(/'/g,"\\'")}')">
      <td class="medicos-td-nombre">${m.apellido || '—'}, ${m.nombre || ''}</td>
      <td class="medicos-td-mat">${m.mn || '—'}</td>
      <td class="medicos-td-mat">${m.mp || '—'}</td>
      <td class="text-center">
        <button class="btn btn-xs usuarios-btn-accion" title="Editar" onclick="editarMedico(${m.id})">
          <i class="fa fa-pencil"></i>
        </button>
      </td>
    </tr>
  `).join('');

  contador.textContent = `Mostrando ${medicos.length} médico${medicos.length !== 1 ? 's' : ''}`;
}

// Filtrar por letra
function filtrarPorLetra(letra) {
  if (!letra) return todosMedicos;
  return todosMedicos.filter(m =>
    (m.apellido || '').toUpperCase().startsWith(letra)
  );
}

function registrarMedicoHistorial(apellido, nombre) {
  if (typeof historialAgregar === 'function') {
    historialAgregar('medicos', { nombre: apellido + ', ' + nombre });
  }
}

// Editar médico (placeholder hasta que exista editarMedico.html)
function editarMedico(id) {
  // TODO: redirigir a editarMedico.html?id=ID cuando esté disponible
  console.log('Editar médico id:', id);
}

// Inicializar
window.addEventListener('DOMContentLoaded', async () => {
  await cargarMedicos();
  renderTabla(todosMedicos);

  // Botones del alfabeto
  document.querySelectorAll('.btn-medicos-letra').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-medicos-letra').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      letraActiva = btn.dataset.letra;
      renderTabla(filtrarPorLetra(letraActiva));
    });
  });
});
