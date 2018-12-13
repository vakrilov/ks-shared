///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module.tns#LoginModule'
  },
  {
    path: '',
    redirectTo: 'application/app-layout',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  providers: []
})
export class AppRoutingModule {}
