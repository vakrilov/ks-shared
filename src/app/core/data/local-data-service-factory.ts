///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';

import { State } from '@progress/kendo-data-query';

import { DataService } from './data.service';
import { LocalDataService } from './local-data.service';
import { LocalDataServiceConfig } from './local-data-service-config';
import { DataServiceFactory } from './data-service-factory';
import { InMemoryDataStoreService } from './in-memory-data-store.service';

@Injectable()
export class LocalDataServiceFactory extends DataServiceFactory {
  constructor(protected dataStore: InMemoryDataStoreService) {
    super();
  }

  public getService<T>(config: LocalDataServiceConfig, state?: State): DataService<T> {
    return new LocalDataService<T>(config, this.dataStore, state);
  }
}
