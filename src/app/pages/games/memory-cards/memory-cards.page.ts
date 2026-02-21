import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { iWords, WordsService } from '../../../providers/words/words.service';
import { CardComponent } from './card/card.component';
import { SuccessPage } from '../../modals/success/success.page';
import confetti from 'canvas-confetti';
import { AnimationService } from '../../../providers/animation/animation.service';
import { AudioService } from '../../../providers/audio/audio.service';
import { AnalyticsService, Event } from '../../../providers/analytics/analytics.service';



@Component({
  selector: 'app-memory-cards',
  templateUrl: './memory-cards.page.html',
  styleUrls: ['./memory-cards.page.scss'],
})
export class MemoryCardsPage implements OnInit {
  coupleFlipBackTime = 1000;
  numberOfCards = 12;

  wordsSet: iWords = [];
  cardsSelected: CardComponent[] = [];
  clickable = true;

  solvedArray = [];


  constructor(
    private wordsService: WordsService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private audioService: AudioService,
    private analytics: AnalyticsService
    ) {
    this.analytics.trackEvent(Event.page, {name: 'memory cards'});
  }

  ngOnInit() {
    const indexArray = this.wordsService.randomizeArray(
      this.wordsService.getRandomIndexArrayForGames(0, this.numberOfCards),
      this.numberOfCards
    );
    for (const [i, v] of indexArray.entries()){
      this.wordsSet[i] = this.wordsService.getWord(v);
    }
  }

  cacheSelectedCard(card){
    if (this.clickable && this.isCardFlippable(card)) {
      this.cardsSelected.push(card);
    }
  }

  private isCardFlippable(card){
    const noCardSelectedYet = typeof this.cardsSelected[0] === 'undefined';
    const equalToFirstCardSelected = this.cardsSelected[0] === card;
    const isAlreadySolved = this.solvedArray.find(solvedCard => card === solvedCard);

    if ((noCardSelectedYet || !equalToFirstCardSelected) && !isAlreadySolved) {
      return true;
    }
    return false;
  }

  cardSelected() {
    if (this.cardsSelected.length >= 2 && this.clickable === true) {
      this.clickable = false;

      if (this.cardsSelected[0].article !== this.cardsSelected[1].article) {
        this.cardNotMatch();
      } else {
        this.cardMatch();
      }

    }
  }

  private cardNotMatch(){
    setTimeout(() => {
      this.cardsSelected[0].flip(false);
      this.cardsSelected[1].flip(false);
      this.cardsSelected = [];
    }, this.coupleFlipBackTime);
    setTimeout(() => this.clickable = true, this.coupleFlipBackTime);
  }

  private cardMatch(){
    this.audioService.success();
    this.addCardToSolvedArray(this.cardsSelected[0], this.cardsSelected[1]);
    this.cardsSelected[0].toggleSolved();
    this.cardsSelected[1].toggleSolved();
    this.cardsSelected = [];
    setTimeout(() => this.clickable = true, this.coupleFlipBackTime);
    if (this.checkIfComplete()){
      setTimeout(() => this.complete(), this.coupleFlipBackTime);
    }
  }

  private checkIfComplete(){
    if (this.solvedArray.length >= this.numberOfCards) {
      return true;
    }
    return false;
  }

  private async complete(){
    this.audioService.complete();
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass: 'small',
      enterAnimation: AnimationService.enterAnimation,
      leaveAnimation: AnimationService.leaveAnimation
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    modal.onDidDismiss().then((result) => {
      if (result){
        this.reset();
      } else {
        this.navCtrl.back();
      }
    });
    return modal.present();
  }

  private addCardToSolvedArray(card1, card2){
    this.solvedArray.push(card1, card2);
    console.log(this.solvedArray);
  }

  reset(){
    for (let x = 0; x < this.solvedArray.length; x++ ) {
      this.solvedArray[x].flip(false);
      this.solvedArray[x].toggleSolved();
    }
    this.cardsSelected = [];
    this.clickable = true;
    this.solvedArray = [];
  }


}
