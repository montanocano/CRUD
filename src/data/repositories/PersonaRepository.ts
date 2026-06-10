import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { PersonaApi, PersonaDTO } from '../api/PersonaApi';

export interface IPersonaRepository {
  getAll(): Promise<PersonaDTO[]>;
  getById(id: number): Promise<PersonaDTO>;
  create(payload: Partial<PersonaDTO>): Promise<PersonaDTO>;
  update(id: number, payload: Partial<PersonaDTO>): Promise<PersonaDTO>;
  delete(id: number): Promise<void>;
}

@injectable()
export class PersonaRepository implements IPersonaRepository {
  constructor(@inject(TYPES.PersonaApi) private personaApi: PersonaApi) {}

  getAll(): Promise<PersonaDTO[]> {
    return this.personaApi.getAll();
  }
  getById(id: number): Promise<PersonaDTO> {
    return this.personaApi.getById(id);
  }
  create(payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    return this.personaApi.create(payload);
  }
  update(id: number, payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    return this.personaApi.update(id, payload);
  }
  delete(id: number): Promise<void> {
    return this.personaApi.delete(id);
  }
}
