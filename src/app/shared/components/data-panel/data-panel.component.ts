///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormArray } from '@angular/forms';

import { DialogService, DialogRef, DialogAction } from '@progress/kendo-angular-dialog';

import { DataServiceInterface } from '../../../core/data/data-service.interface';
import { DataServiceEventState } from '../../../core/data/data-service.event';

@Component({
  selector: 'kb-data-panel',
  templateUrl: './data-panel.component.html'
})
export class KbDataPanelComponent implements OnInit {
  private _model: any;

  @Input()
  public config: any;

  @Input()
  set model(value: any) {
    this._model = value;
    this.editDataModel = { ...this._model };
  }

  get model() {
    return this._model;
  }

  @Input()
  public dataService: DataServiceInterface<any>;
  @Input()
  public canEdit: boolean;

  @Output()
  public insert: EventEmitter<any> = new EventEmitter();
  @Output()
  public cancel: EventEmitter<any> = new EventEmitter();

  public viewFormArray: FormArray = new FormArray([]);
  public insertInProcess: boolean;
  public updateInProcess: boolean;
  public editDataModel: any;

  constructor(private dialogService: DialogService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.serviceEventsChanges();
  }

  public onEdit() {
    this.updateInProcess = true;
    this.cdr.detectChanges();
  }

  public onSave(): void {
    if (this.insertInProcess) {
      this.dataService.create(this.editDataModel);
    } else {
      this.dataService.update(this.editDataModel);
    }
  }

  public onCancel(): void {
    const cancelState = {
      insertInProcess: this.insertInProcess,
      updateInProcess: this.updateInProcess
    };

    this.closeEditing();
    this.cancel.emit(cancelState);
  }

  public onInsert(): void {
    this.insertInProcess = true;
    this.updateInProcess = false;
    this.editDataModel = this.dataService.createModel();
    this.insert.emit();
  }

  public onDelete(): void {
    if (this.config.confirmDelete) {
      const dialog = this.showDeleteConfirmation();

      dialog.result.subscribe((result: DialogAction) => {
        if (result.primary) {
          this.deleteAction();
        }
      });
    } else {
      this.deleteAction();
    }
  }

  public showDeleteConfirmation(): DialogRef {
    return this.dialogService.open({
      title: 'Confirm delete',
      content: 'Are you sure you want to delete this record?',
      actions: [{ text: 'No' }, { text: 'Yes', primary: true }],
      width: 450,
      height: 200,
      minWidth: 250
    });
  }

  protected deleteAction() {
    this.dataService.remove(this._model);
  }

  protected serviceEventsChanges(): void {
    this.dataService.events.subscribe(event => {
      if (event.state === DataServiceEventState.done) {
        this.closeEditing();
      }
    });
  }

  protected closeEditing() {
    this.updateInProcess = this.insertInProcess = false;
  }
}
