import { Injectable } from '@angular/core';
import { AppCenterAnalytics, StringMap } from '@ionic-native/app-center-analytics/ngx';
import { Platform } from '@ionic/angular';
import { LoggerService } from '../logger/logger.service';
import { FirebaseAnalytics } from '@awesome-cordova-plugins/firebase-analytics/ngx';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private appCenterAnalytics: AppCenterAnalytics,
    private platform: Platform,
    private firebaseAnalytics: FirebaseAnalytics,
    ) { }

  public async trackEvent(event: Event, data: StringMap) {
    // if (!this.platform.is('cordova')) { return; }


    // this.firebaseAnalytics.logEvent(event, data)
    //   .then((res: any) => LoggerService.log('AnalyticsService: trackEvent -> ' + event, data))
    //   .catch((error: any) => LoggerService.error('AnalyticsService: trackEvent error', error));

    this.appCenterAnalytics.setEnabled(true).then(() => {
      this.appCenterAnalytics.trackEvent(event, data).then(() => {
          LoggerService.log('AnalyticsService: trackEvent -> ' + event, data);
      });
  });
  }
}

export const enum Event {
  page = 'page',
  app = 'app',
  answer = 'answer',
  success = 'success'
}
