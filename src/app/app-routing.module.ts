import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './pages/home/home.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [HomeGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'memory-cards',
    loadChildren: () => import('./pages/games/memory-cards/memory-cards.module').then( m => m.MemoryCardsPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/modals/success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/modals/progress/progress.module').then( m => m.ProgressPageModule)
  },
  {
    path: 'endings',
    loadChildren: () => import('./pages/endings/endings.module').then( m => m.EndingsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
