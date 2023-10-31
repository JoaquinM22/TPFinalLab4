import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService 
{

  url:string = "http://localhost:3000/users";

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
}
