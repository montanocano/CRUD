import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { DepartamentoApi, DepartamentoDTO } from '../api/DepartamentoApi';

export interface IDepartamentoRepository {
  getAll(): Promise<DepartamentoDTO[]>;
  getById(id: number): Promise<DepartamentoDTO>;
  create(payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO>;
  update(id: number, payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO>;
  delete(id: number): Promise<void>;
}

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
