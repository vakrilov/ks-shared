///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { InjectionToken } from '@angular/core';

import { AuthenticationProviderInterface } from './authentication-provider.interface';

export interface AuthenticationProviderFactoryInterface {
  createAuthProvider(type: string, settings: any): AuthenticationProviderInterface;
}

export const AUTHENTICATION_PROVIDER_FACTORIES = new InjectionToken<AuthenticationProviderFactoryInterface[]>(
  'AuthenticationProviderFactories'
);
