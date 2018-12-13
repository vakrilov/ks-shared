///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule, NSEmptyOutletComponent } from 'nativescript-angular/router';
import { ApplicationModuleComponent } from './application.module.component.tns';
import { AppLayoutViewComponent } from './app-layout/app-layout.view.component.tns';
import { HomeViewComponent } from './home/home.view.component.tns';

const routes: Routes = [
  {
    path: 'application',
    component: ApplicationModuleComponent,
    children: [
      {
        path: 'app-layout',
        component: AppLayoutViewComponent,
        children: [
          {
            path: "home1",
            outlet: "homeTab",
            component: NSEmptyOutletComponent,
            loadChildren: "./home/home.view.module.tns#HomeViewModule",
          }
        ]
      },
      {
        path: 'home',
        component: HomeViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
  providers: []
})
export class ApplicationRoutingModule { }
