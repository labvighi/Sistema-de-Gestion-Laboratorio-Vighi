'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SubItem {
  label: string;
  href: string;
  count?: number;
}

interface Section {
  title: string;
  items: SubItem[];
}

interface MenuGroup {
  id: string;
  icon: string;
  label: string;
  href?: string;          // si hay link directo sin submenú
  sections?: Section[];   // si tiene acordeón
  items?: SubItem[];      // ítems planos sin sección
}

// BDD: los counts vendrán de la API
const MENU: MenuGroup[] = [
  {
    id: 'recepcion',
    icon: 'fa fa-plus-circle',
    label: 'Recepción',
    href: '/recepcion',
  },
  {
    id: 'traslados',
    icon: 'fa fa-motorcycle',
    label: 'Traslados',
    sections: [
      {
        title: 'Laboratorio',
        items: [
          { label: 'Lab › Informar',      href: '/flujos?ida=14',  count: 1     },
          { label: 'Lab › Colorear',      href: '/flujos?ida=40',  count: 15    },
          { label: 'Lab › Revisar',       href: '/flujos?ida=102', count: 4     },
          { label: 'Lab › Archivar',      href: '/flujos?ida=120', count: 68793 },
          { label: 'Lab Ext › Procesar',  href: '/flujos?ida=105', count: 10    },
        ],
      },
      {
        title: 'Citotécnicos',
        items: [
          { label: 'Cito › Informar', href: '/flujos?ida=90', count: 546 },
        ],
      },
      {
        title: 'Devolución',
        items: [
          { label: 'Cons › Entregar', href: '/flujos?ida=110', count: 196 },
        ],
      },
    ],
  },
  {
    id: 'laboratorio',
    icon: 'fa fa-flask',
    label: 'Laboratorio',
    sections: [
      {
        title: 'Procesamiento',
        items: [
          { label: 'IHQ › Procesar',      href: '/flujos?ida=106', count: 14 },
          { label: 'Histo › Procesar',    href: '/flujos?ida=50',  count: 19 },
          { label: 'Liq › Centrifugar',   href: '/flujos?ida=57',  count: 2  },
        ],
      },
      {
        title: 'Inclusión',
        items: [
          { label: 'Cassette › Incluir',  href: '/flujos?ida=60',  count: 114 },
        ],
      },
      {
        title: 'Corte PH',
        items: [
          { label: 'Taco › Cortar',     href: '/flujos?ida=70',  count: 31 },
          { label: 'Taco IHQ › Cortar', href: '/flujos?ida=104', count: 21 },
        ],
      },
      {
        title: 'Coloreado',
        items: [
          { label: 'Porta › Colorear', href: '/flujos?ida=80', count: 774 },
        ],
      },
      {
        title: 'Archivo',
        items: [
          { label: 'Porta › Archivar', href: '/flujos?ida=130', count: 98037 },
          { label: 'Taco › Archivar',  href: '/flujos?ida=118', count: 53492 },
        ],
      },
      {
        title: 'Reserva',
        items: [
          { label: 'Reserva › Tirar', href: '/flujos?ida=140', count: 11 },
        ],
      },
    ],
  },
  {
    id: 'diagnosticos',
    icon: 'fa fa-stethoscope',
    label: 'Diagnósticos',
    sections: [
      {
        title: 'Macroscopía',
        items: [
          { label: 'Macro › Informar', href: '/flujos?ida=20', count: 112 },
        ],
      },
      {
        title: 'Microscopía',
        items: [
          { label: 'Micro › Informar',     href: '/flujos?ida=100', count: 1030 },
          { label: 'Micro › Interpretar',  href: '/flujos?ida=108', count: 22   },
          { label: 'Micro › Revisar',      href: '/flujos?ida=103', count: 25   },
        ],
      },
    ],
  },
];

function fmtCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

interface Props { open: boolean; }

export default function SideNavbar({ open }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(id: string) {
    setOpenGroup(prev => prev === id ? null : id);
  }

  return (
    <nav
      className={`fixed top-14 left-0 bottom-0 w-[210px] border-r border-[rgba(124,62,237,0.15)] flex flex-col z-[1000] font-sans overflow-hidden transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${open ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ background: 'linear-gradient(180deg, #1f0c42 0%, #291050 60%)' }}
    >
      {/* Menu scroll area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 pb-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.1)] [&::-webkit-scrollbar-thumb]:rounded">
        {MENU.map(group => {
          const isOpen = openGroup === group.id;
          const hasAccordion = !!(group.sections || group.items);

          const itemClasses = `flex items-center gap-2.5 py-2.5 px-4 text-[rgba(255,255,255,0.82)] text-[12px] font-medium border-l-2 border-transparent cursor-pointer select-none transition-[background,color,border-color] duration-[0.12s] bg-none border-t-0 border-r-0 border-b-0 w-full text-left no-underline ${isOpen ? 'bg-[rgba(124,62,237,0.22)] text-white border-l-accent' : 'hover:bg-[rgba(124,62,237,0.22)] hover:text-white hover:border-l-accent'}`;
          const itemContent = (
            <>
              <i className={`${group.icon} text-[13px] w-[18px] text-center flex-shrink-0 transition-colors duration-[0.12s] ${isOpen ? 'text-accent' : 'text-[rgba(255,255,255,0.5)]'}`}></i>
              <span className="flex-1">{group.label}</span>
              {hasAccordion && (
                <i className={`fa fa-chevron-right text-[9px] transition-[transform,color] duration-[0.18s] ease ${isOpen ? 'rotate-90 text-[rgba(255,255,255,0.6)]' : 'text-[rgba(255,255,255,0.3)]'}`}></i>
              )}
            </>
          );

          return (
            <div key={group.id}>
              {group.href ? (
                <Link href={group.href} className={itemClasses}>
                  {itemContent}
                </Link>
              ) : (
                <button className={itemClasses} onClick={() => hasAccordion && toggleGroup(group.id)}>
                  {itemContent}
                </button>
              )}

              {hasAccordion && isOpen && (
                <div className="bg-[rgba(0,0,0,0.15)]">
                  {/* Ítems planos */}
                  {group.items?.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-1.5 px-4 pl-8 text-[rgba(255,255,255,0.62)] text-[11.5px] no-underline border-l-2 border-transparent transition-[background,color,border-color] duration-100 hover:bg-[rgba(124,62,237,0.12)] hover:text-white hover:border-l-accent hover:no-underline"
                    >
                      <span className="flex-1">{item.label}</span>
                      {item.count != null && (
                        <span className="font-mono text-[9px] font-bold text-[rgba(255,255,255,0.45)] px-1.5 py-px rounded-[20px] bg-[rgba(255,255,255,0.1)] min-w-[20px] text-center transition-[color,background] duration-100 group-hover:text-white group-hover:bg-accent">
                          {fmtCount(item.count)}
                        </span>
                      )}
                    </Link>
                  ))}
                  {/* Secciones con título */}
                  {group.sections?.map(sec => (
                    <div key={sec.title}>
                      <div className="flex items-center gap-2 py-2 px-4 pl-5 font-mono text-[9px] font-bold tracking-[0.12em] uppercase text-accent opacity-85 bg-[rgba(124,62,237,0.08)] mt-1 before:content-[''] before:block before:w-3.5 before:h-px before:bg-accent before:opacity-50 before:flex-shrink-0 after:content-[''] after:flex-1 after:h-px after:bg-[rgba(124,62,237,0.2)]">
                        {sec.title}
                      </div>
                      {sec.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center py-1.5 px-4 pl-8 text-[rgba(255,255,255,0.62)] text-[11.5px] no-underline border-l-2 border-transparent transition-[background,color,border-color] duration-100 hover:bg-[rgba(124,62,237,0.12)] hover:text-white hover:border-l-accent hover:no-underline"
                        >
                          <span className="flex-1">{item.label}</span>
                          {item.count != null && (
                            <span className="font-mono text-[9px] font-bold text-[rgba(255,255,255,0.45)] px-1.5 py-px rounded-[20px] bg-[rgba(255,255,255,0.1)] min-w-[20px] text-center">
                              {fmtCount(item.count)}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[8.5px] text-[rgba(255,255,255,0.18)] tracking-[0.08em]">
        CAP VIGHI · SISTEMA DE GESTIÓN
      </div>
    </nav>
  );
}
