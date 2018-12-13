///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Directive, OnInit } from '@angular/core';
import { Page } from 'ui/page/page';

@Directive({
  selector: '[showNavBar]'
})
export class ShowNavBarDirective implements OnInit {
  constructor(private page: Page) {}

  ngOnInit() {
    this.page.actionBarHidden = false;
  }
}
