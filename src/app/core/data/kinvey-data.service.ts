///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { State, FilterDescriptor, CompositeFilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';

import { ModelDataResult } from './model-data-result';
import { HttpDataService } from './http-data.service';
import { KinveyServiceConfig } from './kinvey-service-config';
import { DataProviderService } from './data-provider.service';

const ID_FIELD = '_id';

export class KinveyDataService<T> extends HttpDataService<T> {
  constructor(protected config: KinveyServiceConfig, http: HttpClient, dataProviderService: DataProviderService, state: State) {
    super(config, http, dataProviderService, state);
  }

  protected getRequestParams(state: State): { [param: string]: string | string[] } {
    const params = super.getRequestParams(state);

    if (typeof state.filter !== 'undefined') {
      params['query'] = this.buildQuery(state.filter);
    }

    if (typeof state.skip !== 'undefined') {
      params['skip'] = state.skip.toString();
    }

    if (typeof state.take !== 'undefined') {
      params['limit'] = state.take.toString();
    }

    if (typeof state.sort !== 'undefined') {
      const sortDef = {};

      state.sort.forEach(item => {
        sortDef[item.field] = item.dir && item.dir === 'desc' ? -1 : 1;
      });

      params['sort'] = JSON.stringify(sortDef);
    }

    return params;
  }

  protected readRequest(state: State): Observable<any> {
    state = state || {};

    const collectionResource = this.getCollectionResource();

    const doRead = () => {
      const url = this.getAbsoluteUrl({ url: collectionResource });

      return this.request('GET', url, {
        params: this.getRequestParams(state),
        observe: 'response'
      });
    };

    if (this.config.serverOperations) {
      const url = this.getAbsoluteUrl({ url: `${collectionResource}/_count` });

      return this.request('GET', url, {
        params: this.getRequestParams({ filter: state.filter }),
        observe: 'response'
      }).pipe(
        switchMap(countResponse =>
          doRead().pipe(
            map(response =>
              response.clone({
                body: {
                  data: response.body,
                  total: (countResponse.body as any).count
                }
              })
            )
          )
        )
      );
    }

    return doRead();
  }

  protected createRequest(data: any): Observable<any> {
    const url = this.getAbsoluteUrl({
      url: this.getCollectionResource()
    });

    return this.request('POST', url, {
      body: data,
      observe: 'response'
    });
  }

  protected updateRequest(data: any): Observable<any> {
    const url = this.getAbsoluteUrl({
      url: `${this.getCollectionResource()}/${data[ID_FIELD]}`
    });

    return this.request('PUT', url, {
      body: data,
      observe: 'response'
    });
  }

  protected removeRequest(data: any): Observable<any> {
    const url = this.getAbsoluteUrl({
      url: `${this.getCollectionResource()}/${data[ID_FIELD]}`
    });

    return this.request('DELETE', url, { observe: 'response' });
  }

  protected parseResponse(response: HttpResponse<Object>): ModelDataResult<T> {
    const result = new ModelDataResult<T>();

    if (this.config.serverOperations) {
      const body: any = response.body;
      result.data = this.mapData(body.data as any[]);
      result.total = body.total;
    } else {
      result.data = this.mapData(response.body as any[]);
      result.total = result.data.length;
    }

    return result;
  }

  protected getCollectionResource(): string {
    const dataProvider = this.dataProviderService.get(this.config.dataProviderName);
    return `appdata/${dataProvider.appKey}/${this.config.collection}`;
  }

  protected buildQuery(filter: CompositeFilterDescriptor): string {
    return JSON.stringify(this.buildCompositeFilter(filter));
  }

  protected buildCompositeFilter(filter: CompositeFilterDescriptor): object {
    if (filter.filters.length === 0) {
      return {};
    }

    return {
      ['$' + filter.logic]: filter.filters.map(item => {
        if (isCompositeFilterDescriptor(item)) {
          return this.buildCompositeFilter(item as CompositeFilterDescriptor);
        }

        return this.buildFilter(item as FilterDescriptor);
      })
    };
  }

  protected buildFilter(filter: FilterDescriptor): object {
    if (!filter.field && typeof filter.field !== 'string') {
      return {};
    }

    const field = filter.field as string;
    let value: any;

    switch (filter.operator) {
      case 'eq':
        value = filter.value;
        break;

      case 'neq':
        value = {
          $ne: filter.value
        };
        break;

      case 'isnull':
        value = null;
        break;

      case 'isnotnull':
        value = {
          $ne: null
        };
        break;

      case 'lt':
      case 'lte':
      case 'gt':
      case 'gte':
        value = {
          ['$' + filter.operator]: filter.value
        };
        break;

      case 'startswith':
        value = {
          $regex: '^' + this.escapeRegExp(filter.value)
        };
        break;

      case 'endswith':
        value = {
          $regex: '^.*' + this.escapeRegExp(filter.value) + '$'
        };
        break;

      case 'contains':
        value = {
          $regex: '^.*' + this.escapeRegExp(filter.value) + '.*'
        };
        break;

      case 'doesnotcontain':
        value = {
          $regex: '^((?!' + this.escapeRegExp(filter.value) + ').)*$'
        };
        break;

      case 'isempty':
        value = '';
        break;

      case 'isnotempty':
        value = {
          $ne: ''
        };
        break;

      default:
        break;
    }

    return {
      [field]: value
    };
  }

  escapeRegExp(regEx: string): string {
    return regEx.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
