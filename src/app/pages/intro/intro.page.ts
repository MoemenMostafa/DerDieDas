import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AnalyticsService, Event } from '../../providers/analytics/analytics.service';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private authService: AuthService, private navCtrl: NavController, private analytics: AnalyticsService) {
    this.analytics.trackEvent(Event.page, {name: 'intro'});
   }

  ngOnInit() {
  }

  start(){
    this.authService.setNotFirstLaunch();
    this.navCtrl.navigateRoot('home',);
  }

}
