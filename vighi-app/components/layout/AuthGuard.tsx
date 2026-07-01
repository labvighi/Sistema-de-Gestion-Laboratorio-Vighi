'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const usuario = useAuthStore(s => s.usuario);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!usuario) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [usuario, router]);

  if (!checked) return null;
  return <>{children}</>;
}
