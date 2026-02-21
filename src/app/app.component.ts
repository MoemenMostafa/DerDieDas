import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AnalyticsService, Event } from './providers/analytics/analytics.service';
import { App } from '@capacitor/app';
import { AdsService } from './providers/ads/ads.service';
import { LoggerService } from './providers/logger/logger.service';
import { PushService } from './providers/push/push.service';
import { FirebaseCrashlytics } from '@awesome-cordova-plugins/firebase-crashlytics/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private analytics: AnalyticsService,
    private adsService: AdsService,
    private pushService: PushService,
    private firebaseCrashlytics: FirebaseCrashlytics
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.initCrashlytics();
    this.initializeApp();
    this.initPush();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.analytics.trackEvent(Event.app, null);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initAds();
    });
  }

  async initAds() {
    try {
      await this.adsService.initialize();
      const size = await this.adsService.banner();
      if (size.height) {
        this.routerOutlet.nativeEl.style.height = `calc(100vh - ${size.height}px`;
      }
    } catch (ex) {
      LoggerService.error('Error init. ads', ex);
    }
  }

  initPush() {
    this.pushService.init();
  }

  initCrashlytics() {
    this.firebaseCrashlytics.initialise();
  }
}
