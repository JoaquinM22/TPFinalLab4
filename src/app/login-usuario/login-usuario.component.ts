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

  usuarioLogueado: any;
  usuarioCreado: any;
  registroUsuario: any;

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

        this.usuarioLogueado = new usuario(nombre, password);

        //Falta agregar la funcion que lo compare con los registros

        this.validarUsuario(this.usuarioLogueado);

        console.log(this.registroUsuario);

      });
    }
  }

  /* No entra al if de comparacion de contraseña
  creacion_Usuario()
  {
    class usuarioCre
    {
      nombreUsuario: String;
      password: String;

      constructor(nombreUsuario: String, password: String)
      {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
      }
    }

    const botonCrearCuenta = document.querySelector("#crear");

    if(botonCrearCuenta)
    {
      botonCrearCuenta.addEventListener("click", (evento) => 
      {
        evento.preventDefault();

        const nombreNew = (<HTMLInputElement>document.getElementById("UsuarioNuevo")).value;
        const passwordNew = (<HTMLInputElement>document.getElementById("PasswordNuevo")).value;
        const confPassword = (<HTMLInputElement>document.getElementById("PasswordConfirm")).value;

        if(passwordNew != confPassword)
        {
          var mensaje = document.getElementById("#texto");
          if(mensaje)
          {
            mensaje.innerHTML = "Los passwords no coinciden";
          }
        }else
        {
          this.usuarioCreado = new usuarioCre(nombreNew, passwordNew);
          console.log(this.usuarioCreado);
        }
        

        //Falta agregar la funcion que lo agregue a los registros

      });
    }
  }*/

  validarUsuario(usuario: any)
  {
    class registrado
    {
      nombreUsuario: String;
      password: String;

      constructor(nombreUsuario: String, password: String)
      {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
      }
    }

    const servidor = "http://localhost:3000/users"

    fetch(servidor)
    .then(res => res.json())
    .then(data =>
    {
      console.log("Respuesta de servidor: ", data);

      //Hay un error donde no deja usar el for
      for(const datos of data.results)
      {
        if(datos.usuario == usuario.nombre)
        {
          this.registroUsuario = new registrado(datos.usuario, datos.password);
        }
      }
    })

  }

  ngOnInit()
  {
    this.logueo_Usuario();
    //this.creacion_Usuario();
  }

}
