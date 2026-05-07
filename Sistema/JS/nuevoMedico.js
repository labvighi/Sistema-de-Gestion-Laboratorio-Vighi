// nuevoMedico.js

const form       = document.getElementById('formNuevoMedico');
const statusDiv  = document.getElementById('status');
const btnCrear   = document.getElementById('btnCrear');

// Ubicaciones cargadas desde JSON
let opcionesUbicacion = [];

async function cargarUbicaciones() {
  try {
    const res  = await fetch('BDD/ubicaciones.json');
    const data = await res.json();
    opcionesUbicacion = data.ubicaciones || [];
  } catch (e) {
    console.error('Error cargando ubicaciones:', e);
  }
  // Poblar el primer select ya existente en el HTML
  poblarSelect(document.querySelector('.nm-input-ubicacion'));
}

function poblarSelect(sel) {
  // Mantener la opción vacía inicial
  sel.innerHTML = '<option value="">Seleccioná una ubicación...</option>';
  opcionesUbicacion.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = u.nombre;
    sel.appendChild(opt);
  });
}

function setStatus(mensaje, esError = false) {
  statusDiv.textContent = mensaje;
  statusDiv.className = 'show ' + (esError ? 'error' : 'success');
}

// ── Mails dinámicos ──────────────────────────────────────────
let mailCount = 1;

document.getElementById('btnAgregarMail').addEventListener('click', () => {
  const lista = document.getElementById('listaMails');
  const div = document.createElement('div');
  div.className = 'nm-item-fila';
  div.dataset.index = mailCount++;
  div.innerHTML = `
    <input type="email" class="form-control nm-input-mail" placeholder="Mail...">
    <button type="button" class="btn btn-nm-eliminar nm-btn-eliminar-item" title="Eliminar">
      <i class="fa fa-times"></i>
    </button>`;
  lista.appendChild(div);
  div.querySelector('input').focus();
});

// ── Ubicaciones dinámicas ────────────────────────────────────
let ubicCount = 1;

document.getElementById('btnAgregarUbicacion').addEventListener('click', () => {
  const lista = document.getElementById('listaUbicaciones');
  const div = document.createElement('div');
  div.className = 'nm-item-fila';
  div.dataset.index = ubicCount++;
  const sel = document.createElement('select');
  sel.className = 'form-control nm-input-ubicacion';
  div.innerHTML = `
    <button type="button" class="btn btn-nm-eliminar nm-btn-eliminar-item" title="Eliminar">
      <i class="fa fa-times"></i>
    </button>`;
  div.insertBefore(sel, div.firstChild);
  poblarSelect(sel);
  lista.appendChild(div);
  sel.focus();
});

// ── Eliminar fila (delegado) ─────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.closest('.nm-btn-eliminar-item')) {
    const fila = e.target.closest('.nm-item-fila');
    const lista = fila.parentElement;
    // No eliminar si es la única fila
    if (lista.querySelectorAll('.nm-item-fila').length > 1) {
      fila.remove();
    } else {
      fila.querySelector('input').value = '';
    }
  }
});

window.addEventListener('DOMContentLoaded', cargarUbicaciones);

// ── Submit ───────────────────────────────────────────────────
form.addEventListener('submit', async e => {
  e.preventDefault();

  document.querySelectorAll('.form-error').forEach(el => el.classList.add('hidden'));

  const titulo   = document.getElementById('titulo').value;
  const nombre   = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const mn       = document.getElementById('mn').value.trim();
  const mp       = document.getElementById('mp').value.trim();

  let hayErrores = false;
  if (!nombre)        { document.getElementById('errorNombre').classList.remove('hidden');     hayErrores = true; }
  if (!apellido)      { document.getElementById('errorApellido').classList.remove('hidden');   hayErrores = true; }
  if (!mn && !mp)     { document.getElementById('errorMatricula').classList.remove('hidden');  hayErrores = true; }
  if (hayErrores) { setStatus('Por favor, completá los campos requeridos.', true); return; }

  // Recolectar mails no vacíos
  const mails = [...document.querySelectorAll('.nm-input-mail')]
    .map(i => i.value.trim()).filter(Boolean);

  // Recolectar ubicaciones seleccionadas (con nombre)
  const ubicaciones = [...document.querySelectorAll('.nm-input-ubicacion')]
    .filter(s => s.value)
    .map(s => ({ id: Number(s.value), nombre: s.options[s.selectedIndex].textContent }));

  btnCrear.disabled = true;
  btnCrear.textContent = 'Guardando...';

  try {
    // Cargar lista actual desde JSON
    const response = await fetch('BDD/medicos.json?v=1');
    const data     = await response.json();
    const medicos  = Array.isArray(data) ? data : (data.medicos || []);

    const nuevoId = medicos.length > 0
      ? Math.max(...medicos.map(m => m.id || 0)) + 1
      : 1;

    const nuevoMedico = { id: nuevoId, titulo, apellido, nombre, mn, mp, mails, ubicaciones };

    // Guardar en localStorage como pendiente (el JSON real requiere backend)
    const pendientes = JSON.parse(localStorage.getItem('medicos_nuevos') || '[]');
    pendientes.push(nuevoMedico);
    localStorage.setItem('medicos_nuevos', JSON.stringify(pendientes));

    console.log('✅ Médico creado:', nuevoMedico);
    setStatus('¡Médico creado exitosamente! Redirigiendo...', false);
    form.reset();

    setTimeout(() => { window.location.href = 'medicos.html'; }, 2000);

  } catch (err) {
    console.error('Error:', err);
    setStatus('Error al guardar. Intentá nuevamente.', true);
    btnCrear.disabled = false;
    btnCrear.textContent = 'Crear médico';
  }
});
