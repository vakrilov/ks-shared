///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './app.component.tns';
import { ApplicationModule } from './modules/application/application.module.tns';
import { CoreModule } from './core/core.module.tns';
import { SideDrawerItemsComponent } from './core/navigation/side-drawer-items.component.tns';
import { TabsComponent } from './core/navigation/tabs.component.tns';
import { SharedModule } from './shared/shared.module.tns';

export const config = {
  bootstrap: [AppComponent],
  imports: [SharedModule, NativeScriptModule, ApplicationModule, AppRoutingModule, CoreModule, CoreModule.forRoot()],
  declarations: [AppComponent, SideDrawerItemsComponent, TabsComponent],
  schemas: [NO_ERRORS_SCHEMA]
};
