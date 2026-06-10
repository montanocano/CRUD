import { PersonaDTO } from '../dtos/PersonaDTO';

export interface IPersonaRepository {
  getAll(): Promise<PersonaDTO[]>;
  getById(id: number): Promise<PersonaDTO>;
  create(payload: Partial<PersonaDTO>): Promise<PersonaDTO>;
  update(id: number, payload: Partial<PersonaDTO>): Promise<PersonaDTO>;
  delete(id: number): Promise<void>;
}
