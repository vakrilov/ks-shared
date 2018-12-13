///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { NativeScriptUIGaugeModule } from 'nativescript-ui-gauge/angular';

import { HideNavBarDirective } from './directives/hide-nav-bar.directive.tns';
import { ShowNavBarDirective } from './directives/show-nav-bar.directive.tns';
import { ActionBarController } from './directives/action-bar-controller.directive.tns';

export const config: NgModule = {
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIChartModule,
    NativeScriptUIListViewModule,
    NativeScriptUICalendarModule,
    NativeScriptUIAutoCompleteTextViewModule,
    NativeScriptUIDataFormModule,
    NativeScriptUIGaugeModule
  ],
  exports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptUIChartModule,
    NativeScriptUIListViewModule,
    NativeScriptUICalendarModule,
    NativeScriptUIAutoCompleteTextViewModule,
    NativeScriptUIDataFormModule,
    NativeScriptUIGaugeModule,

    HideNavBarDirective,
    ShowNavBarDirective,
    ActionBarController
  ],
  declarations: [HideNavBarDirective, ShowNavBarDirective, ActionBarController],
  schemas: [NO_ERRORS_SCHEMA]
};
