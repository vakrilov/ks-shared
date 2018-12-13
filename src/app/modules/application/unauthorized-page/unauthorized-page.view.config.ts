///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from './../../../shared/shared.module';
import { UnauthorizedPageViewBaseComponent } from './unauthorized-page.view.base.component';
import { UnauthorizedPageViewComponent } from './unauthorized-page.view.component';
import { RouterModule } from '@angular/router';

import { BottomSectionComponent } from './bottomSection';
import { TopSectionComponent } from './topSection';

export const config: NgModule = {
  declarations: [UnauthorizedPageViewBaseComponent, UnauthorizedPageViewComponent, BottomSectionComponent, TopSectionComponent],
  entryComponents: [],
  exports: [BottomSectionComponent, TopSectionComponent],
  imports: [CommonModule, SharedModule, LayoutModule, RouterModule],
  providers: []
};
