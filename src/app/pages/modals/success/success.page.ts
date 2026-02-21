import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StreakService } from 'app/providers/streak/streak.service';
import { AnalyticsService, Event } from '../../../providers/analytics/analytics.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  score = 0;
  size = 0;
  @Input() showAgainButton = true;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private analytics: AnalyticsService,
    private streakService: StreakService
  ) { }

  ngOnInit() {
    this.score = this.navParams.get('score');
    this.size = this.navParams.get('size');
    this.analytics.trackEvent(Event.success, { complete: this.score + '/' + this.size });

  }

  dismiss(restart) {
    this.modalCtrl.dismiss(restart);
  }

  getStarsArray(): any[] {
    const stars = Math.round((this.score * 3) / this.size);
    return stars ? Array(stars) : Array(0);
  }

  getEmptyStarsArray(): any[] {

    const stars =  Array(3 - this.getStarsArray().length);
    return stars;
  }

  public getProgress() {
    return (this.streakService.getCurrentDailyTarget() / this.streakService.dailyQuotaTarget) * 100;
  }

}
