import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit
{
  puntaje: number = 0;

  constructor()
  {
    console.log(this.puntaje);
  }

  sumarPuntos()
  {
    const botonSumar = document.querySelector("#botonSumar");
    if(botonSumar)
    {
      botonSumar.addEventListener("click", (evento) =>
        {
            evento.preventDefault();

            this.puntaje = this.puntaje + 50;
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

            this.puntaje = this.puntaje - 10;
        });
    }
  }

  ngOnInit()
  {
    this.sumarPuntos();
    this.restarPuntos();
  }

}
