'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const usuario = useAuthStore(s => s.usuario);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(useAuthStore.persist.hasHydrated());

  useEffect(() => {
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated && !usuario) {
      router.replace('/login');
    }
  }, [hydrated, usuario, router]);

  if (!hydrated || !usuario) return null;
  return <>{children}</>;
}
