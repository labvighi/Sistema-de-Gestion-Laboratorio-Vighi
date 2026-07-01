'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario } from './types';

interface AuthState {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      login: (usuario) => set({ usuario }),
      logout: () => set({ usuario: null }),
    }),
    { name: 'vighi-auth' }
  )
);
