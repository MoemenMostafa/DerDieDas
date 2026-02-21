import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-endings',
  templateUrl: './endings.page.html',
  styleUrls: ['./endings.page.scss'],
})
export class EndingsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;


  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ionViewDidEnter() {
    if (this.navParams){
      const article = this.navParams.get('article');
      if (article) {
        const anchor = document.getElementById(article);
        this.content.scrollByPoint(0, anchor.getBoundingClientRect().top - 60, 0);
      }
    }
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
