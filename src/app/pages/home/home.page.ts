import { Component, ViewChild, ElementRef } from '@angular/core';
import { WordsService, iWord } from '../../providers/words/words.service';
import { AnimationController, LoadingController, ModalController } from '@ionic/angular';
import confetti from 'canvas-confetti';
import { AudioService } from '../../providers/audio/audio.service';
import { TextToSpeechService } from '../../providers/text-to-speech/text-to-speech.service';

import { SuccessPage } from '../modals/success/success.page';
import { AnimationService } from '../../providers/animation/animation.service';
import { AnalyticsService, Event } from '../../providers/analytics/analytics.service';
import { AdsService } from 'app/providers/ads/ads.service';
import { LoggerService } from 'app/providers/logger/logger.service';
import { InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { StreakService } from 'app/providers/streak/streak.service';
import { environment } from 'environments/environment';
import { ProgressPage } from '../modals/progress/progress.page';
import { Router } from '@angular/router';
import { EndingsPage } from '../endings/endings.page';
import { PushService } from 'app/providers/push/push.service';
import { FirebaseCrashlytics } from '@awesome-cordova-plugins/firebase-crashlytics/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('card', { read: ElementRef }) card: ElementRef;
  @ViewChild('ddd', { read: ElementRef }) ddd: ElementRef;
  @ViewChild('next', { read: ElementRef }) next: ElementRef;

  word: iWord;
  idArray: Array<any>;
  index;
  isAnswer = false;
  showAnswers = true;
  imgPath = WordsService.getImgPath();
  adFrequency = environment.adFrequency;
  // score: number;
  isAnswerCorrectFirstTime = false;
  completeShowed = false;


  constructor(
    private wordsService: WordsService,
    private animationCtrl: AnimationController,
    private audioService: AudioService,
    private textToSpeach: TextToSpeechService,
    private analytics: AnalyticsService,
    private modalController: ModalController,
    private adsService: AdsService,
    private loadingController: LoadingController,
    private streakService: StreakService,
    private pushService: PushService,
    private firebaseCrashlytics: FirebaseCrashlytics
  ) {
    this.analytics.trackEvent(Event.page, { name: 'home' });
  }

  ionViewWillEnter() {
    this.start();
  }

  async start() {
    this.moveButtons(true, this.ddd?.nativeElement);
    this.idArray = this.wordsService.getRandomIndexArray();
    this.reset();
  }

  async getNextWord() {
    this.isAnswerCorrectFirstTime = true;
    if (this.index % this.adFrequency === 0 && this.index > 0) {
      // await this.openStreakPage();
      await this.showInterstitialAd();
    }
    if (this.streakService.isDailyTargetReached() && !this.completeShowed && this.streakService.getNumberOfAnswers() > 1) {
      this.complete(async (result) => {
        if (result.data) {
          this.reset();
        } else {
          this.start();
        }
      });
    } else {
      this.cardAnimationNext(1);
      await this.moveButtons(true, this.next?.nativeElement);
      this.word = await this.wordsService.getWord(this.idArray[this.index]);
      this.index++;
      this.isAnswer = false;

      await this.cardAnimationNext(2);

      this.showAnswers = true;
      await this.moveButtons(false, this.ddd?.nativeElement);
      this.speak(this.word.de);
    }
  }

  async showInterstitialAd() {
    (await this.loadingController.create()).present();
    try {
      const res = await this.adsService.interstitial();
      if (res) {
        this.loadingController.dismiss();
      }
    } catch (ex) {
      this.loadingController.dismiss();
    }
  }

  speak(text) {
    this.textToSpeach.speak(text);
  }

  reset() {
    this.index = 0;
    // this.score = 0;
    this.getNextWord();
  }

  private async cardAnimationNext(step): Promise<void> {
    const duration = 400;
    const animation = [];
    animation[1] = this.animationCtrl.create()
      .addElement(this.card?.nativeElement)
      .duration(duration)
      .easing('ease')
      .keyframes([
        { offset: 0, transform: 'translateX(0px) translateY(-50%)' },
        { offset: 1, transform: 'translateX(-200%) translateY(-50%)' },
      ]);
    animation[2] = this.animationCtrl.create()
      .addElement(this.card?.nativeElement)
      .duration(duration)
      .easing('ease')
      .keyframes([
        { offset: 0, transform: 'translateX(200%) translateY(-50%)' },
        { offset: 1, transform: 'translateX(0px) translateY(-50%)' },
      ]);
    return animation[step].play();
  }

  private async cardAnimationWrong(): Promise<void> {
    const animation = this.animationCtrl.create()
      .addElement(this.card?.nativeElement)
      .duration(200)
      .iterations(3)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg) translateY(-50%)' },
        { offset: 0.2, transform: 'rotate(-2deg) translateY(-50%)' },
        { offset: 0.4, transform: 'rotate(2deg) translateY(-50%)' },
        { offset: 0.6, transform: 'rotate(-2deg) translateY(-50%)' },
        { offset: 0.8, transform: 'rotate(2deg) translateY(-50%)' },
        { offset: 1, transform: 'rotate(0deg) translateY(-50%)' },
      ]);
    return animation.play();
  }

  private async moveButtons(out, element): Promise<void> {
    let start = 'translateY(250%)';
    let end = 'translateY(0px)';
    if (out) {
      start = 'translateY(0px)';
      end = 'translateY(250%)';
    }

    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(200)
      // .fromTo('transform', start, end);
      .keyframes([
        { offset: 0, transform: start },
        { offset: 1, transform: end },
      ]);

    return animation.play();
  }

  checkAnswer(article) {
    if (article === this.word.article) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  }

  private async correctAnswer() {
    await this.moveButtons(true, this.ddd?.nativeElement);
    this.isAnswer = true;
    this.showAnswers = false;
    await this.moveButtons(false, this.next?.nativeElement);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    this.audioService.success();
    this.analytics.trackEvent(Event.answer, { answer: 'correct', word: this.word.de, article: this.word.article });
    if (this.isAnswerCorrectFirstTime) { 
      await this.streakService.addToDailyQuotaProgress(1);
      this.wordsService.saveWordProgress(this.idArray[this.index - 1], true);
    }
    this.streakService.setNumberOfAnswers(this.streakService.getNumberOfAnswers() + 1);
  }

  private wrongAnswer() {
    if (this.isAnswerCorrectFirstTime) {
      this.isAnswerCorrectFirstTime = false;
      this.analytics.trackEvent(Event.answer, { answer: 'wrong', word: this.word.de, article: this.word.article });
      this.wordsService.saveWordProgress(this.idArray[this.index - 1], false);
    }
    this.cardAnimationWrong();
    this.audioService.wrong();

  }

  private async complete(onDismiss) {
    this.audioService.complete();
    this.pushService.setActiveStreak();
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'small',
      enterAnimation: AnimationService.enterAnimation,
      leaveAnimation: AnimationService.leaveAnimation,
      componentProps: { score: this.streakService.getCurrentDailyTarget(), size: this.streakService.getNumberOfAnswers() }
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    modal.onDidDismiss().then((result) => onDismiss(result));
    this.completeShowed = true;
    return modal.present();
  }

  async openEndingModal(article) {
    const modal = await this.modalController.create({
      component: EndingsPage,
      enterAnimation: AnimationService.enterAnimation,
      leaveAnimation: AnimationService.leaveAnimation,
      componentProps: { article }
    });
    return modal.present();
  }

  openStreakPage = async (): Promise<any>  => {
    const modal = await this.modalController.create({
      component: SuccessPage,
      enterAnimation: AnimationService.enterAnimation,
      leaveAnimation: AnimationService.leaveAnimation,
      cssClass: 'small',
      componentProps: {
        score: this.streakService.getCurrentDailyTarget(),
        size: this.streakService.getNumberOfAnswers(),
        showAgainButton: false },
    });
    return modal.present();
  }

  openProgressPage = async (): Promise<any>  => {
    const modal = await this.modalController.create({
      component: ProgressPage,
      enterAnimation: AnimationService.enterAnimation,
      leaveAnimation: AnimationService.leaveAnimation,
      cssClass: 'small',
    });
    return modal.present();
  }

}
