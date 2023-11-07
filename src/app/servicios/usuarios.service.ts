import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
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
    puntos: 0
  }

  constructor() { }

  async getUsuarios(): Promise<Usuario[] | undefined>
  {
    try {
      const resultado = await fetch(this.url);
      const usuarios = resultado.json();
      return usuarios;
    } catch (error) 
    {
      console.log(error);  
    }

    return undefined;
  }



  actualizarPuntos(id: number, new_puntos: number)
  {
    const aCambiar = 
    {
      puntos: new_puntos
    };

    const url = "http://localhost:3000/users/" + id;

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


}
