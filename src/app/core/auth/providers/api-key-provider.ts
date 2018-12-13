///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injector } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationProvider } from './authentication-provider';

class ApiKeySession {
  apiKey: string;
}

export class ApiKeyProvider extends AuthenticationProvider<ApiKeySession> {
  protected http: HttpClient;

  protected get sessionKey(): string {
    return 'api.key.' + this.settings.sessionKey;
  }

  constructor(settings: any, injector: Injector) {
    super(settings, injector);
    this.http = injector.get(HttpClient);
  }

  authenticate(): void {
    this.router.navigate(['application', 'api-key']);
  }

  protected getAuthenticatedRequest(request: HttpRequest<any>): HttpRequest<any> {
    switch (this.settings.transport) {
      case 'header':
        return request.clone({
          headers: request.headers.set(this.settings.name, this.session.apiKey)
        });

      case 'query-string':
        return request.clone({
          params: request.params.set(this.settings.name, this.session.apiKey)
        });

      default:
        break;
    }

    return request;
  }

  protected signInRequest(credentials: any): Observable<any> {
    const { apiKey } = credentials;
    let getRequest: Observable<any>;

    switch (this.settings.transport) {
      case 'header':
        const headers = {};
        headers[this.settings.name] = apiKey;

        getRequest = this.http.get(this.settings.serviceUri, {
          responseType: 'text',
          headers
        });
        break;

      case 'query-string':
        const params = {};
        params[this.settings.name] = apiKey;

        getRequest = this.http.get(this.settings.serviceUri, {
          responseType: 'text',
          params
        });
        break;

      default:
        return throwError(new Error(`Invalid API Key transport: ${this.settings.transport}`));
    }

    return getRequest.pipe(map(() => ({ apiKey })));
  }
}
