///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from './../../../shared/shared.module.tns';

import { HomeViewBaseComponent } from './home.view.base.component.tns';
import { HomeViewComponent } from './home.view.component.tns';



export const config: NgModule = {
  declarations: [HomeViewBaseComponent, HomeViewComponent],
  entryComponents: [  ],
  exports: [HomeViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([
      { path: "", component: HomeViewComponent },
    ])
  ],
  providers: []
};


