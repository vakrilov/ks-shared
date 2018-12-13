///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Kinvey } from 'kinvey-nativescript-sdk';

import { BackendService } from './backend.service.tns';
import { User } from '../models/user.model.tns';

@Injectable()
export class UserService {
  private onLoggedInChangedSubject: ReplaySubject<boolean>;

  isLoggedIn: Promise<boolean>;

  private get isLoggedInStatus() {
    return !!this.backendService.getActiveUser();
  }

  get onLoggedInChanged() {
    return this.onLoggedInChangedSubject.asObservable().pipe(distinctUntilChanged());
  }

  constructor(private backendService: BackendService) {
    this.onLoggedInChangedSubject = new ReplaySubject(1);
    this.backendService.setLoggedInChangedObservable(this.onLoggedInChanged);

    this.updateIsLoggedInPromise();
  }

  register(user: User) {
    const registerPromise = this.logout().then(() => this.backendService.signup(user.username, user.password, user.email));

    registerPromise.catch(this.handleErrors);
    this.updateIsLoggedInPromise(registerPromise);

    return registerPromise.then((user: Kinvey.User) => {
      return new Promise<Kinvey.User>(resolve => setTimeout(() => resolve(user), 1000));
    });
  }

  login(user: User) {
    const loginPromise = this.logout().then(() => this.backendService.login(user.username, user.password));

    loginPromise.catch(this.handleErrors);
    this.updateIsLoggedInPromise(loginPromise);

    return loginPromise;
  }

  loginWithMIC(redirectUri: string, authorizationGrant?: Kinvey.AuthorizationGrant, options?: Kinvey.RequestOptions) {
    const loginPromise = this.logout().then(() => this.backendService.loginWithMIC(redirectUri, authorizationGrant, options));

    loginPromise.catch(this.handleErrors);
    this.updateIsLoggedInPromise(loginPromise);

    return loginPromise;
  }

  logout(): Promise<void> {
    const logoutPromise = this.backendService.logout();
    this.updateIsLoggedInPromise(logoutPromise);

    return logoutPromise;
  }

  resetPassword(email) {
    const resetPasswordPromise = this.backendService.resetPassword(email);

    resetPasswordPromise.catch(this.handleErrors);

    return resetPasswordPromise;
  }

  handleErrors(error) {
    console.log(error.toString());
  }

  private updateIsLoggedInPromise(pendingPromise?: Promise<any>) {
    if (!pendingPromise) {
      this.isLoggedIn = Promise.resolve(this.isLoggedInStatus);
      this.onLoggedInChangedSubject.next(this.isLoggedInStatus);
      return;
    }

    this.isLoggedIn = pendingPromise.catch().then(() => {
      this.onLoggedInChangedSubject.next(this.isLoggedInStatus);
      return this.isLoggedInStatus;
    });
  }
}
