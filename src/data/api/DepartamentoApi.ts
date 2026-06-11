import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { BaseApi } from '../../core/BaseApi';
import { DepartamentoDTO } from '../../domain/dtos/DepartamentoDTO';

@injectable()
export class DepartamentoApi {
  private endpoint = '/api/Departamentos';

  constructor(
    @inject(TYPES.BaseApi)
    public baseApi: BaseApi
  ) {}

  private async throwWithBody(res: Response, label: string): Promise<never> {
    let detail = '';
    try { detail = await res.text(); } catch (_) {}
    throw new Error(`${label}: ${res.status}${detail ? ' — ' + detail : ''}`);
  }

  async getAll(): Promise<DepartamentoDTO[]> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) await this.throwWithBody(res, 'GET Departamentos failed');
    return (await res.json()) as DepartamentoDTO[];
  }

  async getById(id: number): Promise<DepartamentoDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) await this.throwWithBody(res, `GET Departamento ${id} failed`);
    return (await res.json()) as DepartamentoDTO;
  }

  async create(payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    // Send idDepartamento: 0 so ASP.NET model binding does not reject a
    // missing required int field; the server overwrites it with the real id.
    const body = {
      idDepartamento: 0,
      nombreDepartamento: payload.nombreDepartamento ?? '',
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) await this.throwWithBody(res, 'Create Departamento failed');
    return (await res.json()) as DepartamentoDTO;
  }

  async update(id: number, payload: Partial<DepartamentoDTO>): Promise<DepartamentoDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const body = {
      idDepartamento: id,
      nombreDepartamento: payload.nombreDepartamento ?? '',
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) await this.throwWithBody(res, `Update Departamento ${id} failed`);
    return (await res.json()) as DepartamentoDTO;
  }

  async delete(id: number): Promise<void> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { method: 'DELETE', headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) await this.throwWithBody(res, `Delete Departamento ${id} failed`);
  }
}