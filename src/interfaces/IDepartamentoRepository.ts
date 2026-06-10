import { DepartamentoDTO } from '../data/dtos/DepartamentoDTO';

export interface IDepartamentoRepository {
  getAll(): Promise<DepartamentoDTO[]>;
  getById(id: number): Promise<DepartamentoDTO>;
  create(payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO>;
  update(id: number, payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO>;
  delete(id: number): Promise<void>;
}
