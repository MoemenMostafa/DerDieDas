import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndingsPageRoutingModule } from './endings-routing.module';

import { EndingsPage } from './endings.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndingsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EndingsPage]
})
export class EndingsPageModule {}
