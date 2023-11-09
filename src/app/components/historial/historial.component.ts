import { Component } from '@angular/core';
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

  ngOnInit(): void
  {
    this.mostrarHistorial();
  }

  mostrarHistorial()
  {
    const tabla = document.getElementById("cuerpo");
    var listapartidas = this.usuariosService.traerPartidasUsuario();
    var puntAnterior: number = 0;
    if(listapartidas)
    {
      for(const datos of listapartidas)
      {
        const fila = document.createElement("tr");
        fila.style.border = '1px solid rgb(178, 253, 64)';

        const puntos = document.createElement("td");
        puntos.style.border = '1px solid rgb(178, 253, 64)';
        puntos.textContent = String(datos.puntos-puntAnterior);
        puntAnterior=datos.puntos;
        fila.appendChild(puntos);

        const incorrectas = document.createElement("td");
        incorrectas.style.border = '1px solid rgb(178, 253, 64)';
        incorrectas.textContent =  String(datos.incorrectas);
        fila.appendChild(incorrectas);

        const correctas = document.createElement("td");
        correctas.style.border = '1px solid rgb(178, 253, 64)';
        correctas.textContent = String(datos.correctas);
        fila.appendChild(correctas);

        const pistaUsada = document.createElement("td");
        pistaUsada.style.border = '1px solid rgb(178, 253, 64)';
        pistaUsada.textContent = String(datos.pistaUsada);
        fila.appendChild(pistaUsada);

        const fecha = document.createElement("td");
        fecha.style.border = '1px solid rgb(178, 253, 64)';
        fecha.textContent = String(datos.fechaPartida);
        fila.appendChild(fecha);

        if(tabla)
        {
          tabla.appendChild(fila);
        }
      }
    }
  }
}