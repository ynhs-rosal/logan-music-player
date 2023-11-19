import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { authGuard } from './route-guards/auth-guard.sevice';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
  },
  {
    path: 'logan-music',
    component: MusicPlayerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
