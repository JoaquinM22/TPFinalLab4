import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component
({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent
{
  puntaje: number = this.usuariosService.obtenerDatos().puntos
  nombre: string = this.usuariosService.obtenerDatos().usuario;

  constructor(private usuariosService: UsuariosService)
  {
  }

 

}
