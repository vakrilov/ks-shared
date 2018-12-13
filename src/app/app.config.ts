///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ApplicationModule } from './modules/application/application.module';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutViewModule } from './modules/application/app-layout/app-layout.view.module';
import { AppConfigService } from './core/app-config.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

export const config = {
  declarations: [AppComponent, AuthCallbackComponent],
  imports: [
    AppLayoutViewModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    HttpModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    ApplicationModule,
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
};
