import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { IPersonaRepository } from '../../interfaces/IPersonaRepository';

@injectable()
export class PersonaUseCases {
  constructor(@inject(TYPES.PersonaRepository) private personaRepository: IPersonaRepository) {}

  private calculateAge(fechaNac?: string | null): number {
    if (!fechaNac) return 0;
    const dob = new Date(fechaNac);
    if (isNaN(dob.getTime())) return 0;
    const diff = Date.now() - dob.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  async getPersonas() {
    const list = await this.personaRepository.getAll();
    const day = new Date().getDay(); // 0=Sun,1=Mon,...6=Sat
    // Fridays (5) and Saturdays (6): show only persons older than 18
    if (day === 5 || day === 6) {
      return list.filter(p => this.calculateAge(p.fechaNac) > 18);
    }
    return list;
  }

  async addPersona(payload: any) {
    return this.personaRepository.create(payload);
  }

  async updatePersona(id: number, payload: any) {
    return this.personaRepository.update(id, payload);
  }

  async deletePersona(id: number) {
    const day = new Date().getDay();
    if (day === 0) {
      throw new Error('Deleting personas is not allowed on Sundays');
    }
    return this.personaRepository.delete(id);
  }
}
