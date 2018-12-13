///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injector } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationProvider } from './authentication-provider';

class User {
  userName: string;
  header: string;
}

export class BasicAuthProvider extends AuthenticationProvider<User> {
  protected http: HttpClient;

  protected get sessionKey(): string {
    return 'basic.auth.' + this.settings.sessionKey;
  }

  constructor(settings: any, injector: Injector) {
    super(settings, injector);
    this.http = injector.get(HttpClient);
  }

  protected getAuthenticatedRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Basic ${this.session.header}`)
    });
  }

  protected signInRequest(credentials: any): Observable<any> {
    const { userName, password } = credentials;

    const header = btoa(userName + ':' + password);

    return this.http
      .get(this.settings.serviceUri, {
        responseType: 'text',
        headers: { Authorization: `Basic ${header}` }
      })
      .pipe(map(() => ({ userName, header })));
  }
}
