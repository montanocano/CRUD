import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { BaseApi } from '../../core/BaseApi';
import { PersonaDTO } from '../../domain/dtos/PersonaDTO';

@injectable()
export class PersonaApi {
  private endpoint = '/api/Personas';

  constructor(
    @inject(TYPES.BaseApi)
    public baseApi: BaseApi
  ) {}

  private async throwWithBody(res: Response, label: string): Promise<never> {
    let detail = '';
    try { detail = await res.text(); } catch (_) {}
    throw new Error(`${label}: ${res.status}${detail ? ' — ' + detail : ''}`);
  }

  async getAll(): Promise<PersonaDTO[]> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) await this.throwWithBody(res, 'GET Personas failed');
    return (await res.json()) as PersonaDTO[];
  }

  async getById(id: number): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) await this.throwWithBody(res, `GET Persona ${id} failed`);
    return (await res.json()) as PersonaDTO;
  }

  async create(payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    // Build body: strip id (server assigns it); send fechaNac as ISO string
    // or as empty string when absent (some ASP.NET models require the key present).
    const body: any = {
      nombre:          payload.nombre          ?? '',
      apellidos:       payload.apellidos       ?? '',
      fechaNac:        payload.fechaNac        ? new Date(payload.fechaNac).toISOString() : '',
      direccion:       payload.direccion       ?? '',
      telefono:        payload.telefono        ?? '',
      foto:            payload.foto            ?? null,
      idDepartamento:  payload.idDepartamento  ?? null,
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) await this.throwWithBody(res, 'Create Persona failed');
    return (await res.json()) as PersonaDTO;
  }

  async update(id: number, payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    // PUT must include id in body matching the route, and all fields.
    const body: any = {
      id,
      nombre:          payload.nombre          ?? '',
      apellidos:       payload.apellidos       ?? '',
      fechaNac:        payload.fechaNac        ? new Date(payload.fechaNac).toISOString() : '',
      direccion:       payload.direccion       ?? '',
      telefono:        payload.telefono        ?? '',
      foto:            payload.foto            ?? null,
      idDepartamento:  payload.idDepartamento  ?? null,
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) await this.throwWithBody(res, `Update Persona ${id} failed`);
    return (await res.json()) as PersonaDTO;
  }

  async delete(id: number): Promise<void> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { method: 'DELETE', headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) await this.throwWithBody(res, `Delete Persona ${id} failed`);
  }

  async uploadImage(fileBlob: Blob): Promise<string> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/upload-image`);
    const form = new FormData();
    form.append('file', fileBlob);
    const res = await fetch(url, { method: 'POST', body: form });
    if (!res.ok) await this.throwWithBody(res, 'Upload image failed');
    const json = await res.json();
    return json.url || json.path || '';
  }
}