///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, Injector, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { State } from '@progress/kendo-data-query';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { KbGridComponent } from '../../../shared/components/grid/grid.component';
import { ModelDataResult } from '../../../core/data/model-data-result';

import { DataService } from '../../../core/data/data.service';
import { DataServiceFactory } from '../../../core/data/data-service-factory';
import { KinveyDataServiceFactory } from '../../../core/data/kinvey-data-service-factory';
import { DefaultDataProviderCustomer } from '../../../data/default-data-provider/customer.model';
import { getCustomerConfig } from '../../../data/default-data-provider/customer.config';

import { NotificationService } from './../../../core/notification/notification.service';
import { Notification } from './../../../core/notification/notification';

@Component({
  templateUrl: './grid.view.component.html',
  styleUrls: ['./grid.view.component.css']
})
export class GridViewBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('grid')
  public $grid: KbGridComponent;

  public $kinveyDataServiceFactory: KinveyDataServiceFactory;
  public $dataServices: { [key: string]: DataService<any> };
  public $dataServicesData: { [key: string]: Observable<any> };
  public $dataServicesResult: { [key: string]: BehaviorSubject<ModelDataResult<any>> };
  public $notificationService: NotificationService;

  public $dataServicesState: { [key: string]: State } = {
    Customers: {
      skip: 0,
      take: 20
    }
  };

  public $dataModels: any = {
    CustomersModel: {}
  };

  public $config: any = {
    title: '&lt;Title&gt;',
    titleKey: 'modules.views.views.grid.title',
    components: {
      grid: {
        filterable: false,
        groupable: false,
        pageable: this.$dataServicesState['Customers'].take !== undefined,
        reorderable: false,
        resizable: false,
        sortable: false,
        commandColumnWidth: 220,
        editing: {
          mode: 'ReadOnly'
        },
        confirmDelete: true,
        events: {
          onRowSelect: e => {
            this['onRowSelect'](e);
          }
        }
      }
    }
  };

  constructor(public injector: Injector) {
    this.$kinveyDataServiceFactory = this.injector.get(KinveyDataServiceFactory);
    this.$notificationService = this.injector.get(NotificationService);

    const dsConfig = this.getDataServicesConfig();
    this.$dataServices = {
      Customers: this.$kinveyDataServiceFactory.getService<DefaultDataProviderCustomer>(
        dsConfig['Customers'],
        this.$dataServicesState['Customers']
      )
    };

    this.$dataServicesData = {
      Customers: this.getDataChanges('Customers')
    };

    this.$dataServicesResult = {
      Customers: this.getDataResult('Customers')
    };
  }

  public ngOnInit(): void {
    this['onInit']();

    for (const dataSourceName of Object.keys(this.$dataServices)) {
      this.read(dataSourceName);
      this.dataServiceErrors(dataSourceName);
    }
  }

  public ngAfterViewInit(): void {
    this['onShow']();
  }

  public ngOnDestroy(): void {
    this['onHide']();
  }

  public read(dataSourceName): void {
    this.$dataServices[dataSourceName].read();
  }

  public getDataChanges(dataSourceName): Observable<any[]> {
    const dataService = this.$dataServices[dataSourceName];
    return dataService.dataChanges.pipe(map(response => (response ? response.data : [])));
  }

  public getDataResult(dataSourceName): BehaviorSubject<ModelDataResult<any>> {
    return this.$dataServices[dataSourceName].dataChanges;
  }

  public dataServiceErrors(dataSourceName): void {
    this.$dataServices[dataSourceName].errors.subscribe((err: any) => {
      if (err) {
        const message = (err.error && err.error.message) || err.message;
        this.$notificationService.notify(new Notification(`<ul><li>${message}<li></ul>`, 'error', 10000));
      }
    });
  }

  protected getDataServicesConfig() {
    const config = {
      Customers: getCustomerConfig()
    };

    return config;
  }
}
