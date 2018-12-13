///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, concat, empty, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { DATA_PROVIDER_HEADER } from '../constants';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dataProvider = request.headers.get(DATA_PROVIDER_HEADER);

    if (!dataProvider) {
      return next.handle(request);
    }

    const newRequest = request.clone({
      headers: request.headers.delete(DATA_PROVIDER_HEADER)
    });

    return this.authenticateRequest(dataProvider, newRequest, next);
  }

  private authenticateRequest(dataProvider: string, request: HttpRequest<any>, next: HttpHandler) {
    return this.authenticationService.authenticateRequest(dataProvider, request).pipe(
      concatMap(authenticatedRequest => next.handle(authenticatedRequest)),
      catchError((err, retry) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          if (this.authenticationService.supportsRefresh(dataProvider)) {
            return concat(this.authenticationService.silentRefresh(dataProvider), retry);
          } else {
            this.authenticationService.authenticateDataProvider(dataProvider);
          }

          return empty();
        }

        return throwError(err);
      })
    );
  }
}
