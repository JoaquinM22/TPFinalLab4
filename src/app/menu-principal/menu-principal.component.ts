import { Component } from '@angular/core';

@Component
({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})

export class MenuPrincipalComponent
{
  crearPartida()
  {
    const crearPartida = document.getElementById("crearPartida");
    if(crearPartida)
    {
      crearPartida.style.visibility = "visible";
    }
  }
}
