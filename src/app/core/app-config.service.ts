///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppConfigService {
  static settings: IAppConfigSettings;

  constructor(private http: Http) {}

  load() {
    const jsonFile = 'assets/config.json';
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: Response) => {
          AppConfigService.settings = <IAppConfigSettings>response.json();
          resolve();
        })
        .catch((response: any) => {
          reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
        });
    });
  }
}

export interface IAppConfigSettings {
  dataProviders: any;
  authentication: any;
}
