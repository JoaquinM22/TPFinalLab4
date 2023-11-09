import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PistaJuegoComponent } from './components/game-components/pista-juego/pista-juego.component';
import { MostrarFotoComponent } from './components/game-components/mostrar-foto/mostrar-foto.component';
import { TemporizadorComponent } from './components/game-components/temporizador/temporizador.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RankingComponent } from './ranking/ranking.component';
import { PasarDatosAPIService } from './servicios/pasar-datos-api.service';
import { LoadingComponent } from './components/pantallas/loading/loading.component';
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
    LoadingComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PasarDatosAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
