///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../core/auth/authentication.service';

@Component({
  selector: 'kb-user-drop-down',
  templateUrl: './user-drop-down.component.html'
})
export class KbUserDropDownComponent implements OnInit {
  public hasAuthProviders: boolean;
  public showSignOut = false;
  private canShowSignOut = false;

  constructor(private authenticationService: AuthenticationService) {
    this.hasAuthProviders = this.authenticationService.requireSignIn;
    this.showSignOut = false;
  }

  public ngOnInit() {
    this.authenticationService.isAuthenticated().subscribe(isAuthenticated => {
      this.canShowSignOut = isAuthenticated;
    });
  }

  public toggleSignOut() {
    if (this.canShowSignOut) {
      this.showSignOut = !this.showSignOut;
    }
  }

  public signOut() {
    this.authenticationService.signOut();
  }
}
