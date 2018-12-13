///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnInit, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { RouterExtensions, NSEmptyOutletComponent } from 'nativescript-angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'kb-app-layout',
  templateUrl: './app-layout.view.component.tns.html',
  styleUrls: ['./app-layout.view.component.tns.css']
})
export class AppLayoutViewBaseComponent implements  AfterViewInit, OnDestroy {
  public nav: RouterExtensions;
  public activeRoute: ActivatedRoute;

  constructor(public injector: Injector) {
    this.nav = injector.get(RouterExtensions);
    this.activeRoute = injector.get(ActivatedRoute);
  }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void { }
}
