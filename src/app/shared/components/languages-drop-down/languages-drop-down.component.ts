///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, Input, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsProvider } from '../../../core/translations.provider';

@Component({
  selector: 'kb-languages-drop-down',
  templateUrl: './languages-drop-down.component.html'
})
export class KbLanguagesDropDownComponent implements OnInit {
  @ViewChild(DropDownListComponent)
  public kendoComponent: DropDownListComponent;
  @Input()
  public id: string;
  @Input()
  public name: string;
  @Input()
  public title: string;
  @Input()
  public config: any;
  @Output()
  public valueChange: EventEmitter<any> = new EventEmitter();
  @Output()
  public selectionChange: EventEmitter<any> = new EventEmitter();
  private languageKey: string;

  public constructor(private translationsProvider: TranslationsProvider, private translateService: TranslateService) {}

  public ngOnInit(): void {
    this.languageKey = this.translationsProvider.getLanguage();
    this.setCulture();
  }

  public changeHandler(event: any): void {
    this.translationsProvider.setLanguage(this.languageKey);
    this.translateService.use(this.languageKey);

    this.setCulture();

    this.valueChange.emit(event);
  }

  public selectionHandler(event: any): void {
    this.selectionChange.emit(event);
  }

  private setCulture(): void {
    const selectedLanguage = this.config.data.find(x => x.key === this.languageKey);
    this.translationsProvider.setCulture(selectedLanguage.culture);
  }
}
