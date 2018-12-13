///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from '@progress/kendo-data-query';

import { DataService } from './data.service';
import { LocalDataServiceConfig } from './local-data-service-config';
import { InMemoryDataStoreService, InMemoryCollection } from './in-memory-data-store.service';

export class LocalDataService<T> extends DataService<T> {
  protected collection: InMemoryCollection;

  constructor(protected config: LocalDataServiceConfig, private dataStore: InMemoryDataStoreService, state: State) {
    super(config, state);
  }

  protected fetchData(state: any): Observable<any> {
    return this.getCollection().pipe(
      map(collection => {
        const data = collection.read();

        return {
          data: this.mapData(data),
          total: data.length
        };
      })
    );
  }

  protected getCollection(): Observable<InMemoryCollection> {
    if (this.collection) {
      return of(this.collection);
    }

    return this.dataStore.getCollection(this.config.dataProviderName, this.config.collectionName);
  }
}
