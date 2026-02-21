import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

import { LoggerService } from '../logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() {
    this.getSupportedLanguages();
    this.getSupportedVoices();
    this.isLanguageSupported('de-DE');
  }

  async speak(text: string){
    return TextToSpeech.speak({
      // tslint:disable-next-line: object-literal-shorthand
      text: text,
      lang: 'de-DE',
      rate: 0.9
    }).then(
      res => LoggerService.log('TextToSpeechService: Speak -> Success', res),
      err => LoggerService.error('TextToSpeechService: Speak -> faild', err),
    );
  }

  stop(){
    TextToSpeech.stop();
  }

  async getSupportedLanguages() {
    const languages = await TextToSpeech.getSupportedLanguages();
    LoggerService.log('TextToSpeechService languages', languages);
  }

  async getSupportedVoices() {
    const voices = await TextToSpeech.getSupportedVoices();
    LoggerService.log('TextToSpeechService voices:', voices);
  }

  async isLanguageSupported(lang: string) {
    const isSupported = await TextToSpeech.isLanguageSupported({ lang });
    LoggerService.log('TextToSpeechService isSupported ' + lang, isSupported);
  }
}
