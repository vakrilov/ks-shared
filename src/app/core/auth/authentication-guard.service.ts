///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanActivateChild {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.authenticationService.isAuthenticated().subscribe(authenticated => {
        observer.next(authenticated);
        observer.complete();

        if (!authenticated) {
          this.authenticationService.authenticate(state.url);
        }
      });
    });
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
