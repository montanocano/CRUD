import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { PersonaApi } from '../api/PersonaApi';
import { PersonaDTO } from '../dtos/PersonaDTO';
import { IPersonaRepository } from '../../interfaces/IPersonaRepository';

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
