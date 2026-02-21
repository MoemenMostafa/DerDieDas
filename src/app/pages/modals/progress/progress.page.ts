import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StreakService } from 'app/providers/streak/streak.service';
import { WordsService } from 'app/providers/words/words.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  totalWordsProgress;

  constructor(
    private streakService: StreakService,
    private modalCtrl: ModalController,
    private wordService: WordsService
  ) { }

  async ngOnInit() {
    this.totalWordsProgress = await this.getWordsProgress();
  }

  dismiss(restart) {
    this.modalCtrl.dismiss(restart);
  }


  public getProgress() {
    return (this.streakService.getCurrentDailyTarget() / this.streakService.dailyQuotaTarget) * 100;
  }

  public getStreakDays() {
    return this.streakService.streakDays;
  }

  private async getWordsProgress() {
    return await this.wordService.getTotalWordsProgress();
  }
}
