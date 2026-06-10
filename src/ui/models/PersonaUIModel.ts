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
  const initials = `${(dto.nombre || '').charAt(0) || ''}${(dto.apellidos || '').charAt(0) || ''}`.toUpperCase();
  const color = ['#D32F2F', '#1976D2', '#388E3C', '#F57C00'][dto.idDepartamento % 4] || '#607D8B';
  return {
    id: dto.id,
    nombre: dto.nombre,
    apellidos: dto.apellidos,
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
