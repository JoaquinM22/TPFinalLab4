import { Component, EventEmitter, Output } from '@angular/core';
import { LlamadaApiService } from 'src/app/servicios/llamada-api.service';

@Component
({
  selector: 'app-mostrar-foto',
  templateUrl: './mostrar-foto.component.html',
  styleUrls: ['./mostrar-foto.component.css']
})

export class MostrarFotoComponent
{
  // Envia al componente de menu
  @Output() mensajeEnviado: EventEmitter<string> = new EventEmitter<string>();
  // Controladores de carteles
  cartelInicio: boolean = true;
  loading: boolean =false;
  //Controlador de comienzo de partida
  empezar: boolean =false;
  //Arreglo de juegos ya filtrados
  datosJuegos: any[] = [];
  // Modalidades del juego
  modoSeleccionado: string = 'modoNormal';
  generoSeleccionado: string = 'porDefecto';

  constructor(private llamadaApi: LlamadaApiService)
  {
  }

  async traerDatosApi()
  {
    this.cartelInicio=false;
    this.loading=true;
    await this.llamadaApi.crearPartida(this.generoSeleccionado,this.modoSeleccionado);
    this.datosJuegos=this.llamadaApi.datosJuegos;
    this.loading=false;
    this.empezar=true;
  }

  enviarDatos(mensaje : string)
  {
    this.mensajeEnviado.emit(mensaje);
  }
  
  recibindoDatosDesdeJuego(mensaje: string)
  {
    switch(mensaje)
    {
      case 'otra':
        this.datosJuegos=[];
        this.empezar=false;
        this.cartelInicio=true;
        break;
      case 'finalizar':
        this.enviarDatos('false');
        break;
    }
  }
}
