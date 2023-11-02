import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingPageComponent } from './paginas/ranking-page/ranking-page.component';
import { LandingPageComponent } from './paginas/landing-page/landing-page.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { MenuPageComponent } from './paginas/menu-page/menu-page.component';
import { GamePageComponent } from './paginas/game-page/game-page.component';

const routes: Routes = [
  {path: 'landing', component:LandingPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'menu', component:MenuPageComponent},
  {path: 'game', component:GamePageComponent},
  {path: 'ranking', component:RankingPageComponent},
  {path: '**', component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
