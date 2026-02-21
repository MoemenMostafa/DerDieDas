import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EndingsPage } from 'app/pages/endings/endings.page';
import { AnimationService } from 'app/providers/animation/animation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  EndingsPage = EndingsPage;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModal(page){
    const modal = await this.modalController.create({
      component: page,
      enterAnimation: AnimationService.enterAnimation,
      leaveAnimation: AnimationService.leaveAnimation
    });
    return modal.present();
  }

}
