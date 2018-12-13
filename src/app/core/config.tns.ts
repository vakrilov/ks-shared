///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import * as nsrouter from 'nativescript-angular/router';
import { TabsComponent } from './navigation/tabs.component.tns';
import { LoggedInLazyLoadGuard } from './guards/logged-in-lazy-load.guard.tns';
// TODO: Use directly after definitions updated for NativeScript 5
const NSEmptyOutletComponent = (<any>nsrouter).NSEmptyOutletComponent;

export var config = {
  backendConfig: {},
  routes: {
    home: {
      path: '',
      redirectTo: '/tabs',
      pathMatch: 'full'
    },
    tabs: [
      {
        path: 'tabs',
        component: TabsComponent,
        children: [
          {
            path: 'welcome',
            loadChildren: './welcome/welcome.module.tns#WelcomeModule',
            canActivate: [LoggedInLazyLoadGuard],
            outlet: 'welcomeTab',
            component: NSEmptyOutletComponent
          }
        ]
      }
    ],
    tabsOutlets: {
      welcomeTab: ['welcome']
    },
    sideDrawer: [],
    hidden: []
  }
};
