///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnInit, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/auth/authentication.service';

@Component({
  selector: 'kb-login',
  templateUrl: './login.view.component.html',
  styleUrls: ['./login.view.component.css']
})
export class LoginViewBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  public $config: any = {
    title: '&lt;Title&gt;'
  };

  public $loginForm: FormGroup;
  public $loginError: string;
  public $dataProviders = '';

  protected $router: Router;
  protected $authenticationService: AuthenticationService;

  constructor(protected $injector: Injector) {
    this.$router = $injector.get(Router);
    this.$authenticationService = $injector.get(AuthenticationService);

    const signInState = this.$authenticationService.getSigninState();

    if (signInState) {
      this.$dataProviders = signInState.dataProviders.join(', ');
    }

    this.$loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public login() {
    const { userName, password } = this.$loginForm.value;

    this.$authenticationService.signIn({ userName, password }).subscribe(
      () => {
        let onLoginResult;
        onLoginResult = this['onLogin']({ userName });

        if (onLoginResult instanceof Observable) {
          onLoginResult.subscribe(() => {
            this.$router.navigate(['auth-callback']);
          });
        } else {
          this.$router.navigate(['auth-callback']);
        }
      },
      error => {
        this.$loginError = 'Invalid credentials';
      }
    );
  }

  public ngOnInit(): void {
    this['onInit']();
  }

  public ngAfterViewInit(): void {
    this['onShow']();
  }

  public ngOnDestroy(): void {
    this['onHide']();
  }
}
