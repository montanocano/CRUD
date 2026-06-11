import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class BaseApi {
  // Base URL for the API (set to the provided Azure endpoint)
  public readonly BASE_URL: string = 'https://proyectoconbasededatosyapi-h4ebgab7f8cqc0bj.spaincentral-01.azurewebsites.net';

  public getBaseUrl(endpoint: string): string {
    // Ensure endpoint begins with a slash or is a full URL
    if (!endpoint) return this.BASE_URL;
    try {
      return new URL(endpoint, this.BASE_URL).toString();
    } catch (e) {
      return `${this.BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    }
  }

  public getDefaultHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json'
    };
  }
}
