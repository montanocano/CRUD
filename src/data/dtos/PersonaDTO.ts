export interface PersonaDTO {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNac: string | null;
  direccion?: string;
  telefono?: string;
  foto?: string | null;
  idDepartamento?: number | null;
  nombreDepartamento?: string | null;
}
