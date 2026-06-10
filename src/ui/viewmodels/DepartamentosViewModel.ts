import { makeAutoObservable, runInAction } from 'mobx';
import { toDepartamentoUIModel } from '../models/DepartamentoUIModel';
import container from '../../core/container';
import TYPES from '../../core/types';
import { DepartamentoUseCases } from '../../domain/usecases/DepartamentoUseCases';

export default class DepartamentosViewModel {
  private static _instance: DepartamentosViewModel | null = null;

  departamentos: any[] = [];
  departamentoSeleccionado: any = null;
  isLoading = false;
  error: string | null = null;

  private departamentoUseCases: DepartamentoUseCases;

  private constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    try {
      this.departamentoUseCases = container.get(TYPES.DepartamentoUseCases);
    } catch (e) {
      // placeholder until binding exists
      // @ts-ignore
      this.departamentoUseCases = new DepartamentoUseCases(null as any);
    }
  }

  static getInstance() {
    if (!this._instance) this._instance = new DepartamentosViewModel();
    return this._instance;
  }

  async loadDepartamentos() {
    this.isLoading = true;
    this.error = null;
    try {
      const list = await this.departamentoUseCases.getDepartamentos();
      runInAction(() => {
        this.departamentos = (list || []).map(toDepartamentoUIModel);
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || String(e);
      });
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  selectDepartamento(d: any | null) {
    this.departamentoSeleccionado = d;
  }

  async addDepartamento(payload: any) {
    await this.departamentoUseCases.addDepartamento(payload);
    await this.loadDepartamentos();
  }

  async updateDepartamento(id: number, payload: any) {
    await this.departamentoUseCases.updateDepartamento(id, payload);
    await this.loadDepartamentos();
  }

  async deleteDepartamento(id: number) {
    await this.departamentoUseCases.deleteDepartamento(id);
    await this.loadDepartamentos();
  }
}
