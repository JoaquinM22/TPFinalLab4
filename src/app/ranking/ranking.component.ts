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

        const usuario = document.createElement("td");
        usuario.className="cuadro";
        usuario.textContent = datos.usuario;
        fila.appendChild(usuario);

        const puntaje = document.createElement("td");
        puntaje.className="cuadro";
        puntaje.textContent =  String(datos.puntos);
        fila.appendChild(puntaje);

        const partidas = document.createElement("td");
        partidas.className="cuadro";
        partidas.textContent = String(datos.partidas);
        fila.appendChild(partidas);

        const promedio = document.createElement("td");
        promedio.className = "cuadro";
        if(datos.partidas){
          promedio.textContent =  String(datos.puntos/datos.partidas);
        }else{
          promedio.textContent =  String(0);
        }
        fila.appendChild(promedio);

        if(tabla)
        {
          tabla.appendChild(fila);
        }
      }
    }
  }
}
