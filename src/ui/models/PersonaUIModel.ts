export interface PersonaUIModel {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNac?: string | null;
  direccion?: string;
  telefono?: string;
  foto?: string | null;
  idDepartamento?: number | null;
  nombreDepartamento?: string | null;
  color?: string;
  initials?: string;
}

export function toPersonaUIModel(dto: any): PersonaUIModel {
  // The server returns the field as "apellido" (no trailing s); the local DTO
  // uses "apellidos". Accept either so the list always shows surnames.
  const apellidos = dto.apellidos ?? dto.apellido ?? '';
  const initials = `${(dto.nombre || '').charAt(0) || ''}${apellidos.charAt(0) || ''}`.toUpperCase();
  const color = ['#D32F2F', '#1976D2', '#388E3C', '#F57C00'][dto.idDepartamento % 4] || '#607D8B';
  return {
    id: dto.id,
    nombre: dto.nombre,
    apellidos,
    fechaNac: dto.fechaNac,
    direccion: dto.direccion,
    telefono: dto.telefono,
    foto: dto.foto,
    idDepartamento: dto.idDepartamento,
    nombreDepartamento: dto.nombreDepartamento,
    color,
    initials
  };
}