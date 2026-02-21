import { Component, Input, OnInit } from '@angular/core';
import { StreakService } from 'app/providers/streak/streak.service';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss'],
})
export class StreakComponent implements OnInit {
  @Input() showProgressBar = false;
  @Input() showIcons = false;
  @Input() onDailyProgressClick: () => void;
  @Input() onTotalProgressClick: () => void;


  constructor(private streakService: StreakService) { }

  ngOnInit() {
  }

  public getCurrentDailyTarget() {
    return this.streakService.getCurrentDailyTarget();
  }

  public getDailyTargetLimit() {
    return this.streakService.dailyQuotaTarget;
  }
  public getStreakDays() {
    return this.streakService.streakDays;
  }

  // async isCelebrateStreak() {
  //   return await this.streakService.isCelebrateStreak();
  // }

  getStreakPrecent() {
    return Math.round(this.getCurrentDailyTarget() / this.getDailyTargetLimit() * 100);
  }

}
