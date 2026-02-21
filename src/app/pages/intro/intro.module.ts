import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [IntroPage]
})
export class IntroPageModule {}
