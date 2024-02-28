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

  tipoOrden: string = 'descendente';

  constructor(private usuariosService: UsuariosService){}

  ngOnInit(): void
  {
    this.mostrarPorOrdenElegido();
  }

  listaPartidas: Partida[] | undefined = [] ;

  insertarDatosPartidas()
  {
    const tabla = document.getElementById("cuerpo");
    var puntAnterior: number=0;
    if(tabla)
    {
      tabla.innerHTML = "";
    }

    if(this.listaPartidas)
    {
      if(tabla)
      {
        this.listaPartidas.forEach(datos =>
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
          
          const fechaISO = datos.fechaPartida;
          const fechaCompleta: Date = new Date(fechaISO);

          //Extraer día
          const dia = fechaCompleta.getDate();
          const diaString = String(dia);

          //Extraer mes
          const mes = fechaCompleta.getMonth() + 1;
          const mesString = String(mes);

          // Extraer año
          const anio = fechaCompleta.getFullYear();
          const anioString = String(anio);

          // Extraer hora
          const hora = fechaCompleta.getHours();
          const horaString = hora < 10 ? '0' + hora : hora.toString();

          // Extraer minuto
          const minuto = fechaCompleta.getMinutes();
          const minutoString = minuto < 10 ? '0' + minuto : minuto.toString();

          // Extraer segundo
          const segundo = fechaCompleta.getSeconds();
          const segundoString = segundo < 10 ? '0' + segundo : segundo.toString();

          const fechaCompletaString = diaString + '/' + mesString + '/' + anioString + ' ' + horaString + ':' + minutoString + ':' + segundoString + 'hs';

          fecha.textContent = fechaCompletaString;
          fila.appendChild(fecha);

          tabla.appendChild(fila);
        });
      }
    }
  }

  async mostrarPorOrdenElegido()
  {
    // console.log("Ordenado Ascendente: ", this.listaPartidas);
    // this.listaPartidas = await this.usuariosService.getPartidaUsuario();
    // this.listaPartidas?.reverse();
    // console.log("Orden descendente: ", this.listaPartidas);


    switch(this.tipoOrden)
    {
      case 'descendente':
        this.listaPartidas = await this.usuariosService.getPartidaUsuario();
        this.listaPartidas?.reverse();
        this.insertarDatosPartidas();
      break;

      case 'ascendente':
        this.listaPartidas = await this.usuariosService.getPartidaUsuario();
        this.insertarDatosPartidas();
      break;

      default:
        console.log("Error en mostrarPorOrdenElegido()")
      break;
    }

    
  }
}