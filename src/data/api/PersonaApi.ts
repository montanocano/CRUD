import { injectable, inject } from 'inversify';
import TYPES from '../../core/types';
import { BaseApi } from '../../core/BaseApi';
import { PersonaDTO } from '../dtos/PersonaDTO';

@injectable()
export class PersonaApi {
  constructor(@inject(TYPES.BaseApi) private baseApi: BaseApi) {}

  private endpoint = '/api/Personas';

  async getAll(): Promise<PersonaDTO[]> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) throw new Error(`GET Personas failed: ${res.status}`);
    return (await res.json()) as PersonaDTO[];
  }

  async getById(id: number): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) throw new Error(`GET Persona ${id} failed: ${res.status}`);
    return (await res.json()) as PersonaDTO;
  }

  async create(payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(this.endpoint);
    const res = await fetch(url, {
      method: 'POST',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Create Persona failed: ${res.status}`);
    return (await res.json()) as PersonaDTO;
  }

  async update(id: number, payload: Partial<PersonaDTO>): Promise<PersonaDTO> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, {
      method: 'PUT',
      headers: this.baseApi.getDefaultHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Update Persona ${id} failed: ${res.status}`);
    return (await res.json()) as PersonaDTO;
  }

  async delete(id: number): Promise<void> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/${id}`);
    const res = await fetch(url, { method: 'DELETE', headers: this.baseApi.getDefaultHeaders() });
    if (!res.ok) throw new Error(`Delete Persona ${id} failed: ${res.status}`);
  }

  // Optional: upload image if API supports it
  async uploadImage(fileBlob: Blob): Promise<string> {
    const url = this.baseApi.getBaseUrl(`${this.endpoint}/upload-image`);
    const form = new FormData();
    form.append('file', fileBlob);
    const res = await fetch(url, { method: 'POST', body: form });
    if (!res.ok) throw new Error(`Upload image failed: ${res.status}`);
    const json = await res.json();
    return json.url || json.path || '';
  }
}
