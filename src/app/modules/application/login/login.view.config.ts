///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from './../../../shared/shared.module';
import { LoginViewBaseComponent } from './login.view.base.component';
import { LoginViewComponent } from './login.view.component';
import { RouterModule } from '@angular/router';

import { BottomSectionComponent } from './bottomSection';
import { MiddleSectionComponent } from './middleSection';
import { TopSectionComponent } from './topSection';

export const config: NgModule = {
  declarations: [LoginViewBaseComponent, LoginViewComponent, BottomSectionComponent, MiddleSectionComponent, TopSectionComponent],
  entryComponents: [],
  exports: [BottomSectionComponent, MiddleSectionComponent, TopSectionComponent],
  imports: [CommonModule, SharedModule, LayoutModule, RouterModule],
  providers: []
};
