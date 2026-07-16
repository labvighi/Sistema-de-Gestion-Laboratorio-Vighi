'use client';

import { useEffect, useState } from 'react';
import InformeHistopatologico from '@/features/informes/components/InformeHistopatologico';
import InformeForm from '@/features/informes/components/InformeForm';
import type { InformeHistopatologicoData } from '@/features/informes/types';

// BDD: reemplazar por persistencia en la API; mientras tanto se guarda en localStorage para no perder los datos de prueba al recargar
const STORAGE_KEY = 'vighi-informe-draft';

// BDD: reemplazar por fetch a la API usando el id del protocolo
const INFORME_INICIAL: InformeHistopatologicoData = {
  paciente: 'TEST, TEST',
  medicoSolicitante: 'Dr. Emiliano Pastor',
  institucion: 'TEST',
  cobertura: 'TEST',
  protocolo: 'P1124686',
  fecha: '08/07/2026',
  pagina: '1 de 1',
  diagnosticoFinal: 'Neoplasia fusocelular de bajo grado.',
  hallazgos: 'Hallazgos compatibles con tumor fibroso benigno.',
  material: [
    { letra: 'A', desc: 'Próstata: base lateral derecha' },
    { letra: 'B', desc: 'Próstata: base media derecha' },
    { letra: 'C', desc: 'Próstata: medio lateral derecho' },
    { letra: 'D', desc: 'Próstata: medio medial derecho' },
    { letra: 'E', desc: 'Próstata: pico lateral derecho' },
    { letra: 'F', desc: 'Próstata: pico medial derecho' },
    { letra: 'G', desc: 'Próstata: base lateral izquierda' },
    { letra: 'H', desc: 'Próstata: base medial izquierda' },
    { letra: 'I', desc: 'Próstata: medio lateral izquierdo' },
    { letra: 'J', desc: 'Próstata: medio medial izquierdo' },
    { letra: 'K', desc: 'Próstata: pico lateral izquierdo' },
    { letra: 'L', desc: 'Próstata: pico medial izquierdo' },
    { letra: 'M', desc: 'Target 1' },
    { letra: 'N', desc: 'Target 2' },
    { letra: 'O', desc: 'Target 3' },
    { letra: 'P', desc: 'Target 4' },
    { letra: 'Q', desc: 'Target 5' },
    { letra: 'R', desc: 'Target 6' },
    { letra: 'S', desc: 'Target 7' },
    { letra: 'T', desc: 'Target 8' },
    { letra: 'U', desc: 'Target 9' },
  ],
  macroscopia: 'Se reciben múltiples fragmentos irregulares de tejido blanquecino,\nde consistencia elástica, que en conjunto miden 1,2 x 0,8 x 0,3 cm.\nSe procesan la totalidad en un cassette.',
  microscopia: 'Proliferación fusocelular constituida por células alargadas con núcleos\nfusiformes, de bordes afilados, cromatina fina y nucléolos no evidentes.\nLas células se disponen en un patrón estoriforme / fascicular, inmersas\nen un estroma colágeno laxo, con áreas hialinizadas. No se identifican\natipia nuclear significativa ni mitosis.\nNo se observa necrosis.',
  comentario: 'Los hallazgos morfológicos son compatibles con lesión fibrosa benigna.\nLa correlación clínico-imagenológica es requerida.',
  fotos: [
    { caption: 'A. HE 40x' },
    { caption: 'B. HE 100x' },
    { caption: 'C. HE 400x' },
  ],
  patologa: { nombre: 'Dra. Diana Miserendino', mn: '98395', mp: '451876', firmaUrl: '/FirmaDianaMiserendino.png' },
};

type Modo = 'editar' | 'vista';

interface Borrador {
  modo: Modo;
  informe: InformeHistopatologicoData;
}

function cargarBorrador(): Borrador {
  if (typeof window === 'undefined') return { modo: 'editar', informe: INFORME_INICIAL };
  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    if (guardado) return JSON.parse(guardado);
  } catch {}
  return { modo: 'editar', informe: INFORME_INICIAL };
}

export default function InformeView() {
  const [{ modo, informe }, setBorrador] = useState<Borrador>(cargarBorrador);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ modo, informe }));
  }, [modo, informe]);

  function guardar(data: InformeHistopatologicoData) {
    setBorrador({ modo: 'vista', informe: data });
  }

  function setModo(modo: Modo) {
    setBorrador(b => ({ ...b, modo }));
  }

  function imprimir() {
    const el = document.getElementById('informe-imprimible');
    if (el) {
      const alturaMm = (el.getBoundingClientRect().height / 96) * 25.4 + 4;
      let estilo = document.getElementById('informe-tamano-pagina') as HTMLStyleElement | null;
      if (!estilo) {
        estilo = document.createElement('style');
        estilo.id = 'informe-tamano-pagina';
        document.head.appendChild(estilo);
      }
      estilo.textContent = `@page { size: 210mm ${alturaMm}mm; margin: 0; }`;
    }
    window.print();
  }

  return (
    <div className="flex flex-col gap-4 p-7 pb-18 print:p-0 print:pb-0 print:gap-0">
      <div className="flex items-center justify-between print:hidden">
        <div className="font-mono text-[10px] font-medium text-accent tracking-[0.12em] uppercase">Protocolo {informe.protocolo}</div>
        {modo === 'vista' && (
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold border border-panel bg-white text-vighi transition-colors duration-[0.12s] hover:border-accent hover:text-accent"
              onClick={() => setModo('editar')}
            >
              <i className="fas fa-pen"></i> Volver a editar
            </button>
            <button
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] text-[12px] font-semibold border-none bg-accent text-white transition-colors duration-150 hover:bg-vighi"
              onClick={imprimir}
            >
              <i className="fas fa-print"></i> Imprimir
            </button>
          </div>
        )}
      </div>

      {modo === 'editar' ? (
        <InformeForm initialData={informe} onGuardar={guardar} />
      ) : (
        <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] print:border-none print:shadow-none print:rounded-none">
          <InformeHistopatologico data={informe} />
        </div>
      )}
    </div>
  );
}
