///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { HttpRequest } from '@angular/common/http';

import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { concatMap, map, tap, take } from 'rxjs/operators';

import { UserManager, Log, MetadataService, User } from 'oidc-client';

import { AuthenticationProviderInterface } from '../authentication-provider.interface';

export class OidcProvider implements AuthenticationProviderInterface {
  private userStream = new BehaviorSubject<User>(null);
  protected userManager: UserManager;
  protected userState: Observable<User>;

  constructor(settings: any) {
    this.userManager = new UserManager(settings);

    this.userState = this.userStream.pipe(
      take(1),
      concatMap(item => (item ? of(item) : from(this.userManager.getUser())))
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.userState.pipe(map((user: User) => user && !user.expired));
  }

  public authenticate(): void {
    this.userManager.signinRedirect({
      prompt: 'login'
    });
  }

  public completeAuthentication(): Observable<any> {
    return from(this.userManager.signinRedirectCallback()).pipe(
      tap((user: User) => {
        this.userStream.next(user);
      })
    );
  }

  public authenticateRequest(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.userState.pipe(
      map((user: User) => {
        const token = user ? user.access_token : '';

        return request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
      })
    );
  }

  public signIn(credentials: any): Observable<void> {
    return of();
  }

  public signOut(): Observable<void> {
    return from(this.userManager.removeUser()).pipe(
      tap((item: any) => {
        this.userStream.next(null);
      })
    );
  }

  public supportsRefresh(): boolean {
    return false; // TODO - make it true when popup callback is implemented
  }

  public silentRefresh(): Observable<any> {
    return this.userState.pipe(
      map((user: User) => ({
        prompt: 'none',
        login_hint: user.profile.email || user.profile.sub
      })),
      concatMap(options => from(this.userManager.signinPopup(options))),
      tap(user => {
        this.userStream.next(user);
      })
    );
  }
}
