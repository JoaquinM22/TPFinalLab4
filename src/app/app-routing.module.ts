import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PistaJuegoComponent } from './components/game-components/pista-juego/pista-juego.component';

const routes: Routes = [
  {path: 'game', component:PistaJuegoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
