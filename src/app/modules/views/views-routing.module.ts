///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsModuleComponent } from './views.module.component';
import { GridViewComponent } from './grid/grid.view.component';
import { AuthenticationGuardService } from './../../core/auth/authentication-guard.service';
import { AuthorizationGuardService } from './../../core/auth/authorization-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ViewsModuleComponent,
    canActivate: [AuthenticationGuardService, AuthorizationGuardService],
    canActivateChild: [AuthenticationGuardService],
    data: {
      authorization: {
        allowedRoles: []
      }
    },
    children: [
      {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'grid',
        component: GridViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ViewsRoutingModule {}
