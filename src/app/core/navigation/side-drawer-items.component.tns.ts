///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'application';
import { NavigationService } from '../services/navigation.service.tns';

@Component({
  selector: 'side-drawer-items',
  moduleId: module.id,
  templateUrl: './side-drawer-items.component.html'
})
export class SideDrawerItemsComponent {
  constructor(private navigationService: NavigationService) {}

  open(path: string): void {
    (<RadSideDrawer>app.getRootView()).closeDrawer();
    this.navigationService.navigate([path]);
  }
}
