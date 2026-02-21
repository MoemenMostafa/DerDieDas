import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { NativeAudio } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private platform: Platform) {
    if (!this.platform.is('cordova')) {return; }
    NativeAudio.preloadSimple({
      assetPath: 'success',
      assetId: 'success_audio',
    });
    NativeAudio.preloadSimple({
      assetPath: 'wrong',
      assetId: 'wrong_audio',
    });
    NativeAudio.preloadSimple({
      assetPath: 'complete',
      assetId: 'complete_audio',
    });
  }


  success(){
    if (!this.platform.is('cordova')) {return; }
    NativeAudio.play({
      assetId: 'success_audio',
    });
  }

  wrong(){
    if (!this.platform.is('cordova')) {return; }
    NativeAudio.play({
      assetId: 'wrong_audio',
    });
  }

  complete(){
    if (!this.platform.is('cordova')) {return; }
    NativeAudio.play({
      assetId: 'complete_audio',
    });
  }

}
