///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Subscription } from 'rxjs';

import { NotificationService } from './notification.service';
import { Notification } from './notification';
import { KbToNotificationIconPipe } from './to-notification-icon.pipe';

@Component({
  selector: 'kb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('notificationAnimation', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => open', animate('330ms ease-in')),
      transition('open => void, open => close', animate('330ms ease-out'))
    ])
  ]
})
export class NotificationComponent implements OnDestroy {
  @Input()
  public notifier: string;
  private subscription: Subscription;
  public notifications: any[] = [];
  private isClose = false;

  constructor(public notificationService: NotificationService) {
    this.subscription = notificationService.subscribe(notification =>
      this.notifications.unshift(Object.assign({ state: 'open' }, notification))
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onClose(n: any, i: number): void {
    n.state = 'close';
    this.notifications.splice(i, 1);
  }

  public animationDone(e: any, index: number, notification: Notification): void {
    if (notification.timeout === 0) {
      return;
    }

    if (e.fromState === 'void' && e.toState === 'open') {
      setTimeout(() => {
        for (let i = 0; i < this.notifications.length; i++) {
          if (this.notifications[i] === notification) {
            this.notifications.splice(i, 1);
            break;
          }
        }
      }, notification.timeout);
    }
  }
}
