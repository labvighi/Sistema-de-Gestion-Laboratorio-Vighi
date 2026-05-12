// imagenes.js
// Página de imágenes pendientes de vinculación a protocolos

// Datos de ejemplo — reemplazar con llamada al backend
const IMAGENES_DATA = [
  { id: 1, src: 'IMG/orden_ejemplo.jpg' },
  { id: 2, src: 'IMG/orden_ejemplo.jpg' },
  { id: 3, src: 'IMG/orden_ejemplo.jpg' },
  { id: 4, src: 'IMG/orden_ejemplo.jpg' },
  { id: 5, src: 'IMG/orden_ejemplo.jpg' },
  { id: 6, src: 'IMG/orden_ejemplo.jpg' },
  { id: 7, src: 'IMG/orden_ejemplo.jpg' },
  { id: 8, src: 'IMG/orden_ejemplo.jpg' },
  { id: 9, src: 'IMG/orden_ejemplo.jpg' },
  { id: 10, src: 'IMG/orden_ejemplo.jpg' },
];

function renderImagenes(lista) {
  lbLista = lista;
  const cont = document.getElementById('imgContenido');
  const contador = document.getElementById('imgContador');
  if (contador) contador.textContent = lista.length;

  if (!lista.length) {
    cont.innerHTML = `
      <div class="flujos-info-vacio">
        <i class="fas fa-info-circle"></i>
        No hay imágenes pendientes de vinculación.
      </div>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'img-grid';

  lista.forEach(function(item, idx) {
    const card = document.createElement('div');
    card.className = 'img-card';
    card.innerHTML = `
      <div class="img-card-preview" style="cursor:pointer">
        <img src="${item.src}" alt="Orden ${item.id}"
             onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-file-image\\' style=\\'font-size:48px;color:#ccc;\\'></i>'">
      </div>
      <div class="img-card-footer">
        <div class="img-card-asociar-fila">
          <input type="text" class="form-control img-card-protocolo"
                 placeholder="#Protocolo" inputmode="numeric"
                 data-id="${item.id}">
          <button class="btn btn-img-asociar" data-id="${item.id}">
            <i class="fas fa-save"></i> Asociar
          </button>
        </div>
        <div class="img-card-acciones-fila">
          <button class="btn btn-img-eliminar" data-id="${item.id}">
            <i class="fas fa-trash"></i> Eliminar
          </button>
          <button class="btn btn-img-ia" data-id="${item.id}">
            <i class="fas fa-robot"></i> IA text
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  cont.innerHTML = '';
  cont.appendChild(grid);

  // Abrir lightbox al clickear el preview
  cont.querySelectorAll('.img-card-preview').forEach(function(preview, idx) {
    preview.addEventListener('click', function() { lbAbrir(idx); });
  });

  // Solo números en el input de protocolo
  cont.querySelectorAll('.img-card-protocolo').forEach(function(input) {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });
    input.addEventListener('keypress', function(e) {
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
  });

  // Botón Asociar
  cont.querySelectorAll('.btn-img-asociar').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const input = cont.querySelector(`.img-card-protocolo[data-id="${id}"]`);
      const protocolo = input ? input.value.trim() : '';
      if (!protocolo) {
        input && input.focus();
        return;
      }
      // TODO: enviar al backend
      alert('Asociar imagen ' + id + ' al protocolo #' + protocolo);
    });
  });

  // Botón Eliminar
  cont.querySelectorAll('.btn-img-eliminar').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      // TODO: confirmar y eliminar via backend
      alert('Eliminar imagen ' + id);
    });
  });

  // Botón IA text
  cont.querySelectorAll('.btn-img-ia').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      // TODO: enviar imagen a IA para extraer texto
      alert('IA text imagen ' + id);
    });
  });
}

/* ---- Lightbox ---- */
var lbLista  = [];
var lbIndice = 0;

function lbAbrir(indice) {
  lbIndice = indice;
  lbMostrar();
  document.getElementById('imgLightbox').classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function lbCerrar() {
  document.getElementById('imgLightbox').classList.remove('activo');
  document.body.style.overflow = '';
}

function lbMostrar() {
  var item = lbLista[lbIndice];
  document.getElementById('lbImg').src = item.src;
  document.getElementById('lbContador').textContent = (lbIndice + 1) + ' / ' + lbLista.length;
  document.getElementById('lbPrev').style.visibility = lbIndice > 0 ? 'visible' : 'hidden';
  document.getElementById('lbNext').style.visibility = lbIndice < lbLista.length - 1 ? 'visible' : 'hidden';
}

function lbPrev() { if (lbIndice > 0) { lbIndice--; lbMostrar(); } }
function lbNext() { if (lbIndice < lbLista.length - 1) { lbIndice++; lbMostrar(); } }

window.addEventListener('DOMContentLoaded', function () {
  renderImagenes(IMAGENES_DATA);

  document.getElementById('lbCerrar').addEventListener('click', lbCerrar);
  document.getElementById('lbPrev').addEventListener('click', lbPrev);
  document.getElementById('lbNext').addEventListener('click', lbNext);

  // Cerrar al hacer click en el overlay (fuera de la imagen)
  document.getElementById('imgLightbox').addEventListener('click', function(e) {
    if (e.target === this) lbCerrar();
  });

  // Navegación con teclado
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('imgLightbox').classList.contains('activo')) return;
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'ArrowRight') lbNext();
    if (e.key === 'Escape')     lbCerrar();
  });
});
