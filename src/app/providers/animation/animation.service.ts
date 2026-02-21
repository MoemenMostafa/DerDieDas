import { Injectable } from '@angular/core';
import { createAnimation } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  public static enterAnimation(baseEl: any) {
    const backdropAnimation = createAnimation()
      // tslint:disable-next-line: no-non-null-assertion
      .addElement( baseEl.querySelector('ion-backdrop')! )
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(baseEl.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' }
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  public static leaveAnimation(baseEl: any) {
    return AnimationService.enterAnimation(baseEl).direction('reverse');
  }
}
