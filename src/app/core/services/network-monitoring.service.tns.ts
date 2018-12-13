///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Connectivity from 'tns-core-modules/connectivity';

@Injectable()
export class NetworkMonitoringService {
  public isOnline: boolean;
  private subject: BehaviorSubject<boolean>;

  constructor(private zone: NgZone) {
    this.init();
  }

  get connectionObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }

  private init() {
    this.isOnline = this.getOnlineStatus(Connectivity.getConnectionType());
    this.subject = new BehaviorSubject(this.isOnline);
    Connectivity.startMonitoring(connectionType => {
      this.isOnline = this.getOnlineStatus(connectionType);
      this.subject.next(this.isOnline);
    });
  }

  private getOnlineStatus(connectionType: number): boolean {
    return connectionType === Connectivity.connectionType.wifi || connectionType === Connectivity.connectionType.mobile;
  }
}
