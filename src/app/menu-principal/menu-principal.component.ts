import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  mostrarBotones(){
    const componente = document.getElementById("creacion");
    if(componente){
      componente.style.visibility = "visible";
    }
  }

}
