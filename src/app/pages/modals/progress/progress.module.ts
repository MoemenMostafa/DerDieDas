import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { TranslateModule } from '@ngx-translate/core';
import { StreakModule } from 'app/components/streak/streak.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressPageRoutingModule,
    StreakModule,
    TranslateModule.forChild(),
    NgCircleProgressModule.forRoot()
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
