import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PistaJuegoComponent } from './pista-juego/pista-juego.component';
import { MostrarFotoComponent } from './mostrar-foto/mostrar-foto.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { TemporizadorComponent } from './temporizador/temporizador.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { RankingComponent } from './ranking/ranking.component';
import { RankingPageComponent } from './paginas/ranking-page/ranking-page.component';
import { LandingPageComponent } from './paginas/landing-page/landing-page.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { MenuPageComponent } from './paginas/menu-page/menu-page.component';
import { GamePageComponent } from './paginas/game-page/game-page.component';
import { PasarDatosAPIService } from './servicios/pasar-datos-api.service';

@NgModule({
  declarations: [
    AppComponent,
    PistaJuegoComponent,
    MostrarFotoComponent,
    PuntajeComponent,
    TemporizadorComponent,
    LoginUsuarioComponent,
    MenuInicioComponent,
    MenuPrincipalComponent,
    RankingComponent,
    RankingPageComponent,
    LandingPageComponent,
    LoginPageComponent,
    MenuPageComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [PasarDatosAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
