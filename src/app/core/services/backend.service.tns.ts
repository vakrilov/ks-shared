///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { Observable, ConnectableObservable, Subject, Subscription, of, from, merge } from 'rxjs';
import { flatMap, last, catchError, shareReplay, first, publish, filter, map, tap, debounceTime } from 'rxjs/operators';
import { Kinvey, InvalidCredentialsError, NoActiveUserError } from 'kinvey-nativescript-sdk';
import { setTimeout } from 'tns-core-modules/timer';
import { config } from '../config.tns';
import { NavigationService } from './navigation.service.tns';
import { NetworkMonitoringService } from './network-monitoring.service.tns';

@Injectable()
export class BackendService {
  private loggedInChangedObservable: Observable<boolean>;
  private findResult: { [key: string]: Subject<any> } = {};
  private syncCollection: { [key: string]: Subscription } = {};

  constructor(private navigationService: NavigationService, private networkMonitoringService: NetworkMonitoringService) {
    Kinvey.init(<Kinvey.ClientConfig>config.backendConfig);
  }

  setLoggedInChangedObservable(value: Observable<boolean>) {
    this.loggedInChangedObservable = value;
  }

  login(username: string, password: string) {
    return Kinvey.User.login(username, password);
  }

  loginWithMIC(redirectUri: string, authorizationGrant?: Kinvey.AuthorizationGrant, options?: Kinvey.RequestOptions) {
    return Kinvey.User.loginWithMIC(redirectUri, authorizationGrant, options);
  }

  logout() {
    return Kinvey.User.logout().catch(e => this.handlePromiseError(e));
  }

  signup(username: string, password: string, email: string) {
    return Kinvey.User.signup({ username, password, email }).catch(e => this.handlePromiseError(e));
  }

  getActiveUser() {
    return Kinvey.User.getActiveUser();
  }

  resetPassword(email: string, options?: Kinvey.RequestOptions) {
    return Kinvey.User.resetPassword(email, options).catch(e => this.handlePromiseError(e));
  }

  save(collectionName: string, item: any, dataStoreType?: Kinvey.DataStoreType, options?: Kinvey.RequestOptions) {
    const savePromise = this.getDataStoreCollection(collectionName, dataStoreType)
      .save(item, options)
      .then(() => this.refreshFind(collectionName))
      .catch(e => this.handlePromiseError(e));

    return this.networkMonitoringService.isOnline
      ? savePromise
      : Promise.resolve().then(() => {
          setTimeout(() => this.refreshFind(collectionName), 200);
        });
  }

  refresh(collectionName: string, items: Observable<any>): Promise<void> {
    if (!this.findResult[collectionName] || !items) {
      return Promise.resolve();
    }

    const connectableObservable = items.pipe(publish()) as ConnectableObservable<any>;
    connectableObservable.connect();
    this.refreshFind(collectionName);

    return connectableObservable.pipe(first()).toPromise();
  }

  filesUpload(file: {}, metadata?: Kinvey.FileMetadata, options?: Kinvey.RequestOptions) {
    return Kinvey.Files.upload(file, metadata, options).catch(e => this.handlePromiseError(e));
  }

  find(
    collectionName: string,
    dataStoreType?: Kinvey.DataStoreType,
    query?: Kinvey.Query,
    options?: Kinvey.RequestOptions,
    loadMore: Observable<any> = of(),
    queryFilter: Observable<any> = of()
  ) {
    query = query || new Kinvey.Query({ limit: 20 });
    let items = [];

    const resetPagging = of(query.skip).pipe(
      tap(initialSkip => {
        items = [];
        query.skip = initialSkip;
      })
    );

    const filter = queryFilter.pipe(
      tap(filter => {
        query.filter = filter;
      })
    );

    const observableResult = of({}).pipe(
      flatMap(() => {
        if (items.length) query.skip += query.limit;
        return this.getDataStoreCollection(collectionName, dataStoreType)
          .find(query, options)
          .pipe(
            this.handleObservableError(),
            last(value => !!value)
          );
      }),
      map(newItems => {
        const uniqueIds = new Set(items.map(i => i._id));
        items.push(...newItems.filter(i => !uniqueIds.has(i._id)));
        return items;
      })
    );

    return this.getQueryObservable(observableResult, collectionName, loadMore, resetPagging, filter);
  }

  findById(collectionName: string, id: string, dataStoreType?: Kinvey.DataStoreType, options?: Kinvey.RequestOptions) {
    const observableResult = this.getDataStoreCollection(collectionName, dataStoreType).findById(id, options);
    return this.getQueryObservable(observableResult, collectionName);
  }

  remove(collectionName: string, dataStoreType?: Kinvey.DataStoreType, query?: Kinvey.Query, options?: Kinvey.RequestOptions) {
    return this.getDataStoreCollection(collectionName, dataStoreType)
      .remove(query, options)
      .then(() => this.refreshFind(collectionName))
      .catch(e => this.handlePromiseError(e));
  }

  removeById(collectionName: string, id: string, dataStoreType?: Kinvey.DataStoreType, options?: Kinvey.RequestOptions) {
    return this.getDataStoreCollection(collectionName, dataStoreType)
      .removeById(id, options)
      .then(() => this.refreshFind(collectionName))
      .catch(e => this.handlePromiseError(e));
  }

  private getDataStoreCollection(collectionName, dataStoreType) {
    const dataStoreCollection = Kinvey.DataStore.collection(collectionName, dataStoreType);
    this.sync(collectionName, dataStoreCollection);
    return dataStoreCollection;
  }

  private refreshFind(collectionName) {
    if (this.findResult[collectionName]) {
      this.findResult[collectionName].next({});
    }
  }

  private sync(collectionName: string, dataStoreCollection: Kinvey.CacheStore<Kinvey.Entity>) {
    if (this.syncCollection[collectionName] || !dataStoreCollection.pendingSyncCount) return;

    this.syncCollection[collectionName] = this.networkMonitoringService.connectionObservable
      .pipe(
        filter(isOnline => isOnline),
        flatMap(() => from(dataStoreCollection.pendingSyncCount())),
        filter((count: any) => count > 0),
        flatMap(() => from(dataStoreCollection.sync()))
      )
      .subscribe(() => this.refreshFind(collectionName), e => !this.handleError(e) && console.error(e.toString()));
  }

  private getQueryObservable(observable: Observable<any>, collectionName: string, loadMore = of(), resetPagging = of(), filter = of()) {
    this.findResult[collectionName] = this.findResult[collectionName] || new Subject<any>();

    return merge(
      this.findResult[collectionName].pipe(flatMap(() => resetPagging)),
      this.loggedInChangedObservable,
      loadMore,
      filter.pipe(
        debounceTime(500),
        flatMap(() => resetPagging)
      )
    ).pipe(
      debounceTime(100),
      flatMap(
        () =>
          !!this.getActiveUser()
            ? observable.pipe(
                this.handleObservableError(),
                last(value => !!value)
              )
            : of(null)
      ),
      shareReplay(1)
    );
  }

  private handlePromiseError(error) {
    this.handleError(error);
    throw error;
  }

  private handleError(error) {
    if (error instanceof InvalidCredentialsError || error instanceof NoActiveUserError) {
      this.navigationService.navigate(['login'], { clearHistory: true });
      return true;
    }

    return false;
  }

  private handleObservableError = () =>
    catchError(e => {
      if (!this.handleError(e)) console.error(e.toString());
      return of(null);
    });
}
