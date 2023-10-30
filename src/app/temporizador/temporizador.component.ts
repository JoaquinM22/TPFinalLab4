import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})
export class TemporizadorComponent implements OnInit
{

 @Input() minutosString: String = '00';
 @Input() segundosString: String = '00';
  
  constructor()
  {
  }

  // Crea una función que inicializa el temporizador
  iniciarTemporizador(minutos: number, segundos: number)
  {
    // Asigna los minutos y los segundos al temporizador
    let tiempoTotal = minutos * 60000 + segundos * 1000;

    // Crea una función que se ejecutará cada segundo
    const actualizarTemporizador = () =>
    {

      // Reduce el tiempo transcurrido en 1000 milisegundos
      tiempoTotal -= 1000;

      // Obtén el tiempo transcurrido en minutos y segundos
      let minutos = Math.floor(tiempoTotal / 60000);
      let segundos = tiempoTotal % 60000;

      // Convierte los minutos y los segundos a cadenas
      this.minutosString = minutos.toString();

      if(segundos % 1000 == 0)
      {
        this.segundosString = (segundos/1000).toString();
      }

      // Añade un 0 a la izquierda de los segundos si es necesario
      if((segundos/1000) < 10)
      {
        this.segundosString = "0" + this.segundosString;
      }

      if(minutos < 10)
      {
        this.minutosString = "0" + this.minutosString;
      }

      // Actualiza el elemento DOM
      //document.getElementById("timer").innerHTML = minutosString + ":" + segundosString;
      console.log(this.minutosString + ":" + this.segundosString);

      // Si el tiempo es 0, detiene el temporizador
      if(minutos === 0 && segundos === 0)
      {
        console.log("Ya termino el Temporizador");
        clearInterval(intervalId);
      }
    }

    // Inicia el temporizador
    const intervalId = setInterval(actualizarTemporizador, 1000);
  }

  botonIniciar()
  {
    const botonIniciar = document.querySelector("#botonIniciar");
    if(botonIniciar)
    {
      botonIniciar.addEventListener("click", (evento) =>
        {
            evento.preventDefault();

            this.iniciarTemporizador(2, 45);
        });
    }
  }

  ngOnInit()
  {
    this.iniciarTemporizador(2, 45);
  }

}
