///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { KinveyServiceConfig } from '../../core/data/kinvey-service-config';
import { DefaultDataProviderCustomer } from './customer.model';

export function getCustomerConfig(): KinveyServiceConfig {
  return {
    dataProviderName: 'DefaultDataProvider',
    serverOperations: true,
    createModel: () => new DefaultDataProviderCustomer(),
    collection: 'customers'
  };
}
