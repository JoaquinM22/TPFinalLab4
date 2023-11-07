import { Component } from '@angular/core';

@Component
({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})

export class MenuPrincipalComponent
{
  /*Llama al componente "Mostrar Foto" que lo que contiene en
  su html es el boton de elegir genero y modo de dificultad, y el
  boton que llama al componente "mostrarPista" que es el que empieza 
  la partida*/
  crearPartida:boolean=false;
  ranking:boolean=false;
  recibiendoDatosDesdeCreadorPartida(mensaje : string){
    if(mensaje=='false'){
      this.crearPartida= false;
    }
  }

  desabilitarTodosLosComponentes(){
    this.crearPartida=false;
    this.ranking=false;
  }

}
