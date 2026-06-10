import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { BaseApi } from '../../core/BaseApi';
import { DepartamentoDTO } from '../dtos/DepartamentoDTO';

@injectable()
export class DepartamentoApi {
  constructor(@inject(TYPES.BaseApi) private baseApi: BaseApi) {}

  private endpoint = '/api/Departamentos';

  async getAll(): Promise<DepartamentoDTO[]> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) throw new Error(`GET Departamentos failed: ${res.status}`);
    return (await res.json()) as DepartamentoDTO[];
  }

  async getById(id: number): Promise<DepartamentoDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) throw new Error(`GET Departamento ${id} failed: ${res.status}`);
    return (await res.json()) as DepartamentoDTO;
  }

  async create(payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    const res = await fetch(url, {
      method: 'POST',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Create Departamento failed: ${res.status}`);
    return (await res.json()) as DepartamentoDTO;
  }

  async update(id: number, payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, {
      method: 'PUT',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Update Departamento ${id} failed: ${res.status}`);
    return (await res.json()) as DepartamentoDTO;
  }

  async delete(id: number): Promise<void> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { method: 'DELETE', headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) throw new Error(`Delete Departamento ${id} failed: ${res.status}`);
  }
}
