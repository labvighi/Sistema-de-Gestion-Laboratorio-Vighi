interface PageHeaderProps {
  eyebrow: string;
  title: string;
  icon?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, icon, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <div className="font-mono text-[10px] font-medium text-accent tracking-[0.12em] uppercase mb-1">{eyebrow}</div>
        <h1 className="text-[26px] font-extrabold text-vighi tracking-[-0.02em] m-0 flex items-center gap-2.5">
          {icon && <i className={`${icon} text-accent text-[22px]`}></i>}
          {title}
        </h1>
        {subtitle && <p className="text-[14px] text-slate mt-1.5 leading-[1.5]">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
