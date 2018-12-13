///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module.tns';
import { ViewsModuleComponent } from './views.module.component.tns';
import { ViewsRoutingModule } from './views-routing.module.tns';
import { AppLayoutViewModule } from './../application/app-layout/app-layout.view.module.tns';

import { BViewModule } from './b/b.view.module.tns';
import { Blank2ViewModule } from './blank-2/blank-2.view.module.tns';
import { Blank3ViewModule } from './blank-3/blank-3.view.module.tns';

export const config: NgModule = {
  declarations: [ViewsModuleComponent],
  entryComponents: [],
  imports: [CommonModule, SharedModule, AppLayoutViewModule, BViewModule, Blank2ViewModule, Blank3ViewModule, ViewsRoutingModule],
  exports: [],
  providers: []
};
