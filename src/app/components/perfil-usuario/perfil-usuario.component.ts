import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component
({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent
{
  puntaje: number = this.usuariosService.login.puntos;
  nombre: string = this.usuariosService.login.usuario;


  constructor(private usuariosService: UsuariosService)
  {
  }


}
