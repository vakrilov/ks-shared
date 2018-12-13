///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isAndroid } from 'platform';
import { config } from '../config.tns';
import { NavigationService } from '../services/navigation.service.tns';

@Component({
  selector: 'tabs',
  moduleId: module.id,
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {
  constructor(private navigationService: NavigationService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.navigationService.navigate([{ outlets: config.routes.tabsOutlets }], { relativeTo: this.activatedRoute });
  }

  onTabViewLoaded({ object: tabView }) {
    if (isAndroid) {
      return;
    }

    tabView.eachChild(child => {
      const tabBarItem = child.__controller.tabBarItem;
      tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: -14 };
    });
  }
}
