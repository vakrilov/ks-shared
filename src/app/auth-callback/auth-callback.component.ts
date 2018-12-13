///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../core/auth/authentication.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.authenticationService.completeAuthentication().subscribe(state => {
      this.router.navigateByUrl(state.returnUrl);
    });
  }
}
