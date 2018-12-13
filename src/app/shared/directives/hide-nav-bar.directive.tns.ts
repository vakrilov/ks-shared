///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Directive, OnInit } from '@angular/core';
import { Page } from 'ui/page/page';

@Directive({
  selector: '[hideNavBar]'
})
export class HideNavBarDirective implements OnInit {
  constructor(private page: Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
