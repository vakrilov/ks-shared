///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from '@progress/kendo-data-query';

import { DataServiceAction } from './data-service.interface';
import { DataService } from './data.service';
import { DataServiceConfig } from './data-service-config';
import { DataServiceRequest } from './data-service-request';
import { ModelDataResult } from './model-data-result';
import { DataProviderService } from './data-provider.service';
import { DATA_PROVIDER_HEADER } from '../constants';

export abstract class HttpDataService<T> extends DataService<T> {
  constructor(
    config: DataServiceConfig,
    protected http: HttpClient,
    protected dataProviderService: DataProviderService,
    initialState: State = {}
  ) {
    super(config, initialState);
  }

  protected fetchData(state: State): Observable<any> {
    return this.readRequest(state).pipe(map(response => this.parseResponse(response)));
  }

  protected defineDefaultActions() {
    super.defineDefaultActions();

    this.defineAction(DataServiceAction.create, {
      action: item => this.createRequest(item),
      refetchData: true
    });

    this.defineAction(DataServiceAction.update, {
      action: item => this.updateRequest(item),
      refetchData: true
    });

    this.defineAction(DataServiceAction.remove, {
      action: item => this.removeRequest(item),
      refetchData: true
    });
  }

  protected request(
    method: string,
    url: string,
    options: {
      body?: any;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      reportProgress?: boolean;
      observe: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<HttpResponse<Object>> {
    options.headers = options.headers || new HttpHeaders();

    if (options.headers instanceof HttpHeaders) {
      options.headers = options.headers.append(DATA_PROVIDER_HEADER, this.config.dataProviderName);
    } else {
      options.headers[DATA_PROVIDER_HEADER] = this.config.dataProviderName;
    }

    return this.http.request(method, url, options);
  }

  protected getAbsoluteUrl(request: DataServiceRequest): string {
    const dataProvider = this.dataProviderService.get(this.config.dataProviderName);
    let serviceUri = dataProvider ? dataProvider.serviceUri : '';
    serviceUri = serviceUri.replace(/[/]$/, '');

    let resourceUrl = Object.keys(request.routeParams || {}).reduce((prev, current) => {
      const regEx = new RegExp(':' + current, 'gi');
      return prev.replace(regEx, request.routeParams[current]);
    }, request.url);

    if (!resourceUrl.startsWith('/')) {
      resourceUrl = '/' + resourceUrl;
    }

    return `${serviceUri}${resourceUrl}`;
  }

  protected getRequestParams(state: State): { [param: string]: string | string[] } {
    return {};
  }

  protected abstract readRequest(state: State): Observable<HttpResponse<Object>>;
  protected abstract createRequest(data: any): Observable<any>;
  protected abstract updateRequest(data: any): Observable<any>;
  protected abstract removeRequest(data: any): Observable<any>;
  protected abstract parseResponse(response: HttpResponse<Object>): ModelDataResult<T>;
}
