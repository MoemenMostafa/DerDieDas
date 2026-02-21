import { Injectable } from '@angular/core';
import {
  AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents,
  AdMobBannerSize, InterstitialAdPluginEvents, AdOptions, RewardAdPluginEvents, AdMobRewardItem,
  AdLoadInfo
} from '@capacitor-community/admob';

import { Platform } from '@ionic/angular';
import { environment } from 'environments/environment';

import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  adsEnabled = environment.adsEnabled;
  bannerSize;

  constructor(private platform: Platform) { }

  async initialize(): Promise<void> {
    if (!this.platform.is('cordova')) { return; }
    if (!this.adsEnabled) { return; }

    return AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['3910abaf-dbd0-4e5d-82d8-84373bef1464'],
      initializeForTesting: true,
    });
  }

  async banner(): Promise<AdMobBannerSize> {
    return new Promise(async (resolve, reject) => {

      if (!this.platform.is('cordova')) { return; }
      if (!this.adsEnabled) { return; }

      AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        // Subscribe Banner Event Listener
      });

      AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
        resolve (size);
      });

      const options: BannerAdOptions = {
        adId: 'ca-app-pub-5021705753578996/9144994484',
        adSize: BannerAdSize.SMART_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        // isTesting: true
        // npa: true
      };
      this.bannerSize = await AdMob.showBanner(options);
      return this.bannerSize;
    });
  }

  async interstitial(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!this.platform.is('cordova')) { resolve(true); }
      if (!this.adsEnabled) { resolve(true); }

      AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        // Subscribe prepared interstitial
      });
      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, async () => {
        resolve(InterstitialAdPluginEvents.Dismissed);
      });

      const options: AdOptions = {
        adId: 'ca-app-pub-5021705753578996/4427730719',
        // isTesting: true
        // npa: true
      };
      try {
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
      } catch (ex) {
        LoggerService.error('AdsService', ex);
      }

    });

  }

  async rewardVideo(): Promise<void> {
    if (!this.platform.is('cordova')) { return; }
    if (!this.adsEnabled) { return; }

    AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared rewardVideo
    });

    // tslint:disable-next-line: no-shadowed-variable
    AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
      // Subscribe user rewarded
      console.log(rewardItem);
    });

    const options: AdOptions = {
      adId: 'ca-app-pub-5021705753578996/6690646567',
      // isTesting: true
      // npa: true
    };
    await AdMob.prepareRewardVideoAd(options);
    const rewardItem = await AdMob.showRewardVideoAd();
  }

}
