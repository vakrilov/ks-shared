///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ApplicationModuleComponent } from './application.module.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { LandingPageViewModule } from './landing-page/landing-page.view.module';
import { LoginViewModule } from './login/login.view.module';
import { UnauthorizedPageViewModule } from './unauthorized-page/unauthorized-page.view.module';

export const config: NgModule = {
  declarations: [ApplicationModuleComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    LandingPageViewModule,
    LoginViewModule,
    UnauthorizedPageViewModule,
    ApplicationRoutingModule
  ],
  exports: [],
  providers: []
};
