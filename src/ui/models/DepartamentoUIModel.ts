export interface DepartamentoUIModel {
  idDepartamento: number;
  nombreDepartamento: string;
  color?: string;
  icon?: string;
}

export function toDepartamentoUIModel(dto: any): DepartamentoUIModel {
  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];
  const color = colors[(dto.idDepartamento || 0) % colors.length];
  return {
    idDepartamento: dto.idDepartamento,
    nombreDepartamento: dto.nombreDepartamento,
    color,
    icon: 'office-building'
  };
}
