import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
<<<<<<< HEAD
export class LoginUsuarioComponent {
  
=======

export class LoginUsuarioComponent implements OnInit{
  
  constructor()
  {

  }

  usuarioLogueado: any;
  usuarioaValidar: any;
  usuarioCreado: any;
  

  //Funcion de guardar los datos de usuario
  async logueo_Usuario()
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
      botonInicioSesion.addEventListener("click", async (evento) => 
      {
        evento.preventDefault();

        const nombre = (<HTMLInputElement>document.getElementById("Usuario")).value;
        const password = (<HTMLInputElement>document.getElementById("Password")).value;

        this.usuarioaValidar = new usuario(nombre, password);

        //Falta agregar la funcion que lo compare con los registros

        const validado = await this.validarUsuario(nombre, password);

        if(validado)
        {
          console.log(this.usuarioLogueado);
        }else
        {
          var mensaje = document.getElementById("txt_login");
          if(mensaje)
          {
            mensaje.innerHTML = "Password incorrecto"
          }
        }

      });
    }
  }


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

        //Confirmacion de password
        if(passwordNew !== confPassword)
        {
          var mensaje = document.getElementById("texto");
          if(mensaje)
          {
            mensaje.innerHTML = "Los passwords no coinciden";
          }
        }else if(passwordNew === confPassword)
        {
          //Crea el usuario y lo manda a la funcion que lo carga en el server
          this.usuarioCreado = new usuarioCre(nombreNew, passwordNew);
          //Aca va la funcion que lo carga en la "BDD"
        }else
        {
          var mensaje = document.getElementById("texto");
          if(mensaje)
          {
            mensaje.innerHTML = "ERROR";
          }
        }

      });
    }
  }

  async validarUsuario(nombre: string, contra: string) {
    var validacion: boolean = false;
  
    class registrado {
      nombreUsuario: string;
      password: string;
  
      constructor(nombreUsuario: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
      }
    }
  
    const servidor = "http://localhost:3000/users";
  
    try {
      const response = await fetch(servidor);
      const json = await response.json();
  
      for (const datos of json) {
        if (datos.usuario === nombre) {
          if (datos.password === contra) {
            this.usuarioLogueado = new registrado(datos.usuario, datos.password);
            validacion = true;
          }
        }
      }
    } catch (error) {
      console.error("Error al obtener datos del servidor", error);
    }
  
    return validacion;
  }
  

  ngOnInit()
  {
    this.logueo_Usuario();
    this.creacion_Usuario();
  }

>>>>>>> 4403ae9e8b780bccba206638075371cb10ff1212
}
