import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent
{
  puntos: number = 200;

  constructor()
  {
  }

  sumarPuntos()
  {
    const botonSumar = document.querySelector("#botonSumar");
    if(botonSumar)
    {
      botonSumar.addEventListener("click", (evento) =>
        {
            evento.preventDefault();

            this.puntos = this.puntos + 50;
        });
    }
  }

  restarPuntos()
  {
    const botonRestar = document.querySelector("#botonRestar");
    if(botonRestar)
    {
      botonRestar.addEventListener("click", (evento) =>
        {
            evento.preventDefault();

            this.puntos = this.puntos - 10;
        });
    }
  } 
}
