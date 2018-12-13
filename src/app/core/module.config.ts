///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '@progress/kendo-angular-l10n';

import { DataProviderService } from './data/data-provider.service';
import { KinveyDataServiceFactory } from './data/kinvey-data-service-factory';
import { InMemoryDataStoreService } from './data/in-memory-data-store.service';
import { LocalDataServiceFactory } from './data/local-data-service-factory';

import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { TranslationsProvider } from './translations.provider';
import { RoleService } from './auth/role.service';
import { AuthenticationService } from './auth/authentication.service';
import { AUTHENTICATION_PROVIDER_FACTORIES } from './auth/authentication-provider-factory.interface';
import { AuthenticationProviderFactory } from './auth/authentication-provider-factory';
import { AuthenticationGuardService } from './auth/authentication-guard.service';
import { AuthorizationService } from './auth/authorization.service';
import { AuthorizationGuardService } from './auth/authorization-guard.service';
import { httpInterceptorProviders } from './http-interceptors.config';
import { NotificationService } from './notification/notification.service';
import { environment } from '../../environments/environment';

export function authenticationFactory() {
  return environment.getAuthentication();
}

export function windowFactory(): any {
  return window;
}

export const config: NgModule = {
  imports: [HttpClientModule],
  providers: [
    { provide: 'Window', useFactory: windowFactory },
    DataProviderService,
    KinveyDataServiceFactory,
    InMemoryDataStoreService,
    LocalDataServiceFactory,
    LocalStorageService,
    SessionStorageService,
    RoleService,
    TranslationsProvider,
    {
      provide: MessageService,
      useClass: TranslationsProvider
    },
    {
      provide: 'AuthenticationConfig',
      useFactory: authenticationFactory
    },
    AuthenticationService,
    {
      provide: AUTHENTICATION_PROVIDER_FACTORIES,
      useClass: AuthenticationProviderFactory,
      multi: true
    },
    AuthenticationGuardService,
    AuthorizationService,
    AuthorizationGuardService,
    NotificationService,
    httpInterceptorProviders
  ]
};
