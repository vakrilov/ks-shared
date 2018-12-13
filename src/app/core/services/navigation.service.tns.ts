///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ExtendedNavigationExtras } from 'nativescript-angular/router/router-extensions';

@Injectable()
export class NavigationService {
  constructor(private zone: NgZone, private routerExtensions: RouterExtensions) {}

  navigate(command: any[], extras: ExtendedNavigationExtras = {}) {
    extras.animated = true;
    extras.transition = extras.transition || {
      name: 'slide',
      duration: 200,
      curve: 'ease'
    };

    this.zone.run(() => this.routerExtensions.navigate(command, extras));
  }

  canGoBackToPreviousPage() {
    return this.routerExtensions.canGoBack();
  }

  backToPreviousPage() {
    if (this.canGoBackToPreviousPage()) {
      this.routerExtensions.back();
    }
  }
}
