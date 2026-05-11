// nuevoTicket.js

let ntTipo      = 'Resolutivo';
let ntUrgencia  = 'Regular';
let ntPrioridad = 'Baja';

// ── Toggle groups ─────────────────────────────────────────────
function initToggle(groupId, callback) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.btn-nt-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      group.querySelectorAll('.btn-nt-toggle').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (callback) callback(this.dataset.valor);
    });
  });
}

// ── Captura de pantalla (CTRL+V) ─────────────────────────────
function initCaptura() {
  document.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        const url  = URL.createObjectURL(blob);
        const img  = document.getElementById('ntCapturaImg');
        const ph   = document.getElementById('ntCapturaPlaceholder');
        const btnB = document.getElementById('btnBorrarCaptura');
        if (img) {
          img.src = url;
          img.classList.remove('hidden');
          ph?.classList.add('hidden');
          btnB?.classList.remove('hidden');
        }
        break;
      }
    }
  });

  document.getElementById('btnBorrarCaptura')?.addEventListener('click', () => {
    const img  = document.getElementById('ntCapturaImg');
    const ph   = document.getElementById('ntCapturaPlaceholder');
    const btnB = document.getElementById('btnBorrarCaptura');
    if (img) { img.src = ''; img.classList.add('hidden'); }
    ph?.classList.remove('hidden');
    btnB?.classList.add('hidden');
  });
}

// ── Validación y envío ───────────────────────────────────────
function validar() {
  const asunto = document.getElementById('ntAsunto').value.trim();
  if (!asunto) {
    document.getElementById('ntAsunto').focus();
    document.getElementById('ntAsunto').classList.add('nt-input-error');
    return false;
  }
  document.getElementById('ntAsunto').classList.remove('nt-input-error');
  return true;
}

// ── Init ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initToggle('ntTipoGroup',      val => { ntTipo      = val; });
  initToggle('ntUrgenciaGroup',  val => { ntUrgencia  = val; });
  initToggle('ntPrioridadGroup', val => { ntPrioridad = val; });

  initCaptura();

  document.getElementById('btnAnalizarIA')?.addEventListener('click', () => {
    // TODO: integrar con IA
    console.log('Analizar con IA');
  });

  document.getElementById('btnCrearTicket')?.addEventListener('click', () => {
    if (!validar()) return;
    const ticket = {
      asunto:      document.getElementById('ntAsunto').value.trim(),
      descripcion: document.getElementById('ntDescripcion').value.trim(),
      tipo:        ntTipo,
      urgencia:    ntUrgencia,
      prioridad:   ntPrioridad,
      chkProtocolo: document.getElementById('chkProtocolo').checked,
      chkFactura:   document.getElementById('chkFactura').checked,
      area:        document.getElementById('ntArea').value,
      usuario:     document.getElementById('ntUsuario').value,
      notificar:   document.getElementById('chkNotificar').checked,
    };
    console.log('Nuevo ticket:', ticket);
    // TODO: conectar con BDD — redirigir a soporte.html al guardar
  });

  // Quitar borde error al escribir
  document.getElementById('ntAsunto')?.addEventListener('input', function () {
    this.classList.remove('nt-input-error');
  });
});
