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
    /* const fechita = new Date();
    console.log('Fecha entera: ', fechita);

    // Extraer día
    const dia = fechita.getDate();
    const diaString = String(dia);
    console.log('Dia: ', diaString);

    // Extraer mes (ten en cuenta que los meses comienzan desde 0, por lo que debes sumar 1)
    const mes = fechita.getMonth() + 1;
    const mesString = String(mes);
    console.log('Mes: ', mesString);

    // Extraer año
    const anio = fechita.getFullYear();
    const anioString = String(anio);
    console.log('Anio: ', anioString);

    // Extraer hora
    const hora = fechita.getHours();
    const horaString = String(hora);
    console.log('Hora: ', horaString);

    // Extraer minuto
    const minuto = fechita.getMinutes();
    const minutoString = String(minuto);
    console.log('Minuto: ', minutoString);

    // Extraer segundo
    const segundo = fechita.getSeconds();
    const segundoString = String(segundo);
    console.log('Segundo: ', segundoString); */
    

    const tabla = document.getElementById("cuerpo");
    this.listaPartidas = await this.usuariosService.getPartidaUsuario();
    var puntAnterior: number=0;
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
}