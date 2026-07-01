import type { Perfil } from '@/features/auth/types';

export interface UsuarioListItem {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  perfilNombre: Perfil;
}
