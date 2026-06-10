import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { IDepartamentoRepository } from '../../data/repositories/DepartamentoRepository';

@injectable()
export class DepartamentoUseCases {
  constructor(@inject(TYPES.DepartamentoRepository) private departamentoRepository: IDepartamentoRepository) {}

  getDepartamentos() {
    return this.departamentoRepository.getAll();
  }

  addDepartamento(payload: any) {
    return this.departamentoRepository.create(payload);
  }

  updateDepartamento(id: number, payload: any) {
    return this.departamentoRepository.update(id, payload);
  }

  deleteDepartamento(id: number) {
    return this.departamentoRepository.delete(id);
  }
}
