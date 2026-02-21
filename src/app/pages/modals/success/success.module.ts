import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessPageRoutingModule } from './success-routing.module';

import { SuccessPage } from './success.page';
import { TranslateModule } from '@ngx-translate/core';
import { StreakModule } from 'app/components/streak/streak.module';

import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessPageRoutingModule,
    StreakModule,
    TranslateModule.forChild(),
    NgCircleProgressModule.forRoot()
  ],
  declarations: [SuccessPage]
})
export class SuccessPageModule {}
