import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { DepartamentoApi } from '../api/DepartamentoApi';
import { DepartamentoDTO } from '../dtos/DepartamentoDTO';
import { IDepartamentoRepository } from '../../interfaces/IDepartamentoRepository';

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  constructor(@inject(TYPES.DepartamentoApi) private departamentoApi: DepartamentoApi) {}

  getAll(): Promise<DepartamentoDTO[]> {
    return this.departamentoApi.getAll();
  }
  getById(id: number): Promise<DepartamentoDTO> {
    return this.departamentoApi.getById(id);
  }
  create(payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO> {
    return this.departamentoApi.create(payload);
  }
  update(id: number, payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO> {
    return this.departamentoApi.update(id, payload);
  }
  delete(id: number): Promise<void> {
    return this.departamentoApi.delete(id);
  }
}
