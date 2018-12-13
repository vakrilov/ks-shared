///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service.tns';
import { NavigationService } from '../services/navigation.service.tns';

@Injectable()
export class LoggedInLazyLoadGuard implements CanActivate {
  constructor(private userService: UserService, private navigationService: NavigationService) {}

  canActivate() {
    return this.userService.isLoggedIn.then(result => {
      if (!result) {
        this.navigationService.navigate(['login'], { clearHistory: true });
      }
      return result;
    });
  }
}
