import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})

export class LoginUsuarioComponent implements OnInit{
  
  constructor()
  {

  }

  usuarioNuevo: any;
  //Este segundo seria el que traigo de la base de datos para compararlo
  //usuarioRegistrado: any

  //Funcion de guardar los datos de usuario
  logueo_Usuario()
  {
    class usuario
    {
      nombreUsuario: String;
      password: String;

      constructor(nombreUsuario: String, password: String)
      {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
      }
    }

    const botonInicioSesion = document.querySelector("#ingresar");

    if(botonInicioSesion)
    {
      botonInicioSesion.addEventListener("click", (evento) => 
      {
        evento.preventDefault();

        const nombre = (<HTMLInputElement>document.getElementById("Usuario")).value;
        const password = (<HTMLInputElement>document.getElementById("Password")).value;

        this.usuarioNuevo = new usuario(nombre, password);

        //Falta agregar la funcion que lo compare con los registros

      });
    }
  }

  ngOnInit()
  {
    this.logueo_Usuario();
  }

}
