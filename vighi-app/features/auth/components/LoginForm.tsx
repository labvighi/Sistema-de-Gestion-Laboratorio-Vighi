'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store';
import Toast, { ToastType } from '@/components/ui/Toast';

// BDD: reemplazar por llamada a API
const USUARIOS_MOCK = [
  { mail: 'admin@susanavighi.com.ar',       password: '1234', perfilNombre: 'Administración' },
  { mail: 'citotecnico@susanavighi.com.ar', password: '1234', perfilNombre: 'Citotécnico' },
  { mail: 'patologo@susanavighi.com.ar',    password: '1234', perfilNombre: 'Patólogo' },
];

const PILLARS = [
  'Citología cervicovaginal',
  'Histopatología oncológica',
  'Inmunohistoquímica',
  'Anatomía patológica',
];

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore(s => s.login);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    await new Promise(r => setTimeout(r, 400)); // BDD: fetch real

    const usuario = USUARIOS_MOCK.find(
      u => u.mail.toLowerCase() === mail.toLowerCase() && u.password === password
    );

    if (!usuario) {
      setToast({ message: 'Credenciales incorrectas. Verificá tu e-mail y contraseña.', type: 'error' });
      setLoading(false);
      return;
    }

    setToast({ message: `¡Bienvenido, ${usuario.perfilNombre}!`, type: 'success' });
    login({ mail: usuario.mail, perfilNombre: usuario.perfilNombre });
    setTimeout(() => router.push('/dashboards'), 400);
  }

  return (
    <div className="flex min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-[0_0_440px] bg-vighi flex flex-col justify-between py-[52px] px-12 relative overflow-hidden max-md:hidden">
        <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 440 800" preserveAspectRatio="xMidYMid slice">
          <circle cx="380" cy="120" r="200" fill="rgba(124,62,237,0.08)" />
          <circle cx="-40" cy="600" r="280" fill="rgba(124,62,237,0.05)" />
        </svg>
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-16">
            <img src="/logo_sv_blanco.png" alt="Vighi" className="h-11 w-auto opacity-90" />
            <div className="text-[13px] font-bold text-white/50 tracking-[0.08em] uppercase leading-[1.3]">CAP Vighi<br />Sistema de Gestión</div>
          </div>
          <div className="text-[32px] font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-5">
            Diagnóstico<br />de <span className="text-accent">precisión</span>
          </div>
          <div className="text-[14px] text-white/50 leading-[1.6] max-w-[280px]">
            Plataforma integrada de gestión anatomopatológica para el Centro de Diagnóstico Susana Vighi.
          </div>
        </div>
        <div className="relative z-10 flex flex-col gap-3.5">
          {PILLARS.map(p => (
            <div key={p} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="font-mono text-[10px] font-medium text-white/40 tracking-[0.1em] uppercase">{p}</span>
            </div>
          ))}
        </div>
        <div className="relative z-10 font-mono text-[10px] text-white/25 tracking-[0.08em]">
          © {new Date().getFullYear()} CAP Vighi
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-10 px-6 bg-white">
        <div className="w-full max-w-[380px]">
          <div className="font-mono text-[10px] font-medium text-accent tracking-[0.12em] uppercase mb-2.5">Acceso al sistema</div>
          <div className="text-[26px] font-bold text-vighi tracking-[-0.02em] mb-2 leading-[1.2]">Bienvenido de nuevo</div>
          <div className="text-[13px] text-slate mb-9 leading-[1.5]">
            Ingresá con tu cuenta institucional para continuar.
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-[18px]">
              <label htmlFor="mail" className="block text-[12px] font-semibold text-vighi mb-1.5 tracking-[0.01em]">E-mail</label>
              <input
                id="mail" type="email"
                placeholder="usuario@susanavighi.com.ar"
                value={mail} onChange={e => setMail(e.target.value)}
                required autoFocus
                className="w-full h-11 px-3.5 border border-panel rounded-lg font-sans text-[14px] text-vighi bg-white outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#bbb] focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,62,237,0.12)]"
              />
            </div>
            <div className="mb-[18px]">
              <label htmlFor="password" className="block text-[12px] font-semibold text-vighi mb-1.5 tracking-[0.01em]">Contraseña</label>
              <input
                id="password" type="password"
                placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                required
                className="w-full h-11 px-3.5 border border-panel rounded-lg font-sans text-[14px] text-vighi bg-white outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#bbb] focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,62,237,0.12)]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="block w-full h-[46px] bg-accent text-white border-none rounded-lg font-sans text-[14px] font-bold tracking-[0.04em] cursor-pointer transition-[background,box-shadow,transform] duration-150 hover:bg-[#6b2fdc] hover:shadow-[0_4px_16px_rgba(124,62,237,0.3)] active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
