import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StreakComponent } from './streak.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [StreakComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [StreakComponent]
})
export class StreakModule { }
