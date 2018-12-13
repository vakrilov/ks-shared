///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from './../../../shared/shared.module';
import { ApiKeyViewBaseComponent } from './api-key.view.base.component';
import { ApiKeyViewComponent } from './api-key.view.component';
import { RouterModule } from '@angular/router';

import { BottomSectionComponent } from './bottomSection';
import { MiddleSectionComponent } from './middleSection';
import { TopSectionComponent } from './topSection';

export const config: NgModule = {
  declarations: [ApiKeyViewBaseComponent, ApiKeyViewComponent, BottomSectionComponent, MiddleSectionComponent, TopSectionComponent],
  entryComponents: [],
  exports: [BottomSectionComponent, MiddleSectionComponent, TopSectionComponent],
  imports: [CommonModule, SharedModule, LayoutModule, RouterModule],
  providers: []
};
