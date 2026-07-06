'use client';

import PageHeader from '@/components/ui/PageHeader';

// BDD: reemplazar por listado real de órdenes sin protocolo asignado
const IMAGENES_PENDIENTES: never[] = [];

export default function ImagenesView() {
  return (
    <div className="flex flex-col gap-4 p-7 pb-18">
      <PageHeader
        eyebrow="Recepción"
        title="Imágenes"
        icon="fas fa-images"
        subtitle={`Órdenes sin protocolo asignado. ${IMAGENES_PENDIENTES.length} pendientes`}
      />

      <div className="bg-white border border-panel rounded-[0.75rem] shadow-[0_2px_8px_rgba(41,16,80,0.05)] overflow-hidden">
        <div className="min-h-[220px] flex items-center justify-center">
          <div className="flex items-center gap-2 text-[13px] text-slate py-14">
            <i className="fas fa-info-circle text-accent/40"></i>
            No hay imágenes pendientes de vinculación.
          </div>
        </div>
      </div>
    </div>
  );
}
