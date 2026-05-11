// ihq.js
// Tablero IMHQ — BDD pendiente de conexión

// Datos de ejemplo
const ihqData = [
  { actividad:'Porta > Colorear',   protocolo:'P1087281-BP c/IHQ',    tipo:'QR', patologo:'GARCÍA MONTENEGRO', paciente:'FUNES',            cobertura:'COBER MED',       medico:'REBOLLO GUELAR, J.',  ubicacion:'Recepción',                     tipoBtn:'LT', valor:'13d' },
  { actividad:'Micro > Informar',   protocolo:'P1090953-LIQ c/BP',    tipo:'GI', patologo:'FERRANDO',           paciente:'MONJE',            cobertura:'CM OTAMENDI',     medico:'GOROSITO, F.',        ubicacion:'Sanatorio Otamendi',            tipoBtn:'LT', valor:'8d'  },
  { actividad:'Micro > Informar',   protocolo:'P1094048-CT c/BPC (U)',tipo:'QR', patologo:'RODRÍGUEZ',          paciente:'DE ANCHORENA',     cobertura:'OSDE',            medico:'PINEDA RAMIREZ, A.',  ubicacion:'IADT',                          tipoBtn:'LT', valor:'8d'  },
  { actividad:'Micro > Informar',   protocolo:'P1094754-CT c/BPC (U)',tipo:'QR', patologo:'CARBALLO',           paciente:'LISTA',            cobertura:'UNIÓN PERSONAL',  medico:'YARZA, I.',           ubicacion:'Instituto Quirúrgico del Callao',tipoBtn:'LT', valor:'7d'  },
  { actividad:'Micro > Informar',   protocolo:'P1096678-CT c/BPC (U)',tipo:'QR', patologo:'RODRÍGUEZ',          paciente:'TOLOSA',           cobertura:'MEDICUS',         medico:'PAZOS, R.',           ubicacion:'Sanatorio Otamendi',            tipoBtn:'LT', valor:'3d'  },
  { actividad:'Micro > Informar',   protocolo:'P1095853-LIQ c/BP',    tipo:'GI', patologo:'FERRANDO',           paciente:'ALVAREZ',          cobertura:'UNIÓN PERSONAL',  medico:'VIDELA RIVERO, B.',   ubicacion:'Instituto Quirúrgico del Callao',tipoBtn:'LT', valor:'1d'  },
  { actividad:'Micro > Informar',   protocolo:'P1093303-BP c/IHQ',    tipo:'QR', patologo:'GARCÍA MONTENEGRO', paciente:'RIEIRO RODRIGUEZ', cobertura:'OSDE',            medico:'MAZZARO, E.',         ubicacion:'Sanatorio La Providencia',      tipoBtn:'DE', valor:'4h'  },
  { actividad:'Micro > Revisar',    protocolo:'P1091581-BP (R) c/IHQ',tipo:'QR', patologo:'MISERENDINO',        paciente:'LOBEL',            cobertura:'SMG',             medico:'TKATCH, J.',          ubicacion:'Recepción',                     tipoBtn:'LT', valor:'4d'  },
  { actividad:'Micro > Revisar',    protocolo:'P1090584-BP (R) c/IHQ',tipo:'DE', patologo:'MISERENDINO',        paciente:'FERNANDEZ',        cobertura:'AMEBPBA',         medico:'AMALLO, S.',          ubicacion:'Clínica AMEBPBA',               tipoBtn:'LT', valor:'3d'  },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1085321-BP c/IHQ',    tipo:'QR', patologo:'FLORES HERBAS',      paciente:'FERNANDEZ LONGO',  cobertura:'GALENO',          medico:'PERURENA, P.',        ubicacion:'Sanatorio Trinidad Palermo',    tipoBtn:'LT', valor:'12d' },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1091947-IMHQ',        tipo:'',   patologo:'MISERENDINO',        paciente:'RESA',             cobertura:'MEDICUS',         medico:'CHIRIANO, F.',        ubicacion:'Sanatorio Otamendi',            tipoBtn:'LT', valor:'11d' },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1093379-IMHQ',        tipo:'',   patologo:'RODRÍGUEZ',          paciente:'RIMOLO DIAZ',      cobertura:'AMEBPBA',         medico:'CISNEROS, F.',        ubicacion:'Clínica AMEBPBA',               tipoBtn:'LT', valor:'9d'  },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1094270-IMHQ',        tipo:'',   patologo:'FERRANDO',           paciente:'BAIS',             cobertura:'PARTICULAR',      medico:'MONTANARI, C.',       ubicacion:'Sanatorio Los Arcos',           tipoBtn:'LT', valor:'8d'  },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1085305-BP c/IHQ',    tipo:'QR', patologo:'VILA MELGAREJO',     paciente:'CANCELA',          cobertura:'CPI',             medico:'MARANGONI, S.',       ubicacion:'Clínica Privada Independencia', tipoBtn:'LT', valor:'6d'  },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1090157-BP c/IHQ',    tipo:'QR', patologo:'GARCÍA MONTENEGRO', paciente:'THIERRY',          cobertura:'OSDE',            medico:'ROMERO, M.',          ubicacion:'IADT',                          tipoBtn:'LT', valor:'6d'  },
  { actividad:'Taco IHQ > Cortar',  protocolo:'P1090119-BP c/IHQ',    tipo:'QR', patologo:'GARCÍA MONTENEGRO', paciente:'SPINAZI',          cobertura:'MEDICUS',         medico:'GOMEZ, M.',           ubicacion:'Sanatorio Otamendi',            tipoBtn:'LT', valor:'6d'  },
];

function claseBotonIHQ(tipo) {
  return tipo === 'DE' ? 'btn-ihq-de' : 'btn-ihq-lt';
}

function renderTabla(lista) {
  const tbody = document.getElementById('tbodyIHQ');
  if (!tbody) return;

  if (!lista || lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center estudios-vacio">
          <i class="fas fa-star-of-life estudios-vacio-icono"></i>
          <p>No hay protocolos IHQ cargados.</p>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = lista.map(p => `
    <tr>
      <td class="ihq-td-actividad">${p.actividad}</td>
      <td class="estudios-td-flujo">
        <a href="#">#${p.protocolo}</a>
        <div class="estudios-subtexto">${p.tipo || ''}</div>
      </td>
      <td class="estudios-nombre">${p.patologo}</td>
      <td>
        <div class="estudios-nombre">${p.paciente}</div>
        <div class="estudios-subtexto">${p.cobertura}</div>
      </td>
      <td>
        <div class="estudios-nombre">${p.medico}</div>
        <div class="estudios-subtexto">${p.ubicacion}</div>
      </td>
      <td class="text-center ihq-td-btn">
        <button class="btn btn-xs ${claseBotonIHQ(p.tipoBtn)} ihq-btn-tiempo">
          <i class="far fa-clock"></i> ${p.tipoBtn} ${p.valor}
        </button>
      </td>
    </tr>
  `).join('');
}

window.addEventListener('DOMContentLoaded', () => {
  renderTabla(ihqData);
});
