///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule, NSEmptyOutletComponent } from 'nativescript-angular/router';
import { ViewsModuleComponent } from './views.module.component.tns';
import { BViewComponent } from './b/b.view.component.tns';
import { Blank2ViewComponent } from './blank-2/blank-2.view.component.tns';
import { Blank3ViewComponent } from './blank-3/blank-3.view.component.tns';

const routes: Routes = [
  {
    path: 'views',
    component: ViewsModuleComponent,
    children: [
      {
        path: 'b',
        component: BViewComponent
      },
      {
        path: 'blank-2',
        component: Blank2ViewComponent
      },
      {
        path: 'blank-3',
        component: Blank3ViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
  providers: []
})
export class ViewsRoutingModule {}
