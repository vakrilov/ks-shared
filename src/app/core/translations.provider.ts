///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable, Inject } from '@angular/core';

import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { MessageService } from '@progress/kendo-angular-l10n';
import { IntlService, CldrIntlService } from '@progress/kendo-angular-intl';

import { LocalStorageService } from './local-storage.service';

const LANG_KEY = 'LANG';
const CULTURE_KEY = 'CULTURE';

@Injectable()
export class TranslationsProvider extends MessageService {
  public readonly localeChanges = new Subject<string>();

  constructor(private storageService: LocalStorageService, private translateService: TranslateService, private intlService: IntlService) {
    super();

    this.translateService.onLangChange.subscribe(event => this.notify());
  }

  public get(key: string): string {
    return this.translateService.instant(key);
  }

  public useDefaultLanguage(): void {
    const defaultLangKey = 'translations.default';
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(defaultLangKey);

    const currentLanguage = this.getLanguage() || defaultLangKey;
    this.setLanguage(currentLanguage);
    this.translateService.use(currentLanguage);
  }

  public getLanguage(): string {
    return this.storageService.getItem(LANG_KEY);
  }

  public setLanguage(value: string): void {
    this.storageService.setItem(LANG_KEY, value);
  }

  public getCulture(): string {
    return this.storageService.getItem(CULTURE_KEY);
  }

  public setCulture(value: string): void {
    (this.intlService as CldrIntlService).localeId = value;
    this.localeChanges.next(value);
    this.storageService.setItem(CULTURE_KEY, value);
  }
}
