///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export class InMemoryCollection {
  constructor(private dataRef: any) {}

  public read(): any {
    return JSON.parse(JSON.stringify(this.dataRef));
  }
}

@Injectable()
export class InMemoryDataStoreService {
  private store;

  constructor(private http: HttpClient) {}

  public getCollection(owner: string, name: string): Observable<InMemoryCollection> {
    return this.getStore().pipe(
      map(store => {
        if (!store.hasOwnProperty(owner)) {
          throw new Error(`In-memory data store does not contain any data for ${owner}!`);
        }

        const ownerCollections = store[owner];

        if (!ownerCollections.hasOwnProperty(name)) {
          throw new Error(`${owner} does not have ${name} collection!`);
        }

        return new InMemoryCollection(ownerCollections[name]);
      })
    );
  }

  private getStore(): Observable<any> {
    if (this.store) {
      return of(this.store);
    }

    return this.http.get('assets/local-db.json').pipe(
      tap(db => {
        this.store = db;
      })
    );
  }
}
