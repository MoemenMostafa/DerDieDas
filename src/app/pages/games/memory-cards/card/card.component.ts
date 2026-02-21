import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild('card', {read: ElementRef}) card: ElementRef;
  @ViewChild('front', {read: ElementRef}) front: ElementRef;
  @ViewChild('back', {read: ElementRef}) back: ElementRef;
  @ViewChild('articleElm', {read: ElementRef}) articleElm: ElementRef;
  isFlipped = false;
  isMoving = false;
  isSolved = false;
  cardFrontColor = '#ffffff';
  cardBackColor = '#ff7448';

  // tslint:disable-next-line: no-input-rename
  // @Input('front-text') frontText: string;
  // tslint:disable-next-line: no-input-rename
  @Input('back-text') backText: string;
  @Input() article: string;
  @Input() clickable: boolean;

  @Output() getComponentEvent = new EventEmitter();


  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
    requestAnimationFrame(
      () => {
        this.card.nativeElement.style.backgroundColor = this.cardFrontColor;
        this.front.nativeElement.style.color = this.cardBackColor;
      }
      );
  }

  ionViewDidLoad(){
  }

  public async flip(isClick){
    this.getComponentEvent.emit(this);

    const animation1 = this.animationCtrl.create()
    .addElement(this.card?.nativeElement)
    .duration(200)
    .fromTo('transform', 'rotateY(0deg)', 'rotateY(90deg)');

    const animation2 = this.animationCtrl.create()
    .addElement(this.card?.nativeElement)
    .duration(200)
    .to('transform', 'rotateY(180deg)');

    const animation3 = this.animationCtrl.create()
    .addElement(this.card?.nativeElement)
    .duration(200)
    .to('transform', 'rotateY(90deg)');

    const animation4 = this.animationCtrl.create()
    .addElement(this.card?.nativeElement)
    .duration(200)
    .to('transform', 'rotateY(0deg)');

    if (!this.isMoving) {
      if (!this.isFlipped && this.clickable){
        this.isMoving = true;
        this.isFlipped = true;
        await animation1.play();
        this.front.nativeElement.style.display = 'none';
        this.back.nativeElement.style.display = 'block';
        this.card.nativeElement.style.backgroundColor = this.cardBackColor;
        this.isMoving = false;
        return animation2.play();
      } else if (!isClick){
        this.isMoving = true;
        this.isFlipped = false;
        await animation3.play();
        this.front.nativeElement.style.display = 'block';
        this.back.nativeElement.style.display = 'none';
        this.card.nativeElement.style.backgroundColor = this.cardFrontColor;
        this.isMoving = false;
        return animation4.play();
      }
    }
  }

  public toggleSolved(value = !this.isSolved){
    this.isSolved = value;
    if (value === true){
      setTimeout(
        () => {
          this.animationCtrl.create()
          .addElement(this.articleElm?.nativeElement)
          .duration(500)
          .fromTo('opacity', 0, 1)
          .play();
        }, 500
      );
    }

  }

}
