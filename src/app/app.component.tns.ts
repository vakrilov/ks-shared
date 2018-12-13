///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { config } from './core/config.tns';
import { BackendService } from './core/services/backend.service.tns';
import { NavigationService } from './core/services/navigation.service.tns';

@Component({
  templateUrl: './app.component.html'
})
export class AppComponent {
  get enableSideDrawer() {
    return config.routes.sideDrawer.length > 0 && !!this.user && !this.navigationService.canGoBackToPreviousPage();
  }

  get user() {
    return this.backendService.getActiveUser();
  }

  constructor(
    private backendService: BackendService,
    private navigationService: NavigationService,
    // provide access to root ViewContainerRef from AppComponent
    public viewContainerRef: ViewContainerRef
  ) {}
}
