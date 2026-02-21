import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { LoggerService } from '../logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor(private oneSignal: OneSignal) { }

  init() {
    this.oneSignal.startInit('786bd1d0-8c95-4dda-a3cf-3f09d245f76f', '716584112189');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      // do something when notification is received
      LoggerService.info('notification is received', data);
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      LoggerService.info('notification is opened', data);
    });

    this.oneSignal.endInit();
  }

  sendTag(key, value) {
    this.oneSignal.sendTag(key, value);
  }

  setActiveStreak() {
    this.oneSignal.deleteTag('activeStreak');
    this.sendTag('activeStreak', Math.floor( Date.now() / 1000));
  }
}
