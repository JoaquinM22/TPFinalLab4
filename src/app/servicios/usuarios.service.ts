import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Partida } from '../interfaces/partida';

@Injectable
({
  providedIn: 'root'
})

export class UsuariosService 
{
  
  url:string = "http://localhost:3000/users?_sort=puntos&_order=desc";
  
  //Variable que se va a usar en las funciones
  login: Usuario = 
  {
    id: 0,
    usuario: "",
    password: "",
    puntos: 0,
    partidas:0
  }
  //Sesion en el storage
   private readonly STORAGE_KEY = 'misDatos';

   guardarDatos(datos: Usuario): void {
     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(datos));
   }
 
   obtenerDatos(): Usuario {
     const datosString = localStorage.getItem(this.STORAGE_KEY);
     return datosString ? JSON.parse(datosString) : null;
   }
 
   limpiarDatos(): void {
     localStorage.removeItem(this.STORAGE_KEY);
   }

   constructor() { }
 
   async getUsuarios(): Promise<Usuario[] | undefined>
  {
    try
    {
      const resultado = await fetch(this.url);
      const usuarios = resultado.json();
      return usuarios;
    }catch(error) 
    {
      console.log(error);  
    }

    return undefined;
  }

  traerPuntosUsuario(): number{
    const url = "http://localhost:3000/users/" + this.obtenerDatos();
    var punt=-1;
    const options = 
    {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
      },
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data=>{
      punt = data.puntos;
    })
    .catch(error => 
    {
      console.error('Hubo un error en la solicitud:', error);
    });
    return punt;
  }

  actualizarPuntos ( new_puntos: number)
  {
    const aCambiar = 
    {
      puntos: new_puntos
    };

    const url = "http://localhost:3000/users/" + this.obtenerDatos();

    const options = 
    {
      method: 'PATCH',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aCambiar),
    }

    fetch(url, options)
    .then(response => 
    {
      if (response.ok) 
      {
        console.log('Los puntos del usuario han sido actualizados con éxito.');
      }else 
      {
        console.error('Error al actualizar los puntos del usuario.');
      }
    })
    .catch(error => 
    {
      console.error('Hubo un error en la solicitud:', error);
    });
  }

  guardarPartidaHistorial(puntos:Number,incorrectas:Number,correctas:Number,pistaUsada:number,fechaPartida:Date)
  {
    const agregar = {
      idUsuario:this.obtenerDatos(),
      puntos:puntos,
      incorrectas:incorrectas,
      correctas:correctas,
      pistaUsada:pistaUsada,
      fechaPartida:fechaPartida
    };

    const url = "http://localhost:3000/partida";

    const options = 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agregar),
    }

    fetch(url, options)
    .then(response => 
    {
      if (response.ok) 
      {
        console.log('Partida guardada con éxito.');
      }else 
      {
        console.error('Error al guardar partida.');
      }
    })
    .catch(error => 
    {
      console.error('Hubo un error en la solicitud:', error);
    });
  }


}
