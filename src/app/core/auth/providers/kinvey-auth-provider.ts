///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injector } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthenticationProvider } from './authentication-provider';

class User {
  userName: string;
  authToken: string;
  kinveySession: any;
}

export class KinveyAuthProvider extends AuthenticationProvider<User> {
  protected http: HttpClient;

  protected get sessionKey(): string {
    return 'kinvey.auth.' + this.settings.sessionKey;
  }

  constructor(settings: any, injector: Injector) {
    super(settings, injector);
    this.http = injector.get(HttpClient);
  }

  signOut(): Observable<void> {
    return this.http
      .post(`${this.settings.serviceUri}/user/${this.settings.appKey}/_logout`, null, {
        headers: { Authorization: `Kinvey ${this.session.authToken}` }
      })
      .pipe(switchMap(() => super.signOut()));
  }

  protected getAuthenticatedRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Kinvey ${this.session.authToken}`)
    });
  }

  protected signInRequest(credentials: any): Observable<any> {
    const body = {
      username: credentials.userName,
      password: credentials.password
    };

    const header = btoa(this.settings.appKey + ':' + this.settings.appSecret);

    return this.http
      .post(`${this.settings.serviceUri}/user/${this.settings.appKey}/login`, body, {
        headers: { Authorization: `Basic ${header}` }
      })
      .pipe(
        map((kinveySession: any) => ({
          userName: kinveySession.username,
          authToken: kinveySession._kmd.authtoken,
          kinveySession
        }))
      );
  }
}
