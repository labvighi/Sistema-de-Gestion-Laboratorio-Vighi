// protocolo.js

const PROT_DATA = {
  numero: 'P1055268',
  estudios: [
    {
      titulo: '#P1055268-BPC (U) c/IHQ',
      patologo: 'DOMENIANNI, Miguel Angel',
      tacos: [
        { cassette:'1550116', cant:1, nombre:'Pas',                  material:'N/A', icono:'pagina', checkT:false, checkA:true  },
        { cassette:'1550116', cant:1, nombre:'Tricrómico de Masson', material:'N/A', icono:'pagina', checkT:false, checkA:true  },
        { cassette:'1550116', cant:1, nombre:'Metenamina Plata',     material:'N/A', icono:'pagina', checkT:false, checkA:true  },
        { cassette:'155054',  cant:1, nombre:'Inmunofluorescencia',  material:'N/A', icono:'ihq',   checkT:false, checkA:true  },
      ]
    },
    {
      titulo: '#P1055268-CT c/BPC (U) c/IHQ',
      patologo: 'DOMENIANNI, Miguel Angel',
      tacos: [
        { cassette:'1550115', cant:'A', nombre:'PAAF', subtipo:'Intrapuncion: Riñón', material:'Riñón', icono:'material', checkT:true, checkA:true  },
        { cassette:'150104',  cant:1,   nombre:'Intraoperatoria',      material:'N/A', icono:'persona', checkT:false, checkA:false },
        { cassette:'1550103', cant:1,   nombre:'Presencia de Patólogo', material:'N/A', icono:'persona', checkT:false, checkA:false },
      ]
    }
  ],
  archivos: [
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'img', label:'Orden médica' },
    { tipo:'pdf', label:'Presupuesto - GIANNINI, MARTA.pdf',                      cat:'Orden médica' },
    { tipo:'pdf', label:'AI_Giannini Marta Dominga_734441_26B-483944_42.pdf',     cat:'Orden médica' },
  ],
  tareas: [
    { nombre:'Procesamiento externo', estado:'Cerrado' },
    { nombre:'Reclamo informe',       estado:'Cerrado' },
    { nombre:'Procesamiento externo', estado:'Cerrado' },
  ],
  presupuestos: [
    { protocolo:'P1055268', estudio:'Inmunofluorescencia', tipo:'PRE', proveedor:'', monto:0.00, autorizacion:'autorizado' },
  ],
  informes: [
    { titulo:'Informe Histológico',     flujo:'PAP c/BPC (U) c/IHQ', estudio:false, ihq:false, ihqLeyenda:false, macroPublicado:true,  publicado:true  },
    { titulo:'Informe Complementario',  flujo:'BPC (U) c/IHQ',       estudio:false, ihq:true,  ihqLeyenda:true,  macroPublicado:false, publicado:true  },
  ],
  comentarios: [
    { autor:'Micaela', fecha:'21 ene. 11:32hs', texto:'MICROSCOPIA ELECTRONICA: 1055294' },
    { autor:'Micaela', fecha:'21 ene. 14:22hs', texto:'Se envía TODO el material a IOTTI ya que hacen todo ellos, menos los vidrios de la puncion' },
    { autor:'Micaela', fecha:'21 ene. 17:12hs', texto:'Se solicita el contacto de la persona encargada de realizar el estudio' },
    { autor:'Javier',  fecha:'26 ene. 5:45hs',  texto:'Hago macro provisoria para avanzar el protocolo hasta lleguen los resultados' },
    { autor:'Sabrina', fecha:'5 feb. 10:10hs',  texto:'Reclamo informe a IOTTI.' },
    { autor:'Sabrina', fecha:'5 feb. 13:15hs',  texto:'Adjunto informe de IOTTI (Me indican que corresponde a la MO e IF).' },
    { autor:'Sabrina', fecha:'5 feb. 13:33hs',  texto:'Solicito a IOTTI los preparados.' },
    { autor:'Diana',   fecha:'5 feb. 13:39hs',  texto:'LO QUE NECESITO ES SOLICITAR LOS VIDRIOS, LOS QUIERO VER' },
    { autor:'Sabrina', fecha:'23 feb. 17:33hs', texto:'Recibo 2 vidrios, retirados por Lucas, de Iotti para Diana.' },
    { autor:'Diana',   fecha:'24 feb. 10:43hs', texto:'archivo los vidrios que enviaron H-E y Met Plata' },
    { autor:'Micaela', fecha:'10 mar. 16:24hs', texto:'Galeno aprueba presupuesto' },
  ]
};

/* ---- iconos de taco ---- */
function iconoTaco(tipo) {
  if (tipo === 'ihq')      return '<i class="fas fa-circle prot-icono-ihq" title="IHQ"></i>';
  if (tipo === 'persona')  return '<i class="fas fa-user prot-icono-taco" title="Persona"></i>';
  if (tipo === 'material') return '<a href="#" class="prot-link-material"><i class="far fa-edit"></i> material</a>';
  return '<i class="far fa-file prot-icono-taco"></i>';
}

/* ---- fila de taco ---- */
function filasTaco(tacos) {
  return tacos.map(function(t) {
    const checkT = t.checkT ? '<span class="prot-check">✓ T</span>' : '';
    const checkA = t.checkA ? '<span class="prot-check">✓ A</span>' : '';
    const subtipo = t.subtipo ? ' <span class="prot-taco-subtipo">' + t.subtipo + '</span>' : '';
    return `<div class="prot-taco-fila">
      <span class="prot-taco-cassette"><i class="far fa-square"></i> ${t.cassette}</span>
      <span class="prot-taco-cant">${t.cant}</span>
      <span class="prot-taco-nombre"><a href="#" class="prot-link">${t.nombre}</a>${subtipo}</span>
      <span class="prot-taco-material">${t.material}</span>
      <span class="prot-taco-icono">${iconoTaco(t.icono)}</span>
      <span class="prot-taco-acciones">
        ${t.icono !== 'material' ? '<a href="#" class="prot-btn-eliminar"><i class="fas fa-trash-alt"></i> eliminar</a>' : ''}
      </span>
      <span class="prot-taco-checks">${checkT} ${checkA}</span>
    </div>`;
  }).join('');
}

/* ---- render estudios ---- */
function renderEstudios() {
  const cont = document.getElementById('protEstudios');
  if (!cont) return;
  cont.innerHTML = PROT_DATA.estudios.map(function(est) {
    return `<div class="prot-estudio-grupo">
      <div class="prot-estudio-titulo"><a href="#" class="prot-link">${est.titulo}</a></div>
      <div class="prot-estudio-patologo"><i class="fas fa-user-circle"></i> ${est.patologo}</div>
      <div class="prot-tacos-lista">${filasTaco(est.tacos)}</div>
    </div>`;
  }).join('');
}

/* ---- storage helpers ---- */
const STORAGE_KEY = 'prot_' + (PROT_DATA.numero) + '_archivos';

function guardarArchivos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(PROT_DATA.archivos));
}

function cargarArchivos() {
  const guardado = localStorage.getItem(STORAGE_KEY);
  if (guardado) {
    try { PROT_DATA.archivos = JSON.parse(guardado); } catch(e) {}
  }
}

function eliminarArchivo(idxGlobal) {
  PROT_DATA.archivos.splice(idxGlobal, 1);
  guardarArchivos();
  renderArchivos();
}

/* ---- render archivos ---- */
function renderArchivos() {
  const grid  = document.getElementById('protArchivosGrid');
  const lista = document.getElementById('protArchivosLista');
  if (!grid || !lista) return;

  const imgs = PROT_DATA.archivos.filter(function(a) { return a.tipo === 'img'; });
  const pdfs = PROT_DATA.archivos.filter(function(a) { return a.tipo === 'pdf'; });

  grid.innerHTML = imgs.map(function(a, i) {
    return `<div class="prot-archivo-card" data-img-idx="${i}">
      <div class="prot-archivo-thumb"><i class="fas fa-file-image"></i></div>
      <div class="prot-archivo-label">Orden médica</div>
      <button class="btn prot-btn-eliminar-sm js-eliminar-img"><i class="fas fa-trash-alt"></i> Eliminar</button>
    </div>`;
  }).join('');

  lista.innerHTML = pdfs.map(function(p, i) {
    return `<div class="prot-archivo-pdf-fila" data-pdf-idx="${i}">
      <a href="#" class="prot-link prot-pdf-link"><i class="fas fa-share"></i> ${p.label}</a>
      <span class="prot-pdf-cat">${p.cat}</span>
      <button class="btn prot-btn-eliminar-sm js-eliminar-pdf"><i class="fas fa-trash-alt"></i> Eliminar</button>
    </div>`;
  }).join('');

  /* delegación de eventos para eliminar */
  grid.addEventListener('click', function(e) {
    const btn = e.target.closest('.js-eliminar-img');
    if (!btn) return;
    const card = btn.closest('.prot-archivo-card');
    const idx  = parseInt(card.dataset.imgIdx);
    const idxGlobal = PROT_DATA.archivos
      .map(function(a, i) { return a.tipo === 'img' ? i : -1; })
      .filter(function(i) { return i !== -1; })[idx];
    eliminarArchivo(idxGlobal);
  });

  lista.addEventListener('click', function(e) {
    const btn = e.target.closest('.js-eliminar-pdf');
    if (!btn) return;
    const fila = btn.closest('.prot-archivo-pdf-fila');
    const idx  = parseInt(fila.dataset.pdfIdx);
    const idxGlobal = PROT_DATA.archivos
      .map(function(a, i) { return a.tipo === 'pdf' ? i : -1; })
      .filter(function(i) { return i !== -1; })[idx];
    eliminarArchivo(idxGlobal);
  });
}

/* ---- render tareas ---- */
function renderTareas() {
  const cont = document.getElementById('protTareasList');
  if (!cont) return;
  cont.innerHTML = PROT_DATA.tareas.map(function(t) {
    return `<div class="prot-tarea-fila">
      <a href="#" class="prot-link">${t.nombre}</a>
      <span class="prot-tarea-estado"><i class="fas fa-inbox"></i> ${t.estado}</span>
    </div>`;
  }).join('');
}

/* ---- render comentarios ---- */
function renderComentarios() {
  const cont = document.getElementById('protComentariosList');
  if (!cont) return;
  cont.innerHTML = PROT_DATA.comentarios.map(function(c) {
    return `<div class="prot-comentario">
      <span class="prot-com-autor">${c.autor}</span>
      <span class="prot-com-fecha">${c.fecha}</span>
      <div class="prot-com-texto">${c.texto}</div>
    </div>`;
  }).join('');
}

/* ---- render presupuestos ---- */
function renderPresupuestos() {
  const tbody = document.getElementById('pftPresupuestosTbody');
  if (!tbody) return;

  function filaPresupuesto(p, idx) {
    const monto = '$ ' + p.monto.toFixed(2).replace('.', ',');
    const estados = [
      { key:'pendiente',  icono:'fas fa-hourglass-half', label:'Pendiente'  },
      { key:'autorizado', icono:'fas fa-check',          label:'Autorizado' },
      { key:'rechazado',  icono:'fas fa-ban',            label:'Rechazado'  },
    ];
    const authBtns = estados.map(function(e) {
      const activo = p.autorizacion === e.key ? ' prot-pre-auth-active prot-pre-auth-' + e.key : '';
      return `<button class="btn prot-pre-auth-btn${activo}" data-idx="${idx}" data-estado="${e.key}">
        <i class="${e.icono}"></i> ${e.label}
      </button>`;
    }).join('');

    return `<tr>
      <td><a href="#" class="prot-link">#${p.protocolo}</a></td>
      <td>${p.estudio}</td>
      <td>${p.tipo}</td>
      <td>${p.proveedor}</td>
      <td class="prot-pre-td-monto">${monto}</td>
      <td class="prot-pre-td-auth">${authBtns}</td>
    </tr>`;
  }

  tbody.innerHTML = PROT_DATA.presupuestos.map(filaPresupuesto).join('');

  /* toggle autorización */
  tbody.addEventListener('click', function(e) {
    const btn = e.target.closest('.prot-pre-auth-btn');
    if (!btn) return;
    const idx    = parseInt(btn.dataset.idx);
    const estado = btn.dataset.estado;
    PROT_DATA.presupuestos[idx].autorizacion = estado;
    renderPresupuestos();
  });
}

/* ---- render informes ---- */
function renderInformes() {
  const tbody = document.getElementById('pftInformesTbody');
  if (!tbody) return;
  const check = '<i class="fas fa-check prot-inf-check"></i>';
  tbody.innerHTML = PROT_DATA.informes.map(function(inf) {
    return `<tr>
      <td>${inf.titulo}</td>
      <td class="prot-inf-flujo">${inf.flujo}</td>
      <td class="prot-inf-td-centro">${inf.estudio       ? check : ''}</td>
      <td class="prot-inf-td-centro">${inf.ihq           ? check : ''}</td>
      <td class="prot-inf-td-centro">${inf.ihqLeyenda    ? check : ''}</td>
      <td class="prot-inf-td-centro">${inf.macroPublicado? check : ''}</td>
      <td class="prot-inf-td-centro">${inf.publicado     ? check : ''}</td>
      <td class="prot-inf-td-acciones">
        <a href="#" class="prot-link-accion"><i class="far fa-edit"></i> Editar</a>
        <a href="#" class="prot-link-eliminar"><i class="fas fa-trash-alt"></i> Eliminar</a>
      </td>
    </tr>`;
  }).join('');
}

/* ---- copiar número de protocolo ---- */
function initCopiarNumero() {
  const icono = document.querySelector('.prot-copy-icon');
  if (!icono) return;
  icono.addEventListener('click', function() {
    const texto = PROT_DATA.numero;
    navigator.clipboard.writeText(texto).then(function() {
      icono.classList.remove('far', 'fa-copy');
      icono.classList.add('fas', 'fa-check');
      icono.style.color = '#27ae60';
      setTimeout(function() {
        icono.classList.remove('fas', 'fa-check');
        icono.classList.add('far', 'fa-copy');
        icono.style.color = '';
      }, 1500);
    });
  });
}

/* ---- toggle procesamiento ---- */
function initProcesamiento() {
  const btns = document.querySelectorAll('.prot-btn-proc');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('prot-btn-proc-active'); });
      btn.classList.add('prot-btn-proc-active');
    });
  });
}

/* ---- panel upload archivos ---- */
function initUploadPanel() {
  const btnAbrir    = document.getElementById('btnAgregarArchivo');
  const panel       = document.getElementById('protUploadPanel');
  const btnCancelar = document.getElementById('btnCancelarUpload');
  const fileInput   = document.getElementById('protFileInput');
  const fileNombre  = document.getElementById('protFileNombre');
  if (!btnAbrir || !panel) return;

  btnAbrir.addEventListener('click', function() {
    panel.style.display = 'block';
    btnAbrir.style.display = 'none';
  });

  btnCancelar.addEventListener('click', function() {
    panel.style.display = 'none';
    btnAbrir.style.display = '';
    fileInput.value = '';
    fileNombre.textContent = 'No se eligió ningún archivo';
  });

  fileInput.addEventListener('change', function() {
    if (fileInput.files.length === 0) {
      fileNombre.textContent = 'No se eligió ningún archivo';
    } else if (fileInput.files.length === 1) {
      fileNombre.textContent = fileInput.files[0].name;
    } else {
      fileNombre.textContent = fileInput.files.length + ' archivos seleccionados';
    }
  });
}

window.addEventListener('DOMContentLoaded', function() {
  cargarArchivos();
  renderEstudios();
  renderArchivos();
  renderTareas();
  renderComentarios();
  renderPresupuestos();
  renderInformes();
  initUploadPanel();
  initProcesamiento();
  initCopiarNumero();
});
