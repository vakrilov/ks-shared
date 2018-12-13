///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable, Injector, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, from, of, throwError } from 'rxjs';
import { map, concatMap, reduce, findIndex } from 'rxjs/operators';

import { SessionStorageService } from '../session-storage.service';
import { AuthenticationProviderInterface } from './authentication-provider.interface';
import { AUTHENTICATION_PROVIDER_FACTORIES, AuthenticationProviderFactoryInterface } from './authentication-provider-factory.interface';

const SIGNIN_STATE_KEY = 'auth.signin.state';

class SignInState {
  providerIndex: number;
  returnUrl: string;
  dataProviders: string[];
}

@Injectable()
export class AuthenticationService {
  public readonly requireSignIn: boolean;
  protected authProviders: AuthenticationProviderInterface[] = [];
  protected authMap: {
    [key: string]: {
      provider: AuthenticationProviderInterface;
      index: number;
    };
  } = {};

  constructor(
    @Inject('AuthenticationConfig') protected config: any,
    private router: Router,
    private location: Location,
    private sessionStorageService: SessionStorageService,
    @Inject(AUTHENTICATION_PROVIDER_FACTORIES) private providerFactories: AuthenticationProviderFactoryInterface[]
  ) {
    if (!config) {
      return;
    }

    this.requireSignIn = Object.keys(config.authProviders).length > 0;

    Object.keys(config.authProviders).forEach(authType => {
      config.authProviders[authType].items.forEach(item => {
        const authProvider = this.createAuthProvider(authType, item.settings);
        this.authProviders.push(authProvider);

        item.dataProviders.forEach(dataProvider => {
          this.authMap[dataProvider] = {
            provider: authProvider,
            index: this.authProviders.length - 1
          };
        });
      });
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return from(this.authProviders).pipe(
      concatMap(item => item.isAuthenticated()),
      reduce((acc, val) => acc && val, true)
    );
  }

  public authenticate(returnUrl: string): void {
    this.findUnauthenticatedProviderIndex().subscribe(index => this.authenticateProvider(returnUrl, index));
  }

  public authenticateDataProvider(dataProvider: string) {
    if (this.authMap[dataProvider]) {
      this.authenticateProvider(this.location.path(), this.authMap[dataProvider].index);
    }
  }

  public completeAuthentication(): Observable<any> {
    const signInState: SignInState = this.getSigninState() || {
      providerIndex: -1,
      returnUrl: '/',
      dataProviders: []
    };

    if (signInState.providerIndex === -1) {
      return of({ returnUrl: signInState.returnUrl });
    }

    return this.authProviders[signInState.providerIndex].completeAuthentication().pipe(
      map(item => {
        this.sessionStorageService.removeItem(SIGNIN_STATE_KEY);
        return { returnUrl: signInState.returnUrl };
      })
    );
  }

  public authenticateRequest(dataProvider: string, request: HttpRequest<any>): Observable<HttpRequest<any>> {
    if (this.authMap[dataProvider]) {
      return this.authMap[dataProvider].provider.authenticateRequest(request);
    }

    return of(request);
  }

  public signIn(credentials: any): Observable<void> {
    const signInState: SignInState = this.getSigninState();

    if (!signInState) {
      return throwError(new Error('Error Signing In. Unknown authentication provider.'));
    }

    return this.authProviders[signInState.providerIndex].signIn(credentials);
  }

  public signOut(): void {
    from(this.authProviders)
      .pipe(concatMap(item => item.signOut()))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public supportsRefresh(dataProvider: string): boolean {
    return this.authMap[dataProvider] ? this.authMap[dataProvider].provider.supportsRefresh() : false;
  }

  public silentRefresh(dataProvider: string): Observable<any> {
    if (this.supportsRefresh(dataProvider)) {
      return this.authMap[dataProvider].provider.silentRefresh();
    }

    return throwError(new Error(`Silent refresh is not supported for ${dataProvider} data provider`));
  }

  public getSigninState(): SignInState {
    return this.sessionStorageService.getItem(SIGNIN_STATE_KEY);
  }

  protected createAuthProvider(type: string, settings: any): AuthenticationProviderInterface {
    for (const factory of this.providerFactories) {
      const authProvider: AuthenticationProviderInterface = factory.createAuthProvider(type, settings);

      if (authProvider) {
        return authProvider;
      }
    }

    return null;
  }

  private findUnauthenticatedProviderIndex(): Observable<number> {
    return from(this.authProviders).pipe(
      concatMap(item => item.isAuthenticated()),
      findIndex(val => !val)
    );
  }

  private authenticateProvider(returnUrl: string, providerIndex): void {
    if (providerIndex > -1) {
      const signInState = {
        providerIndex,
        returnUrl,
        dataProviders: Object.keys(this.authMap).filter(key => this.authMap[key].index === providerIndex)
      };

      this.sessionStorageService.setItem(SIGNIN_STATE_KEY, signInState);
      this.authProviders[providerIndex].authenticate();
    }
  }
}
