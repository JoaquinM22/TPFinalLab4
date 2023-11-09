import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit
{
  constructor(private usuariosService: UsuariosService) {}

  listaUsuarios: Usuario[] |undefined = [];

  ngOnInit(): void {
    this.mostrarRanking();
  }

  async mostrarRanking()
  {
    const tabla = document.getElementById("cuerpo");
    this.listaUsuarios = await this.usuariosService.getUsuarios();

    if(this.listaUsuarios)
    {
      for(const datos of this.listaUsuarios)
      {
        const fila = document.createElement("tr");
        fila.className = "posicion";
        
        const usuario = document.createElement("td");
        usuario.innerHTML = datos.usuario;
        fila.appendChild(usuario);

        const puntaje = document.createElement("td");
        puntaje.innerHTML = "Puntos:" + datos.puntos;
        fila.appendChild(puntaje);

        if(tabla)
        {
          tabla.appendChild(fila);
        }
      }
    }
  }
}
