/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { Inject, Injector } from '@angular/core';
import { Blank3ViewBaseComponent } from './blank-3.view.base.component.tns';

export class Blank3ViewComponent extends Blank3ViewBaseComponent {
  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }
}
