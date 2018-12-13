///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { KinveyServiceConfig } from '../../core/data/kinvey-service-config';
import { DefaultDataProviderOrder } from './order.model';

export function getOrderConfig(): KinveyServiceConfig {
  return {
    dataProviderName: 'DefaultDataProvider',
    serverOperations: true,
    createModel: () => new DefaultDataProviderOrder(),
    collection: 'orders'
  };
}
