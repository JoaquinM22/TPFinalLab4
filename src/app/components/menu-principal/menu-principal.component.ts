import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component
({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})

export class MenuPrincipalComponent
{

  constructor(private router: Router, private usuariosService: UsuariosService){}

  /*Llama al componente "Mostrar Foto" que lo que contiene en
  su html es el boton de elegir genero y modo de dificultad, y el
  boton que llama al componente "mostrarPista" que es el que empieza 
  la partida*/
  menu:boolean=true;
  crearPartida:boolean=false;
  ranking:boolean=false;
  perfil:boolean=false;
  historial:boolean=false;
  recibiendoDatosDesdeCreadorPartida(mensaje : string){
    if(mensaje=='false'){
      this.crearPartida= false;
      this.menu=true;
    }
  }

  desabilitarTodosLosComponentes(){
    this.crearPartida=false;
    this.ranking=false;
    this.perfil = false;
    this.historial = false;
  }

  cerrarSesion()
  {
    this.usuariosService.limpiarDatos();
    this.router.navigate(['/landing']);
  }
}
