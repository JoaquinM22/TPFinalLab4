import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PistaJuegoComponent } from './components/game-components/pista-juego/pista-juego.component';
import { MostrarFotoComponent } from './components/game-components/mostrar-foto/mostrar-foto.component';
import { TemporizadorComponent } from './components/game-components/temporizador/temporizador.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RankingPageComponent } from './paginas/ranking-page/ranking-page.component';
import { LandingPageComponent } from './paginas/landing-page/landing-page.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { MenuPageComponent } from './paginas/menu-page/menu-page.component';
import { GamePageComponent } from './paginas/game-page/game-page.component';
import { PasarDatosAPIService } from './servicios/pasar-datos-api.service';
import { LoadingComponent } from './components/loading/loading.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PistaJuegoComponent,
    MostrarFotoComponent,
    TemporizadorComponent,
    LoginUsuarioComponent,
    MenuInicioComponent,
    MenuPrincipalComponent,
    RankingComponent,
    RankingPageComponent,
    LandingPageComponent,
    LoginPageComponent,
    MenuPageComponent,
    GamePageComponent,
    LoadingComponent,
    PerfilUsuarioComponent
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
export class AppModule { 
}
