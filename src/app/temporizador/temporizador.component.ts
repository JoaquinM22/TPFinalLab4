import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';

enum valores{
  minutos = 2,
  segundos = 30
}
@Component({
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
  
  constructor()
  {  
    this.iniciarTemporizador(valores.minutos, valores.segundos);
  }
  /* iniciarComponente() {
    this.iniciarTemporizador(valores.minutos, valores.segundos);
    console.log('El componente se está iniciando...');
  } */
  enviarDatos(mensaje : string) {
    this.mensajeEnviado.emit(mensaje);
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
      let segundos = Math.floor(tiempoTotal % 60000 / 1000);

      // Añade un 0 a la izquierda de los segundos si es necesario
      this.minutosString = minutos < 10 ? '0' + minutos : minutos.toString();
      this.segundosString = segundos < 10 ? '0' + segundos : segundos.toString();

      // Actualiza el elemento DOM
      console.log(this.minutosString + ":" + this.segundosString);

      // Si el tiempo es 0, detiene el temporizador
      if((minutos === 0 && segundos === 0) || !this.terminar)
      {
        this.enviarDatos(String(Number(this.minutosString)*60+Number(this.segundosString)))
        console.log("Ya termino el Temporizador");
        clearInterval(intervalId);
      }
    }
    // Inicia el temporizador
    const intervalId = setInterval(actualizarTemporizador, 1000);
  }

}
