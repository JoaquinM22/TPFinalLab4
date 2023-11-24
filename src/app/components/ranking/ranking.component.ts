import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { usuarioRanking } from 'src/app/interfaces/usuarioRanking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit
{
  constructor(private usuariosService: UsuariosService) {}

  listaUsuarios: usuarioRanking[] | undefined = [];

  ngOnInit(): void {
    this.mostrarRanking();
  }

  async mostrarRanking()
  {
    const tabla = document.getElementById("cuerpo");
    this.listaUsuarios = await this.ordenarParaRanking();
    if(this.listaUsuarios)
    {
      for(const datos of this.listaUsuarios)
      {
        const fila = document.createElement("tr");
        fila.style.border = '1px solid rgb(178, 253, 64)';

        const usuario = document.createElement("td");
        usuario.style.border = '1px solid rgb(178, 253, 64)';
        usuario.textContent = datos.nombre;
        fila.appendChild(usuario);

        const puntaje = document.createElement("td");
        puntaje.style.border = '1px solid rgb(178, 253, 64)';
        puntaje.textContent =  String(datos.puntaje);
        fila.appendChild(puntaje);

        const partidas = document.createElement("td");
        partidas.style.border = '1px solid rgb(178, 253, 64)';
        partidas.textContent = String(datos.partidas);
        fila.appendChild(partidas);

        const promedio = document.createElement("td");
        promedio.style.border = '1px solid rgb(178, 253, 64)';
        if(datos.partidas){
          promedio.textContent =  String(datos.promedio);
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

  async ordenarParaRanking()
  {
    let dato: usuarioRanking = {
      nombre: "",
      puntaje: 0,
      partidas: 0,
      promedio: 0
    }

    let arreglo: usuarioRanking[] = [];

    const usuarios = await this.usuariosService.getUsuarios();

    if(usuarios)
    {
      for(let elemento of usuarios)
      {
        let prom: number = 0;
        if(elemento.partidas)
        {
          prom = (Math.round(elemento.puntos / elemento.partidas))
        }
        let nuevo: usuarioRanking = {
          nombre: elemento.usuario, 
          puntaje: elemento.puntos, 
          partidas: elemento.partidas, 
          promedio: prom
        }

        arreglo.push(nuevo);
      }

      arreglo.sort((a, b) => b.promedio - a.promedio);
    }

    return arreglo;
  }

}