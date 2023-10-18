import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PistaJuegoComponent } from './pista-juego/pista-juego.component';
import { MostrarFotoComponent } from './mostrar-foto/mostrar-foto.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { TemporizadorComponent } from './temporizador/temporizador.component';

@NgModule({
  declarations: [
    AppComponent,
    PistaJuegoComponent,
    MostrarFotoComponent,
    PuntajeComponent,
    TemporizadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
