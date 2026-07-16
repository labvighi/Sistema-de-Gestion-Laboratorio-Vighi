'use client';

import type { InformeHistopatologicoData } from '../types';

const SECTION_TITLE = "text-[13px] font-bold text-accent uppercase tracking-[0.08em] mb-2";
const SECTION = "py-4 border-b border-panel";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-[12px]">
      <span className="font-bold text-vighi w-[120px] flex-shrink-0">{label}:</span>
      <span className="text-[#333]">{value}</span>
    </div>
  );
}

function MaterialCircle({ letra }: { letra: string }) {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex-shrink-0">
      {letra}
    </span>
  );
}

export default function InformeHistopatologico({ data }: { data: InformeHistopatologicoData }) {
  const mitad = Math.ceil(data.material.length / 2);
  const columnaA = data.material.slice(0, mitad);
  const columnaB = data.material.slice(mitad);

  return (
    <div id="informe-imprimible" className="bg-white text-[#222] w-[210mm] max-w-full mx-auto p-10 box-border font-sans">
      <div className="flex items-center justify-between pb-4 border-b-2 border-accent">
        <div className="flex-shrink-0 flex items-center">
          {data.institucionLogoUrl && (
            <img src={data.institucionLogoUrl} alt={data.institucion} className="h-16 w-auto max-w-[220px] object-contain" />
          )}
        </div>
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <div className="text-right">
            <div className="text-[20px] font-extrabold text-vighi tracking-[-0.01em] leading-none">CAP VIGHI</div>
            <div className="text-[11px] font-semibold text-slate tracking-[0.04em] mt-1">CENTRO DE ANATOMÍA PATOLÓGICA</div>
          </div>
          <img src="/logo.png" alt="Vighi" className="h-16 w-auto flex-shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-1.5 py-4 border-b border-panel">
        <InfoRow label="Paciente" value={data.paciente} />
        <InfoRow label="Protocolo" value={data.protocolo} />
        <InfoRow label="Médico solicitante" value={data.medicoSolicitante} />
        <InfoRow label="Fecha" value={data.fecha} />
        <InfoRow label="Institución" value={data.institucion} />
        <InfoRow label="Página" value={data.pagina} />
        <InfoRow label="Cobertura" value={data.cobertura} />
      </div>

      <div className="text-[18px] font-extrabold text-vighi tracking-[-0.01em] text-center py-3">INFORME HISTOPATOLÓGICO</div>

      <div className="py-4 border-b border-panel print:border-b-0">
        <div className="bg-surf rounded-lg px-4 py-3.5 print:bg-[#f7f4ff] print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]">
          <div className={SECTION_TITLE}>Diagnóstico final</div>
          <div className="text-[16px] font-bold text-vighi mb-1.5">{data.diagnosticoFinal}</div>
          <p className="text-[12px] text-[#333] m-0 whitespace-pre-line">{data.hallazgos}</p>
        </div>
      </div>

      <div className={SECTION}>
        <div className={SECTION_TITLE}>Material</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
          <div className="flex flex-col gap-1.5">
            {columnaA.map(m => (
              <div key={m.letra} className="flex items-center gap-2.5 text-[12px] text-[#333]">
                <MaterialCircle letra={m.letra} /> {m.desc}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {columnaB.map(m => (
              <div key={m.letra} className="flex items-center gap-2.5 text-[12px] text-[#333]">
                <MaterialCircle letra={m.letra} /> {m.desc}
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.macroscopia && (
        <div className={SECTION}>
          <div className={SECTION_TITLE}>Macroscopía</div>
          <p className="text-[12px] text-[#333] leading-[1.6] m-0 whitespace-pre-line">{data.macroscopia}</p>
        </div>
      )}

      {data.microscopia && (
        <div className={SECTION}>
          <div className={SECTION_TITLE}>Microscopía</div>
          <p className="text-[12px] text-[#333] leading-[1.6] m-0 whitespace-pre-line">{data.microscopia}</p>
        </div>
      )}

      {data.comentario && (
        <div className={SECTION}>
          <div className={SECTION_TITLE}>Comentario</div>
          <p className="text-[12px] text-[#333] leading-[1.6] m-0 whitespace-pre-line">{data.comentario}</p>
        </div>
      )}

      {data.fotos.length > 0 && (
        <div className="py-4 border-b border-panel">
          <div className="text-[12px] font-bold text-vighi uppercase tracking-[0.08em] text-center mb-3">Fotomicrografías representativas</div>
          <div className="flex justify-center gap-12 flex-wrap">
            {data.fotos.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5" style={{ width: 130 }}>
                {f.url ? (
                  <img src={f.url} alt={f.caption} className="w-full aspect-[4/3] rounded-md border border-panel object-cover" />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-md bg-surf border border-panel flex items-center justify-center text-accent/30 text-[18px]">
                    <i className="fas fa-image"></i>
                  </div>
                )}
                <span className="text-[10px] text-slate">{f.caption}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-slate mt-2">HE: Hematoxilina y eosina</div>
        </div>
      )}

      <div className="flex items-end justify-between pt-5 pb-4">
        <div className="text-[10px] text-slate">Informe firmado digitalmente</div>
        <div className="text-right">
          <div className="h-14 flex items-end justify-end">
            {data.patologa.firmaUrl && (
              <img src={data.patologa.firmaUrl} alt="Firma" className="h-14 w-auto object-contain" />
            )}
          </div>
          <div className="text-[12px] font-bold text-vighi">{data.patologa.nombre}</div>
          <div className="text-[10px] text-slate">Médica Patóloga</div>
          <div className="text-[10px] text-slate">MN {data.patologa.mn} · MP {data.patologa.mp}</div>
        </div>
      </div>

      <div className="border-t border-panel pt-3 flex flex-col items-center gap-1 text-center">
        <div className="text-[9px] font-bold text-slate tracking-[0.04em]">
          INFORMACIÓN CONFIDENCIAL · SECRETO MÉDICO · ALCANCES DEL ARTÍCULO 156 DEL CÓDIGO PENAL
        </div>
        <div className="flex items-center gap-4 text-[9px] text-slate">
          <span><i className="fas fa-location-dot"></i> Concepción Arenal 3732 · CABA · C1427EKH</span>
          <span><i className="fas fa-phone"></i> 4551-7752 L.R.</span>
          <span><i className="fas fa-envelope"></i> anatomia.patologica@susanavighi.com.ar</span>
          <span><i className="fas fa-globe"></i> www.susanavighi.com.ar</span>
        </div>
      </div>
    </div>
  );
}
