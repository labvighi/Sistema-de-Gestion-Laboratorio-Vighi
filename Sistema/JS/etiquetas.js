// etiquetas.js

const MESES_ES  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                   'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_ES   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

/* ---------- poblar selector días ---------- */
function poblarDias() {
  const sel = document.getElementById('etiqDia');
  if (!sel) return;
  sel.innerHTML = '<option value="">[ Día: todos ]</option>';
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    sel.appendChild(opt);
  }
}

/* ---------- calcular y mostrar día de la semana ---------- */
function actualizarDiaSemana() {
  const dia  = parseInt(document.getElementById('etiqDia').value);
  const mes  = parseInt(document.getElementById('etiqMes').value);
  const anio = parseInt(document.getElementById('etiqAnio').value);
  const span = document.getElementById('etiqDiaSemana');
  if (!span) return;

  // Validar que la fecha sea real
  const fecha = new Date(anio, mes, dia);
  if (fecha.getFullYear() === anio && fecha.getMonth() === mes && fecha.getDate() === dia) {
    span.textContent = DIAS_ES[fecha.getDay()];
  } else {
    span.textContent = '';
  }
}

/* ---------- inicializar con fecha de hoy ---------- */
function initFechaHoy() {
  const hoy = new Date();
  const diaHoy  = hoy.getDate();
  const mesHoy  = hoy.getMonth();   // 0-11
  const anioHoy = hoy.getFullYear();

  // Día �?? buscar la opción cuyo value numérico coincida
  const selDia = document.getElementById('etiqDia');
  if (selDia) {
    Array.from(selDia.options).forEach(function(o) {
      o.selected = (parseInt(o.value) === diaHoy);
    });
  }

  // Mes �?? buscar la opción cuyo value numérico coincida (0-11)
  const selMes = document.getElementById('etiqMes');
  if (selMes) {
    Array.from(selMes.options).forEach(function(o) {
      o.selected = (o.value !== '' && parseInt(o.value) === mesHoy);
    });
  }

  // Año �?? buscar la opción cuyo texto o value coincida con el año
  const selAnio = document.getElementById('etiqAnio');
  if (selAnio) {
    var encontrado = false;
    Array.from(selAnio.options).forEach(function(o) {
      if (parseInt(o.value || o.textContent) === anioHoy) {
        o.selected = true;
        encontrado = true;
      } else {
        o.selected = false;
      }
    });
    // Si el año actual no existe como opción, agregarlo
    if (!encontrado) {
      const opt = document.createElement('option');
      opt.textContent = anioHoy;
      opt.selected = true;
      selAnio.appendChild(opt);
    }
  }
}

/* ---------- DOMContentLoaded ---------- */
window.addEventListener('DOMContentLoaded', () => {
  poblarDias();
  initFechaHoy();
  actualizarDiaSemana();

  // Actualizar día de semana al cambiar cualquier parte de la fecha
  ['etiqDia', 'etiqMes', 'etiqAnio'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', actualizarDiaSemana);
  });

  // Botón Crear etiquetas
  const btn = document.getElementById('btnCrearEtiquetas');
  if (btn) {
    btn.addEventListener('click', () => {
      const tipo  = document.getElementById('etiqTipo').value;
      const dia   = document.getElementById('etiqDia').value;
      const mes   = parseInt(document.getElementById('etiqMes').value);
      const anio  = document.getElementById('etiqAnio').value;
      const mesNombre = MESES_ES[mes];

      // Placeholder: mostrar mensaje en el contenido
      const cont = document.getElementById('etiqContenido');
      if (cont) {
        cont.innerHTML = `
          <div class="flujos-info-vacio">
            <i class="fas fa-info-circle"></i>
            No hay etiquetas cargadas en esa fecha o período.
          </div>`;
      }
    });
  }
});
