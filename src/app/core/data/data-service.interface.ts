///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { EventEmitter } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { State } from '@progress/kendo-data-query';

import { ModelDataResult } from './model-data-result';
import { DataServiceEvent } from './data-service.event';

export enum DataServiceAction {
  'read' = 'read',
  'create' = 'create',
  'update' = 'update',
  'remove' = 'remove',
  'batch' = 'batch'
}
export type DataServiceActionType = DataServiceAction | string;

export interface DataServiceActionDef {
  action: (param) => Observable<any>;
  refetchData: boolean;
}

export interface DataServiceInterface<T> {
  dataChanges: BehaviorSubject<ModelDataResult<T>>;
  errors: BehaviorSubject<Error>;
  events: EventEmitter<DataServiceEvent>;
  fetchedData(): ModelDataResult<T>;
  reset(): void;
  read(state?: State): void;
  create(item: any): void;
  update(item: any): void;
  remove(item: any): void;
  batch(deletedItems: any[], createdItems: any[], updatedItems: any[]): void;
  createModel(): T;
}
