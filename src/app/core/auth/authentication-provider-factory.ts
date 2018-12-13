///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable, Injector } from '@angular/core';

import { AuthenticationProviderFactoryInterface } from './authentication-provider-factory.interface';
import { AuthenticationProviderInterface } from './authentication-provider.interface';
import { KinveyAuthProvider } from './providers/kinvey-auth-provider';

@Injectable()
export class AuthenticationProviderFactory implements AuthenticationProviderFactoryInterface {
  constructor(private injector: Injector) {}

  createAuthProvider(type: string, settings: any): AuthenticationProviderInterface {
    switch (type) {
      case 'kinvey-auth':
        return new KinveyAuthProvider(settings, this.injector);

      default:
        break;
    }

    return null;
  }
}
