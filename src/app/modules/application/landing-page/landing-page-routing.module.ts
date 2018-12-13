///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageViewComponent } from './landing-page.view.component';
import { AuthenticationGuardService } from '../../../core/auth/authentication-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageViewComponent,
    canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LandingPageRoutingModule {}
