import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

const CARDS = [
  {
    href: '/etiquetas',
    icon: 'fas fa-tags',
    title: 'Etiquetas',
    desc: 'Impresión de etiquetas para identificar muestras y órdenes de trabajo.',
    badge: null,
    disabled: false,
  },
  {
    href: '/imagenes',
    icon: 'fas fa-images',
    title: 'Imágenes',
    desc: 'Órdenes sin protocolo asignado que requieren vinculación de imágenes.',
    badge: { label: '0 pendientes', urgent: true },
    disabled: false,
  },
  {
    href: '/activacion',
    icon: 'fas fa-user-check',
    title: 'Activación',
    desc: 'Activación de protocolos para habilitar el avance al área de laboratorio.',
    badge: null,
    disabled: false,
  },
  {
    href: '#',
    icon: 'fas fa-desktop',
    title: 'Validación',
    desc: 'Validación final de órdenes para habilitar la entrega y facturación.',
    badge: { label: 'Próximamente', urgent: false },
    disabled: true,
  },
];

export default function RecepcionView() {
  return (
    <div className="p-9 px-10 pb-20">
      <PageHeader
        eyebrow="Ingreso de muestras"
        title="Recepción"
        icon="fas fa-robot"
        subtitle="Proceso automatizado de ingreso de muestras y carga de órdenes."
      />

      <div className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-slate mb-3.5 flex items-center gap-2.5 after:content-[''] after:flex-1 after:h-px after:bg-panel">
        Acciones principales
      </div>

      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
        {CARDS.map(card => (
          <Link
            key={card.title}
            href={card.href}
            className={`group bg-white border border-panel rounded-[14px] p-7 pb-6 no-underline flex flex-col gap-4 relative overflow-hidden transition-[box-shadow,border-color,transform] duration-200 cursor-pointer text-inherit before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-[#a855f7] before:opacity-0 before:transition-opacity before:duration-200 hover:shadow-[0_8px_32px_rgba(41,16,80,0.12),0_2px_8px_rgba(41,16,80,0.06)] hover:border-accent hover:-translate-y-0.5 hover:no-underline hover:text-inherit hover:before:opacity-100 ${card.disabled ? 'opacity-55 cursor-not-allowed pointer-events-none' : ''}`}
          >
            <div className="w-12 h-12 rounded-[12px] bg-surf flex items-center justify-center text-[20px] text-accent flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(124,62,237,0.12)]">
              <i className={card.icon}></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="text-[16px] font-bold text-vighi tracking-[-0.01em]">{card.title}</div>
                {card.badge && (
                  <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-[20px] whitespace-nowrap ${card.badge.urgent ? 'bg-[rgba(239,68,68,0.10)] text-[#dc2626]' : 'bg-[rgba(124,62,237,0.10)] text-accent'}`}>
                    {card.badge.label}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-slate leading-[1.55] m-0">{card.desc}</p>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-accent opacity-0 transition-[opacity,transform] duration-200 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0">
              Abrir <i className="fas fa-arrow-right"></i>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
