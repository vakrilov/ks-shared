///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';

import { AuthenticationProviderInterface } from '../authentication-provider.interface';
import { SessionStorageService } from '../../session-storage.service';

export abstract class AuthenticationProvider<TSession> implements AuthenticationProviderInterface {
  protected router: Router;
  protected sessionStorageService: SessionStorageService;
  protected session: TSession = null;
  protected abstract get sessionKey(): string;

  constructor(protected settings: any, protected injector: Injector) {
    this.router = injector.get(Router);
    this.sessionStorageService = injector.get(SessionStorageService);
  }

  isAuthenticated(): Observable<boolean> {
    this.ensureSession();
    return of(this.session !== null);
  }

  authenticate(): void {
    this.router.navigate(['application', 'login']);
  }

  completeAuthentication(): Observable<any> {
    return of(this.session);
  }

  authenticateRequest(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    this.ensureSession();

    if (this.session) {
      return of(this.getAuthenticatedRequest(request));
    }

    return of(request);
  }

  signIn(credentials: any): Observable<void> {
    return this.signInRequest(credentials).pipe(
      tap((data: any) => {
        this.session = this.createSession(data);
        this.sessionStorageService.setItem(this.sessionKey, this.session);
      })
    );
  }

  signOut(): Observable<void> {
    this.sessionStorageService.removeItem(this.sessionKey);
    this.session = null;
    return of(null);
  }

  supportsRefresh(): boolean {
    return false;
  }

  silentRefresh(): Observable<any> {
    return of(null);
  }

  protected ensureSession() {
    if (this.session === null) {
      this.session = this.sessionStorageService.getItem(this.sessionKey);
    }
  }

  protected getAuthenticatedRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request;
  }

  protected createSession(userData: any): TSession {
    return userData as TSession;
  }

  protected abstract signInRequest(credentials: any): Observable<any>;
}
