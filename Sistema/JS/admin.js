// admin.js ‚?? Administraci√≥n / Cobros previstos
// BDD: reemplazar COBROS_DATA con fetch a la API.
// Los nombres de mes se calculan din√°micamente: mes actual + mes siguiente.

var MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var COBROS_DATA = [
  {
    mes: '', total: 7275560,  // nombre asignado din√°micamente al cargar
    filas: [
      { fecha: '02 MAR.', estado: 'atr5', empresa: 'SMG',                  monto: 2724068 },
      { fecha: '28 MAY.', estado: 'atr5', empresa: 'PARTICULAR',           monto: 201000  },
      { fecha: '05 JUN.', estado: 'atr5', empresa: 'AMCI',                 monto: 30168   },
      { fecha: '26 JUN.', estado: 'atr',  empresa: 'CM MONSERRAT - QUILMES', monto: 144808 },
      { fecha: '26 JUN.', estado: 'atr',  empresa: 'OSPIC',                monto: 167147  },
      { fecha: '26 JUN.', estado: 'atr',  empresa: 'W. HOPE',              monto: 215472  },
      { fecha: '29 JUN.', estado: 'atr',  empresa: 'CM PUEYRREDON',        monto: 323247  },
      { fecha: '29 JUN.', estado: 'atr',  empresa: 'HALITUS',              monto: 39536   },
      { fecha: '29 JUN.', estado: 'atr',  empresa: 'PARTICULAR',           monto: 68000   },
      { fecha: '30 JUN.', estado: 'fc',   empresa: 'APSOT',                monto: 511849  },
      { fecha: '30 JUN.', estado: 'fc',   empresa: 'OSDIPP',               monto: 354900  },
      { fecha: '22 DIC.', estado: 'atr5', empresa: 'OSSEG',                monto: 2495365 },
    ]
  },
  {
    mes: 'Julio', total: 316647710,
    filas: [
      { fecha: '02 JUL.', estado: 'fc',   empresa: 'CMG',                  monto: 21628661  },
      { fecha: '05 JUL.', estado: 'fc',   empresa: 'OSDE',                 monto: 111116795 },
      { fecha: '06 JUL.', estado: 'fc',   empresa: 'IODC',                 monto: 1084033   },
      { fecha: '06 JUL.', estado: 'fc',   empresa: 'OMINT',                monto: 5433452   },
      { fecha: '06 JUL.', estado: 'fc',   empresa: 'SMG',                  monto: 2239118   },
      { fecha: '07 JUL.', estado: 'fc',   empresa: 'CM OTAMENDI',          monto: 4354425   },
      { fecha: '07 JUL.', estado: 'fc',   empresa: 'CUERPO M√?DICO',        monto: 5616707   },
      { fecha: '08 JUL.', estado: 'fc',   empresa: 'AMEBPBA',              monto: 7118930   },
      { fecha: '08 JUL.', estado: 'fc',   empresa: 'GALENO',               monto: 37680929  },
      { fecha: '09 JUL.', estado: 'fc',   empresa: 'CM MONSERRAT',         monto: 1124636   },
      { fecha: '10 JUL.', estado: 'fc',   empresa: 'AMCI',                 monto: 454776    },
      { fecha: '15 JUL.', estado: 'fc',   empresa: 'CPI',                  monto: 6558639   },
      { fecha: '16 JUL.', estado: 'fc',   empresa: 'IDIM',                 monto: 402423    },
      { fecha: '17 JUL.', estado: 'fc',   empresa: 'LUCCAU',               monto: 3783365   },
      { fecha: '17 JUL.', estado: 'fc',   empresa: 'MEDICUS',              monto: 28888189  },
      { fecha: '17 JUL.', estado: 'fc',   empresa: 'OSETYA',               monto: 370975    },
      { fecha: '17 JUL.', estado: 'fc',   empresa: 'UNI√?N PERSONAL',       monto: 34044158  },
      { fecha: '20 JUL.', estado: 'fc',   empresa: 'PODER JUDICIAL',       monto: 6426893   },
      { fecha: '24 JUL.', estado: 'fc',   empresa: 'LUIS PASTEUR',         monto: 7302388   },
      { fecha: '25 JUL.', estado: 'fc',   empresa: 'UNI√?N PERSONAL',       monto: 3465269   },
      { fecha: '27 JUL.', estado: 'fc',   empresa: 'CM PUEYRREDON',        monto: 802615    },
      { fecha: '27 JUL.', estado: 'fc',   empresa: 'LAB: VVA',             monto: 2740169   },
      { fecha: '27 JUL.', estado: 'fc',   empresa: 'OSPIC',                monto: 117003    },
      { fecha: '27 JUL.', estado: 'fc',   empresa: 'OSPOCE',               monto: 4100231   },
      { fecha: '27 JUL.', estado: 'fc',   empresa: 'PROVIDENCIA',          monto: 12426214  },
      { fecha: '27 JUL.', estado: 'fc',   empresa: 'SANCOR SALUD',         monto: 4346678   },
      { fecha: '28 JUL.', estado: 'fc',   empresa: 'OSSEG',                monto: 1651020   },
      { fecha: '28 JUL.', estado: 'fc',   empresa: 'W. HOPE',              monto: 323836    },
      { fecha: '29 JUL.', estado: 'fc',   empresa: 'APSOT',                monto: 397650    },
      { fecha: '29 JUL.', estado: 'fc',   empresa: 'CM MONSERRAT - QUILMES', monto: 79065  },
      { fecha: '30 JUL.', estado: 'fc',   empresa: 'OSDIPP',               monto: 309953    },
      { fecha: '30 JUL.', estado: 'fc',   empresa: 'VISITAR',              monto: 110218    },
      { fecha: '31 JUL.', estado: 'fc',   empresa: 'HALITUS',              monto: 128298    },
    ]
  }
];

function formatMonto(n) {
  return '$ ' + n.toLocaleString('es-AR');
}

function dotHtml(estado) {
  if (estado === 'tent') return '<span class="adm-dot-fila tent">?</span>';
  if (estado === 'conf') return '<i class="fas fa-check adm-dot-fila conf"></i>';
  return '<span class="adm-dot-fila ' + estado + '"></span>';
}

function renderCobros() {
  var grid = document.getElementById('admCobrosGrid');
  grid.innerHTML = COBROS_DATA.map(function(m) {
    var filas = m.filas.map(function(f) {
      return '<div class="adm-fila">' +
        '<span class="adm-fecha">' + f.fecha + '</span>' +
        dotHtml(f.estado) +
        '<a href="#" class="adm-empresa">' + f.empresa + '</a>' +
        '<span class="adm-monto">' + formatMonto(f.monto) + '</span>' +
      '</div>';
    }).join('');

    return '<div class="adm-mes-col">' +
      '<div class="adm-mes-header">' +
        '<span class="adm-mes-nombre">' + m.mes + '</span>' +
        '<span class="adm-mes-total">' + formatMonto(m.total) + '</span>' +
      '</div>' +
      filas +
    '</div>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  var hoy  = new Date();
  COBROS_DATA[0].mes = MESES_ES[hoy.getMonth()];
  COBROS_DATA[1].mes = MESES_ES[(hoy.getMonth() + 1) % 12];
  renderCobros();
});
