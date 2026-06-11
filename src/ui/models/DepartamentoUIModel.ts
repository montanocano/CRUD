export interface DepartamentoUIModel {
  idDepartamento: number;
  nombreDepartamento: string;
  color?: string;
  icon?: string;
}

export function toDepartamentoUIModel(dto: any): DepartamentoUIModel {
  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];
  const id = dto?.idDepartamento ?? dto?.id ?? 0;
  const color = colors[id % colors.length];
  return {
    idDepartamento: id,
    nombreDepartamento: dto?.nombreDepartamento ?? dto?.nombre ?? '(sin nombre)',
    color,
    icon: 'office-building',
  };
}