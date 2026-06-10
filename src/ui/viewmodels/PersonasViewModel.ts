import { makeAutoObservable, runInAction } from 'mobx';
import { PersonaUIModel, toPersonaUIModel } from '../models/PersonaUIModel';
import { PersonaUseCases } from '../../domain/usecases/PersonaUseCases';
import container from '../../core/container';
import TYPES from '../../core/types';

export default class PersonasViewModel {
  private static _instance: PersonasViewModel | null = null;

  personas: PersonaUIModel[] = [];
  personaSeleccionada: PersonaUIModel | null = null;
  isLoading = false;
  error: string | null = null;

  private personaUseCases: PersonaUseCases;

  private constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    // Resolve usecases from container when available
    try {
      this.personaUseCases = container.get(TYPES.PersonaUseCases);
    } catch (e) {
      // placeholder until binding exists
      // @ts-ignore
      this.personaUseCases = new PersonaUseCases(null as any);
    }
  }

  static getInstance() {
    if (!this._instance) this._instance = new PersonasViewModel();
    return this._instance;
  }

  selectPersona(p: PersonaUIModel | null) {
    this.personaSeleccionada = p;
  }

  async loadPersonas() {
    this.isLoading = true;
    this.error = null;
    try {
      const list = await this.personaUseCases.getPersonas();
      runInAction(() => {
        this.personas = (list || []).map(toPersonaUIModel);
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || String(e);
      });
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async addPersona(payload: any) {
    await this.personaUseCases.addPersona(payload);
    await this.loadPersonas();
  }

  async updatePersona(id: number, payload: any) {
    await this.personaUseCases.updatePersona(id, payload);
    await this.loadPersonas();
  }

  async deletePersona(id: number) {
    await this.personaUseCases.deletePersona(id);
    await this.loadPersonas();
  }
}
