import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoggerService } from '../logger/logger.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StreakService {
  dailyQuotaProgressKey = 'dailyQuotaProgress';
  dailyQuotaStartDateKey = 'dailyQuotaStartDate';
  streakDaysKey = 'streakDays';
  numberOfAnswersKey = 'numberOfAnswers';
  dailyQuotaTarget = environment.dailyTarget;

  dailyQuotaProgress: number; // Also the number of the correct answers
  dailyQuotaStartDate: number;
  streakDays: number;
  numberOfAnswers: number;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      this.dailyQuotaProgress = await this.storage.get(this.dailyQuotaProgressKey);
      this.dailyQuotaStartDate = await this.storage.get(this.dailyQuotaStartDateKey);
      this.numberOfAnswers = await this.storage.get(this.numberOfAnswersKey);
      this.streakDays = await this.storage.get(this.streakDaysKey);
      await this.checkDailyTargetStatus();
    } catch (ex) {
      LoggerService.error('Get Streak failed', ex);
    }
  }

  getCurrentDailyTarget() {
    return this.dailyQuotaProgress;
  }

  getDailyQuotaStartDate() {
    return this.dailyQuotaStartDate;
  }

  getNumberOfAnswers() {
    return this.numberOfAnswers;
  }

  async setDailyQuotaStartDate() {
    this.dailyQuotaStartDate = this.secondsSinceEpoch(this.getToday());
    this.storage.set(this.dailyQuotaStartDateKey, this.dailyQuotaStartDate);
  }

  setNumberOfAnswers(value) {
    this.numberOfAnswers = value;
    this.storage.set(this.numberOfAnswersKey, this.numberOfAnswers);
  }

  // Increment the daily target
  async addToDailyQuotaProgress(value): Promise<number> {
    // if (this.dailyQuotaProgress === 0) {
    //   this.resetDailyProgress();
    // }
    this.dailyQuotaProgress = this.dailyQuotaProgress + value;
    this.storage.set(this.dailyQuotaProgressKey, this.dailyQuotaProgress);
    await this.checkDailyTargetStatus();
    if (this.isDailyTargetReached()) { this.addStreakDay(); }
    return this.dailyQuotaProgress;
  }

  isDailyTargetReached() {
    return this.dailyQuotaProgress === this.dailyQuotaTarget;
  }

  // Check if the daily target is reached/expired and also check the current streak status
  checkDailyTargetStatus() {
    let dayPassed;
    let moreThank2daysPassed;
    let dailyTargetReached;

    if (this.dayPassed(this.getDailyQuotaStartDate())) { dayPassed = true; }
    if (this.moreThan2DaysPassed(this.getDailyQuotaStartDate())) { moreThank2daysPassed = true; }

    if (this.dailyQuotaProgress >= this.dailyQuotaTarget) { dailyTargetReached = true; }


    if (dayPassed) {
      this.resetDailyProgress();
    }
    if (dayPassed && !dailyTargetReached || moreThank2daysPassed) {
      this.resetStreak();
    }
    if (dayPassed && dailyTargetReached) {
      this.setDailyQuotaStartDate();
    }
  }

  resetDailyProgress() {
    this.dailyQuotaProgress = 0;
    this.numberOfAnswers = 0;
    this.storage.set(this.dailyQuotaProgressKey, this.dailyQuotaProgress);
    this.storage.set(this.numberOfAnswersKey, this.numberOfAnswers);
    this.setDailyQuotaStartDate();
  }

  resetStreak() {
    this.resetDailyProgress();
    this.streakDays = 0;
    this.storage.set(this.streakDaysKey, this.streakDays);
  }

  async addStreakDay() {
    this.streakDays = this.streakDays + 1;
    this.storage.set(this.streakDaysKey, this.streakDays);
  }

  private dayPassed(dailyTargetStartTime) {
    console.log('time passed',(this.secondsSinceEpoch(this.getToday()) - dailyTargetStartTime));
    if ((this.secondsSinceEpoch(this.getToday()) - dailyTargetStartTime) >= 60 * 60 * 24) {
      return true;
    }
    return false;
  }

  private moreThan2DaysPassed(dailyTargetStartTime) {
    if ((this.secondsSinceEpoch(this.getToday()) - dailyTargetStartTime) >= 60 * 60 * 48) {
      return true;
    }
    return false;
  }

  private secondsSinceEpoch(date) {
    return Math.floor(date / 1000);
  }

  private getToday() {
    return new Date();
  }

}
