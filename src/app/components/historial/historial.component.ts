import { Component } from '@angular/core';
import { Partida } from 'src/app/interfaces/partida';

import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component
({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent
{
  constructor(private usuariosService: UsuariosService){}

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
        fila.style.border = '1px solid rgb(178, 253, 64)';

          const puntos = document.createElement("td");
          puntos.textContent = String(datos.puntos-puntAnterior);
          puntAnterior=datos.puntos;
          fila.appendChild(puntos);
        const puntos = document.createElement("td");
        puntos.style.border = '1px solid rgb(178, 253, 64)';
        puntos.textContent = String(datos.puntos-puntAnterior);
        puntAnterior=datos.puntos;
        fila.appendChild(puntos);

          const incorrectas = document.createElement("td");
          incorrectas.textContent =  String(datos.incorrectas);
          fila.appendChild(incorrectas);
        const incorrectas = document.createElement("td");
        incorrectas.style.border = '1px solid rgb(178, 253, 64)';
        incorrectas.textContent =  String(datos.incorrectas);
        fila.appendChild(incorrectas);

          const correctas = document.createElement("td");
          correctas.textContent = String(datos.correctas);
          fila.appendChild(correctas);
        const correctas = document.createElement("td");
        correctas.style.border = '1px solid rgb(178, 253, 64)';
        correctas.textContent = String(datos.correctas);
        fila.appendChild(correctas);

        const pistaUsada = document.createElement("td");
        pistaUsada.style.border = '1px solid rgb(178, 253, 64)';
        pistaUsada.textContent = String(datos.pistaUsada);
        fila.appendChild(pistaUsada);
          const pistaUsada = document.createElement("td");
          pistaUsada.textContent = String(datos.pistaUsada);
          fila.appendChild(pistaUsada);

          const fecha = document.createElement("td");
          fecha.textContent = String(datos.fechaPartida);
          fila.appendChild(fecha);
          
        const fecha = document.createElement("td");
        fecha.style.border = '1px solid rgb(178, 253, 64)';
        fecha.textContent = String(datos.fechaPartida);
        fila.appendChild(fecha);

        if(tabla)
        {
          tabla.appendChild(fila);
        });
      }
    }
  }
}