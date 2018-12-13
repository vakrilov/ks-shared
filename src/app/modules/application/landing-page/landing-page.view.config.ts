///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from './../../../shared/shared.module';
import { LandingPageViewBaseComponent } from './landing-page.view.base.component';
import { LandingPageViewComponent } from './landing-page.view.component';
import { RouterModule } from '@angular/router';
import { LandingPageRoutingModule } from './landing-page-routing.module';

import { BottomSectionComponent } from './bottomSection';
import { TopSectionComponent } from './topSection';

export const config: NgModule = {
  declarations: [LandingPageViewBaseComponent, LandingPageViewComponent, BottomSectionComponent, TopSectionComponent],
  entryComponents: [],
  exports: [BottomSectionComponent, TopSectionComponent],
  imports: [CommonModule, SharedModule, LayoutModule, RouterModule, LandingPageRoutingModule],
  providers: []
};
