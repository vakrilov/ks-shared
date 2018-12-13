///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login/login.view.component';
import { UnauthorizedPageViewComponent } from './unauthorized-page/unauthorized-page.view.component';
import { AuthenticationGuardService } from './../../core/auth/authentication-guard.service';
import { AuthorizationGuardService } from './../../core/auth/authorization-guard.service';

const routes: Routes = [
  {
    path: 'application',
    children: [
      {
        path: 'login',
        component: LoginViewComponent
      },
      {
        path: 'forbidden',
        component: UnauthorizedPageViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ApplicationRoutingModule {}
