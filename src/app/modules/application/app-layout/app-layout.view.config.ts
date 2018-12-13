///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from './../../../shared/shared.module';
import { AppLayoutViewBaseComponent } from './app-layout.view.base.component';
import { AppLayoutViewComponent } from './app-layout.view.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from '../../../core/notification/notification.component';
import { KbToNotificationIconPipe } from '../../../core/notification/to-notification-icon.pipe';

export const config: NgModule = {
  declarations: [AppLayoutViewBaseComponent, AppLayoutViewComponent, NotificationComponent, KbToNotificationIconPipe],
  entryComponents: [],
  exports: [NotificationComponent, AppLayoutViewComponent],
  imports: [CommonModule, SharedModule, LayoutModule, RouterModule],
  providers: []
};
