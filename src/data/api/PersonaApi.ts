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
    // Flat body — no nested "persona" wrapper.
    // imagen must be a string (never null) to pass server validation.
    const body = {
      nombre:         payload.nombre         ?? '',
      apellido:       payload.apellidos      ?? '',
      fechaNac:       payload.fechaNac       ? new Date(payload.fechaNac).toISOString() : new Date(0).toISOString(),
      direccion:      payload.direccion      ?? '',
      telefono:       payload.telefono       ?? '',
      imagen:         payload.foto           ?? '',
      idDepartamento: payload.idDepartamento ?? null,
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) await this.throwWithBody(res, 'Create Persona failed');
    // Some servers return 201 with the created object; others return 204 with no body.
    if (res.status === 204 || res.headers.get('content-length') === '0') return payload as PersonaDTO;
    return (await res.json()) as PersonaDTO;
  }

  async update(id: number, payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const body: any = {
      id,
      nombre:         payload.nombre         ?? '',
      apellido:       payload.apellidos      ?? '',
      fechaNac:       payload.fechaNac       ? new Date(payload.fechaNac).toISOString() : new Date(0).toISOString(),
      direccion:      payload.direccion      ?? '',
      telefono:       payload.telefono       ?? '',
      imagen:         payload.foto           ?? '',
      idDepartamento: payload.idDepartamento ?? null,
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) await this.throwWithBody(res, `Update Persona ${id} failed`);
    // PUT endpoints commonly return 204 No Content (empty body).
    if (res.status === 204 || res.headers.get('content-length') === '0') return payload as PersonaDTO;
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