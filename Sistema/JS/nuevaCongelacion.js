// nuevaCongelacion.js

const DIAS_NC  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MESES_NC = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto',
                  'septiembre','octubre','noviembre','diciembre'];

let estadoSeleccionado = 'Agendada';
let tipoSeleccionado   = null;

// ── URL param ────────────────────────────────────────────────
function getFechaParam() {
  return new URLSearchParams(window.location.search).get('fecha');
}

// ── Mostrar fecha en español ─────────────────────────────────
function mostrarFecha(fechaStr) {
  const el = document.getElementById('ncFechaTexto');
  if (!el) return;
  if (!fechaStr) { el.textContent = '—'; return; }
  // Usar mediodía para evitar desfases de zona horaria
  const f   = new Date(fechaStr + 'T12:00:00');
  const dia = DIAS_NC[f.getDay()];
  const num = f.getDate();
  const mes = MESES_NC[f.getMonth()];
  el.textContent = `${dia} ${num} ${mes}`;
}

// ── Turno según hora ─────────────────────────────────────────
// Mañana   06:00–12:00
// Mediodía 12:30–16:00
// Tarde    16:30–20:00
// Noche    20:30–23:30
function turnoDeHora(horaStr) {
  if (!horaStr) return 'Mañana';
  const [h, m] = horaStr.split(':').map(Number);
  const mins = h * 60 + m;
  if (mins <= 12 * 60)            return 'Mañana';
  if (mins <= 16 * 60)            return 'Mediodía';
  if (mins <= 20 * 60)            return 'Tarde';
  return 'Noche';
}

function actualizarTurno() {
  const hora  = document.getElementById('ncHora').value;
  const turno = document.getElementById('ncTurno');
  if (!turno) return;
  turno.textContent = turnoDeHora(hora);
}

// ── Generar opciones de hora (06:00 → 23:30, cada 30 min) ───
function generarHoras() {
  const sel = document.getElementById('ncHora');
  if (!sel) return;
  sel.innerHTML = '';
  for (let h = 6; h <= 23; h++) {
    ['00', '30'].forEach(m => {
      const opt = document.createElement('option');
      const hStr = String(h).padStart(2, '0');
      opt.value       = `${hStr}:${m}`;
      opt.textContent = `${hStr}:${m} hs`;
      sel.appendChild(opt);
    });
  }
}

// ── Cargar ubicaciones desde JSON ────────────────────────────
async function cargarUbicaciones() {
  const sel = document.getElementById('ncUbicacion');
  if (!sel) return;
  try {
    const res = await fetch('BDD/ubicaciones.json');
    if (res.ok) {
      const data = await res.json();
      const lista = data.ubicaciones || data;
      sel.innerHTML = lista
        .map(u => `<option value="${u.id}">${u.nombre}</option>`)
        .join('');
    }
  } catch (e) {
    sel.innerHTML = '<option value="">Error al cargar</option>';
    console.error('Error cargando ubicaciones:', e);
  }
}

// ── Toggle buttons (estado / tipo) ──────────────────────────
function initToggles(groupId, callback) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.btn-nc-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      group.querySelectorAll('.btn-nc-toggle').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (callback) callback(this.dataset.valor);
    });
  });
}

// ── DOMContentLoaded ─────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const fecha = getFechaParam();

  mostrarFecha(fecha);
  generarHoras();
  actualizarTurno(); // turno inicial según primera hora del select
  cargarUbicaciones();

  // Actualizar turno automáticamente al cambiar hora
  document.getElementById('ncHora')
    ?.addEventListener('change', actualizarTurno);

  initToggles('ncEstadoGroup', val => { estadoSeleccionado = val; });
  initToggles('ncTipoGroup',   val => { tipoSeleccionado   = val; });

  // Limpiar médico tratante
  document.getElementById('btnLimpiarMedico')
    ?.addEventListener('click', () => {
      document.getElementById('ncMedico').value = '';
    });

  // Buscar por DNI (pendiente de BDD)
  document.getElementById('btnBuscarDni')
    ?.addEventListener('click', () => {
      const dni = document.getElementById('ncDni').value.trim();
      if (!dni) return;
      // TODO: conectar con BDD
      console.log('Buscar paciente por DNI:', dni);
    });

  // Cargar uno nuevo → pacientes.html
  document.getElementById('btnNuevoPaciente')
    ?.addEventListener('click', () => {
      window.location.href = 'pacientes.html';
    });

  // Asignar congelación
  document.getElementById('btnAsignarConge')
    ?.addEventListener('click', () => {
      // TODO: validación y envío a BDD
      const datos = {
        fecha,
        estado:    estadoSeleccionado,
        tipo:      tipoSeleccionado,
        ubicacion: document.getElementById('ncUbicacion').value,
        turno:     document.getElementById('ncTurno').value,
        hora:      document.getElementById('ncHora').value,
        patologo:  document.getElementById('ncPatologo').value,
        medico:    document.getElementById('ncMedico').value,
        material:  document.getElementById('ncMaterial').value,
        cobertura: document.getElementById('ncCobertura').value,
        dni:       document.getElementById('ncDni').value,
      };
      console.log('Nueva congelación:', datos);
      // Pendiente de conexión con BDD
    });
});
