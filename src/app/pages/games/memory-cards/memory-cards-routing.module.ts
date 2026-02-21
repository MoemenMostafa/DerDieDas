import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoryCardsPage } from './memory-cards.page';

const routes: Routes = [
  {
    path: '',
    component: MemoryCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryCardsPageRoutingModule {}
