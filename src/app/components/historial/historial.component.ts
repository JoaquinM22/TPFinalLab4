import { Component } from '@angular/core';
import { Partida } from 'src/app/interfaces/partida';

import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
   this.mostrarHistorial();
  }

  listaPartidas: Partida[] | undefined = [] ;

 async mostrarHistorial()
  {
    const tabla = document.getElementById("cuerpo");
    /* this.listaPartidas = await this.usuariosService.traerPartidasUsuario(); */
    this.listaPartidas = await this.usuariosService.getPartidaUsuario()
    console.log(this.listaPartidas)
    var puntAnterior: number=0;
    if(this.listaPartidas)
    {
      if(tabla){
        this.listaPartidas.forEach(datos => {
          const fila = document.createElement("tr");

          const puntos = document.createElement("td");
          puntos.textContent = String(datos.puntos-puntAnterior);
          puntAnterior=datos.puntos;
          fila.appendChild(puntos);

          const incorrectas = document.createElement("td");
          incorrectas.textContent =  String(datos.incorrectas);
          fila.appendChild(incorrectas);

          const correctas = document.createElement("td");
          correctas.textContent = String(datos.correctas);
          fila.appendChild(correctas);

          const pistaUsada = document.createElement("td");
          pistaUsada.textContent = String(datos.pistaUsada);
          fila.appendChild(pistaUsada);

          const fecha = document.createElement("td");
          fecha.textContent = String(datos.fechaPartida);
          fila.appendChild(fecha);
          
          tabla.appendChild(fila);
        });
      }
    }
  }
}