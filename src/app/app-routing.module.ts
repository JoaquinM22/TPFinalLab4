import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PistaJuegoComponent } from './components/game-components/pista-juego/pista-juego.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {path: 'menu', component:MenuPageComponent},
  {path: 'landing', component:LandingPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'game', component:PistaJuegoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
