import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component
({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})

export class LoginUsuarioComponent implements OnInit
{

  login!: FormGroup; 
  creacion!: FormGroup;
  
  constructor(private router: Router, private usuariosService: UsuariosService, private readonly fb: FormBuilder)
  {

  }

  initFormLogin(): FormGroup 
  {
    return this.fb.group
    ({
      Usuario: ['', Validators.required,],
      Password: ['', Validators.required,]
    })
  }

  initFormCreacion(): FormGroup 
  {
    return this.fb.group({
      UsuarioNuevo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      PasswordNuevo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  usuarioLogueado: Usuario = 
  { 
    id: 0,
    usuario: "",
    password: "",
    puntos: 0,
    partidas: 0
  };

  //Funcion de guardar los datos de usuario
  async logueo_Usuario()
  {
    const botonInicioSesion = document.querySelector("#ingresar");

    if(botonInicioSesion)
    {
      botonInicioSesion.addEventListener("click", async (evento) => 
      {
        evento.preventDefault();

        const usuarioL = (<HTMLInputElement>document.getElementById("Usuario")).value;
        const pass = (<HTMLInputElement>document.getElementById("Password")).value;

        //Falta agregar la funcion que lo compare con los registros

        const validado = await this.validarUsuario(usuarioL, pass, 1);

        if(validado)
        {
          console.log(this.usuarioLogueado);
          this.usuariosService.guardarDatos(this.usuarioLogueado);

          //Datos del Usuario recien logueado
          let logueadoRecien = this.usuariosService.obtenerDatos();
          console.log("Usuario Logueado", logueadoRecien);

          this.router.navigate(['/menu']);
        }else
        {
          var mensaje = document.getElementById("txt_login");
          if(mensaje)
          {
            mensaje.innerHTML = "Nombre o password incorrecto"
          }
        }

      });
    }
  }

  async creacion_Usuario()
  {
    const botonCrearCuenta = document.querySelector("#crear");

    if(botonCrearCuenta)
    {
      botonCrearCuenta.addEventListener("click", async (evento) => 
      {
        evento.preventDefault();

        const nombreCre = (<HTMLInputElement>document.getElementById("UsuarioNuevo")).value;
        const passCre = (<HTMLInputElement>document.getElementById("PasswordNuevo")).value;
        const confPassword = (<HTMLInputElement>document.getElementById("PasswordConfirm")).value;

        //Confirmacion de password
        if(passCre !== confPassword)
        {
          var mensaje = document.getElementById("texto");
          if(mensaje)
          {
            mensaje.innerHTML = "Los passwords no coinciden";
          }
        }else if(passCre === confPassword)
        {
          //Crea el usuario y lo manda a la funcion que lo carga en el server
          var validacion = await this.validarUsuario(nombreCre, passCre, 0);

          if(validacion)
          {
            //Si el usuario ya existe crea un mensaje
            var mensaje = document.getElementById("texto");
            this.usuarioLogueado =
            { 
              id: 0,
              usuario: "",
              password: "",
              puntos:0,
              partidas: 0
            };

            if(mensaje)
            {
              mensaje.innerHTML = "Usuario ya existente";
            }
          }else
          {
            //Aca sube los datos al server
            await this.cargarUsuario(nombreCre, passCre);

            console.log("Tercer consoleLog", this.usuarioLogueado);
            this.usuariosService.login = this.usuarioLogueado;
            this.router.navigate(['/menu']);
          }
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

  async cargarUsuario(nombre: string, password: string)
  {
    
    let idnuevo = await this.usuariosService.getUltimoID();
    idnuevo = idnuevo + 1; 

    const update: Usuario = 
    {
      id: idnuevo,
      usuario: nombre,
      password: password,
      puntos: 200,
      partidas:0
    };

    const options = 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    }

    fetch("http://localhost:3000/users", options)
    .then(data => data)
    .then(update =>
    {
      console.log("Segundo console log", update)
    })
    .catch(e =>
    {
      console.log(e);
    });

    this.usuarioLogueado = update; 

  }

  async validarUsuario(nombre: string, contra: string, tipo: number)
  {
    var validacion: boolean = false;

    const servidor = "http://localhost:3000/users";
  
    try
    {
      const response = await fetch(servidor);
      const json = await response.json();
  
      for(const datos of json)
      {
        if(datos.usuario === nombre)
        {
          if(tipo == 0)
          {
            this.usuarioLogueado = 
            { 
              id: datos.id,
              usuario: nombre,
              password: "",
              puntos: datos.puntos,
              partidas: datos.partidas
            };

            validacion = true;
          }
          
          if(datos.password === contra)
          {
            this.usuarioLogueado = 
            { 
              id: datos.id,
              usuario: nombre,
              password: "",
              puntos: datos.puntos,
              partidas: datos.partidas
            };

            validacion = true;
          }
        }
      }
    }catch(error)
    {
      console.error("Error al obtener datos del servidor", error);
    }
  
    return validacion;
  }
  
  async ngOnInit()
  {
    this.logueo_Usuario();
    await this.creacion_Usuario();
    this.login = this.initFormLogin();
    this.creacion = this.initFormCreacion();
  }
  
}
