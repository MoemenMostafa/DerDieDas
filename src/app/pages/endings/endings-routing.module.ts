import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndingsPage } from './endings.page';

const routes: Routes = [
  {
    path: '',
    component: EndingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndingsPageRoutingModule {}
