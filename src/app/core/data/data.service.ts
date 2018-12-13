///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { EventEmitter } from '@angular/core';

import { Observable, BehaviorSubject, concat, from, throwError } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';

import { process, State } from '@progress/kendo-data-query';

import { ModelDataResult } from './model-data-result';
import { DataServiceInterface, DataServiceAction, DataServiceActionType, DataServiceActionDef } from './data-service.interface';
import { DataServiceConfig } from './data-service-config';
import { DataServiceEvent, DataServiceEventState } from './data-service.event';

export abstract class DataService<T> implements DataServiceInterface<T> {
  public readonly dataChanges = new BehaviorSubject<ModelDataResult<T>>(null);
  public readonly errors = new BehaviorSubject<Error>(null);
  public readonly events = new EventEmitter<DataServiceEvent>();
  public pendingData: boolean;

  public get state(): State {
    return this.internalState;
  }

  protected actions: { [key: string]: DataServiceActionDef } = {};
  protected dataResult: ModelDataResult<T>;
  protected internalState: State;
  protected shouldFetch = true;

  constructor(protected config: DataServiceConfig, protected initialState: State = {}) {
    this.defineDefaultActions();

    this.events.subscribe(event => {
      if (event.action === DataServiceAction.read) {
        this.pendingData = event.state === DataServiceEventState.inProgress;
      }
    });
  }

  public fetchedData(): ModelDataResult<T> {
    return this.dataResult;
  }

  public reset(): void {
    this.dataResult = null;
  }

  public read(state?: State): void {
    if (state) {
      this.internalState = state;
    } else {
      this.internalState = this.initialState;
    }

    if (!this.config.serverOperations && this.dataResult && this.dataResult.data.length) {
      const currentData: ModelDataResult<T> = process(this.dataResult.data, this.state);
      this.dataChanges.next(currentData);
    } else if (this.shouldFetch) {
      this.executeAction(DataServiceAction.read, this.state);
    }
  }

  public create(item: any): void {
    this.executeAction(DataServiceAction.create, item);
  }

  public update(item: any): void {
    this.executeAction(DataServiceAction.update, item);
  }

  public remove(item: any): void {
    this.executeAction(DataServiceAction.remove, item);
  }

  public batch(deletedItems: any[], createdItems: any[], updatedItems: any[]): void {
    this.executeAction(DataServiceAction.batch, { deletedItems, updatedItems, createdItems });
  }

  public createModel(): T {
    return this.config.createModel();
  }

  public defineAction(actionType: DataServiceActionType, action: DataServiceActionDef) {
    this.actions[actionType] = action;
  }

  public executeAction(actionType: DataServiceActionType, param): void {
    try {
      const actionDef: DataServiceActionDef = this.getAction(actionType);

      this.events.emit({
        action: actionType,
        state: DataServiceEventState.inProgress
      });

      actionDef.action(param).subscribe(
        () => {
          this.events.emit({
            action: actionType,
            state: DataServiceEventState.done
          });

          if (actionDef.refetchData) {
            this.reset();
            this.read(this.state);
          }
        },
        (err: Error) => {
          this.events.emit({
            action: actionType,
            state: DataServiceEventState.failed
          });

          this.handleError(err);
        }
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  protected getAction(actionType: DataServiceActionType) {
    const actionDef: DataServiceActionDef = this.actions[actionType];

    if (!actionDef) {
      throw new Error(`Action is not defined: ${actionType}!`);
    }

    return actionDef;
  }

  protected defineDefaultActions() {
    this.defineReadAction();
    this.defineBatchAction();
  }

  protected mapData(data: any[]): T[] {
    if (this.config.mapData) {
      return data.map(item => this.config.mapData(item));
    }

    return data;
  }

  protected handleError(err: Error) {
    this.errors.next(err);
  }

  protected abstract fetchData(state: State): Observable<any>;

  private defineReadAction() {
    this.defineAction(DataServiceAction.read, {
      action: state => {
        this.shouldFetch = false;

        return this.fetchData(this.config.serverOperations ? state : {}).pipe(
          tap(data => {
            this.dataResult = data;

            if (!this.config.serverOperations) {
              data = process(data.data, this.state);
            }

            this.dataChanges.next(data);
            this.shouldFetch = true;
          }),
          catchError(err => {
            this.dataChanges.next(this.dataResult || { data: [], total: 0 });
            this.shouldFetch = true;
            return throwError(err);
          })
        );
      },
      refetchData: false
    });
  }

  private defineBatchAction() {
    this.defineAction(DataServiceAction.batch, {
      action: changes =>
        concat(
          this.executeBatchByActionType(DataServiceAction.remove, changes.deletedItems),
          this.executeBatchByActionType(DataServiceAction.update, changes.updatedItems),
          this.executeBatchByActionType(DataServiceAction.create, changes.createdItems)
        ),
      refetchData: true
    });
  }

  private executeBatchByActionType(actionType: DataServiceActionType, items: any[]) {
    const actionDef: DataServiceActionDef = this.getAction(actionType);
    return from(items).pipe(concatMap(item => actionDef.action(item)));
  }
}
