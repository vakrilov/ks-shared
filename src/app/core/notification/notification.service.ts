///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Injectable } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';

import { Notification } from '../notification/notification';

@Injectable()
export class NotificationService {
  private notificationsSource: Subject<Notification> = new Subject<Notification>();
  private notifications: Observable<Notification> = this.notificationsSource.asObservable();

  /**
   * Triggers the notification
   */
  public notify(notification: Notification): void {
    this.notificationsSource.next(notification);
  }

  /**
   * Subscribes to notification events
   */
  public subscribe(callback: (notification: Notification) => void): Subscription {
    return this.notifications.subscribe(callback);
  }
}
