import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';


//Le asigno el timepo que quiero que tenga el temporizador
enum valores
{
  minutos = 2,
  segundos = 30
}

@Component
({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})

export class TemporizadorComponent
{
  
  @Output() mensajeEnviado: EventEmitter<string> = new EventEmitter<string>();
  @Input() terminar: boolean = true;

  minutosString: String = '00';
  segundosString: String = '00';
  intervalId: any;

  tiempoActual: number = 0;
  tiempoInicio: number = 0;
  
  
  constructor()
  {  
    this.iniciarTemporizador(valores.minutos, valores.segundos);
  }

  enviarDatos(mensaje : string)
  {
    this.mensajeEnviado.emit(mensaje);
  }

  // Función que inicializa el temporizador
  iniciarTemporizador(minutos: number, segundos: number)
  {
    // Asigna los minutos y los segundos
    this.tiempoInicio = minutos * 60000 + segundos * 1000;
    let tiempoTotal = this.tiempoInicio;

    this.continuarTiempo(tiempoTotal);

  }

  continuarTiempo(tiempo: number)
  {
    let tiempoTotal = tiempo;
    // Esta función se ejecutará cada segundo
    const actualizarTemporizador = () =>
    {

      // Reduce el tiempo transcurrido en 1000 milisegundos
      tiempoTotal -= 1000;
      this.tiempoActual = tiempoTotal;

      // Obtén el tiempo transcurrido en minutos y segundos
      let minutos = Math.floor(tiempoTotal / 60000);
      let segundos = Math.floor(tiempoTotal % 60000 / 1000);

      // Añade un 0 a la izquierda de los segundos si es necesario
      this.minutosString = minutos < 10 ? '0' + minutos : minutos.toString();
      this.segundosString = segundos < 10 ? '0' + segundos : segundos.toString();

      // Si el tiempo es 0, detiene el temporizador
      if((minutos === 0 && segundos === 0) || !this.terminar)
      {
        this.enviarDatos(String(Number(this.minutosString)*60+Number(this.segundosString)));
        clearInterval(this.intervalId);
        this.tiempoActual = 0;
        this.tiempoInicio = 0;
        console.log("Llego a 0 o termino la partida");
      }
    }

    // Inicia el temporizador
    //const intervalId = setInterval(actualizarTemporizador, 1000);
    this.intervalId = setInterval(actualizarTemporizador, 1000);
  }

  
  // Función que pausa el temporizador
  pausaTemporizador()
  {
    console.log("Funcion pausaTemporizador()");
    // Borra el intervalo
    clearInterval(this.intervalId);
    console.log("Hice el clear");
  }

  // Función que le da play de nuevo
  playTemporizador()
  {
    console.log("Funcion playTemporizador()");
    // Inicia un nuevo intervalo desde donde quedo
    this.continuarTiempo(this.tiempoActual);

    
  }

  // Función que lo reinicia para que se pueda volver a usar
  reiniciarTempo()
  {
    console.log("Funcion reiniciarTempo()");
    clearInterval(this.intervalId);
    this.tiempoActual = 0;
    this.tiempoInicio = 0; 
    
  }
  
}