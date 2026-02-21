import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryCardsPageRoutingModule } from './memory-cards-routing.module';

import { MemoryCardsPage } from './memory-cards.page';
import { CardComponent } from './card/card.component';
import { WordsService } from '../../../providers/words/words.service';
import { SuccessPageModule } from '../../modals/success/success.module';
import { AnimationService } from '../../../providers/animation/animation.service';
import { HeaderModule } from '../../../components/header/header.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryCardsPageRoutingModule,
    SuccessPageModule,
    HeaderModule,
    TranslateModule.forChild()
  ],
  declarations: [MemoryCardsPage, CardComponent],
  entryComponents: [CardComponent],
  providers: [WordsService, AnimationService]
})
export class MemoryCardsPageModule {}
