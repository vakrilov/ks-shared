/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { Component, Optional } from '@angular/core';
import { LandingPageViewComponent } from './landing-page.view.component';

@Component({
  selector: 'kb-bottom-section',
  templateUrl: './bottomSection.html'
})
export class BottomSectionComponent {
  constructor(@Optional() public parent: LandingPageViewComponent) {}
}
