import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WordsService } from '../../providers/words/words.service';
import { AudioService } from '../../providers/audio/audio.service';
import { HeaderModule } from '../../components/header/header.module';
import { AuthService } from '../../providers/auth/auth.service';
import { SuccessPageModule } from '../modals/success/success.module';
import { TranslateModule } from '@ngx-translate/core';
import { StreakModule } from 'app/components/streak/streak.module';
import { ProgressPageModule } from '../modals/progress/progress.module';
import { EndingPipe } from 'app/pipes/ending/ending.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    SuccessPageModule,
    ProgressPageModule,
    StreakModule,
    TranslateModule.forChild()
  ],
  declarations: [HomePage, EndingPipe],
  providers: [WordsService, AudioService, AuthService]
})
export class HomePageModule {}
