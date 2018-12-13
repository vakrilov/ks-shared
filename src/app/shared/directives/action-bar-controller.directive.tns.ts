///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Directive, OnInit, ElementRef } from '@angular/core';
import { ActionItem, NavigationButton } from 'tns-core-modules/ui/action-bar/action-bar';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Label } from 'tns-core-modules/ui/label';
import { ActivatedRoute } from '@angular/router';
import { isAndroid } from 'platform';
import { getRootView } from 'application';
import { Page } from 'ui/page';
import { NavigationService } from '../../core/services/navigation.service.tns';
import { config } from '../../core/config.tns';

@Directive({
  selector: 'ActionBar'
})
export class ActionBarController implements OnInit {
  constructor(
    private el: ElementRef,
    private page: Page,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.page.actionBarHidden = false;

    if (config.routes.sideDrawer.length && !this.navigationService.canGoBackToPreviousPage()) {
      this.addSideButton();
    }

    this.addTitle();
  }

  private addTitle() {
    const label = new Label();
    label.text = this.activatedRoute.component['title'];
    this.el.nativeElement.titleView = label;
  }

  private addSideButton() {
    let btn: any;
    const actionBar = this.el.nativeElement;

    if (isAndroid) {
      btn = new NavigationButton();
      btn.android.systemIcon = 'ic_menu_moreoverflow_normal_holo_dark';
      actionBar.navigationButton = btn;
    } else {
      btn = new ActionItem();
      btn.text = String.fromCharCode(0x2630);
      btn.ios.position = 'left';
      actionBar.actionItems.addItem(btn);
    }

    btn.on('tap', () => (<RadSideDrawer>getRootView()).showDrawer());
  }
}
