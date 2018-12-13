///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { LoggedInLazyLoadGuard } from './guards/logged-in-lazy-load.guard.tns';

import { NavigationService } from './services/navigation.service.tns';
import { BackendService } from './services/backend.service.tns';
import { UserService } from './services/user.service.tns';
import { NetworkMonitoringService } from './services/network-monitoring.service.tns';

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptUISideDrawerModule],
  exports: [NativeScriptRouterModule, NativeScriptUISideDrawerModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [LoggedInLazyLoadGuard, ModalDialogService, NavigationService, BackendService, UserService, NetworkMonitoringService]
    };
  }
}
