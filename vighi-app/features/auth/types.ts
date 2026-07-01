export interface Usuario {
  id?: string | number;
  mail: string;
  perfilNombre: string;
  nombre?: string;
}

export type Perfil =
  | 'Administración'
  | 'Citotécnico'
  | 'Dirección'
  | 'Externo'
  | 'Gerencial'
  | 'Patólogo'
  | 'Técnico';
