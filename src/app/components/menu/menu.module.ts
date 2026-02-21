import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { AppRoutingModule } from '../../../app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    TranslateModule.forChild()
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
