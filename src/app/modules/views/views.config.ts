///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ViewsModuleComponent } from './views.module.component';
import { ViewsRoutingModule } from './views-routing.module';
import { AppLayoutViewModule } from './../application/app-layout/app-layout.view.module';
import { GridViewModule } from './grid/grid.view.module';

export const config: NgModule = {
  declarations: [ViewsModuleComponent],
  entryComponents: [],
  imports: [CommonModule, SharedModule, LayoutModule, AppLayoutViewModule, GridViewModule, ViewsRoutingModule],
  exports: [],
  providers: []
};
