///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}
const promise = platformBrowserDynamic().bootstrapModule(AppModule);
promise.catch(err => console.log(err));
const bootstrap = () => promise;

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('Hot Module Replacement is not enabled for webpack');
  }
} else {
  bootstrap();
}
