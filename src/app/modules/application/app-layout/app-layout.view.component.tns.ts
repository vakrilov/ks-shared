/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { Inject, Injector } from '@angular/core';
import { AppLayoutViewBaseComponent } from './app-layout.view.base.component.tns';

export class AppLayoutViewComponent extends AppLayoutViewBaseComponent {
  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    console.log(this.activeRoute);

    this.nav.navigate([{
      outlets: { homeTab: ["home1"], }
    }], { relativeTo: this.activeRoute });
  }
}
