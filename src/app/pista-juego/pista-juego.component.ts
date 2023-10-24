import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pista-juego',
  templateUrl: './pista-juego.component.html',
  styleUrls: ['./pista-juego.component.css']
})
export class PistaJuegoComponent {
  
  @Input() juegos: any;
  nombres: any[] = [];
  verdadero: String ="";
  posicion:number = Math.floor(Math.random()*4);
  puntaje: number = 0;
  
  constructor()
  {
  }

  handlePistaButtonClick(buttonText: string): void {
    switch (buttonText) {
      case '50%':
        this.puntaje=this.puntaje + 50;
        

        break;
      case '33%':
        // Lógica para el botón 33%
        console.log('Click en 33%');
        break;
      
      case 'imgP':
        // Lógica para el botón imgP
        console.log('Click en 33%');
        break;
     
      case 'jump':
        // Lógica para el botón jump
        console.log('Click en 33%');
        break;
     
      case 'consola':
        // Lógica para el botón consola
        console.log('Click en 33%');
        break;
     
      case 'creadores':
        // Lógica para el botón creadores
        console.log('Click en 33%');
        break;
      
      case 'fecha':
        // Lógica para el botón fecha
        console.log('Click en 33%');
        break;
      
      case 'genero':
        // Lógica para el botón genero
        console.log('Click en 33%');
        break;
    }
  }

  handleOptionButtonClick(optionText: string): void {
    if (optionText === this.juegos.nombre) {
      this.puntaje = this.puntaje + 100;
      //marcar como no visible
    }else{
      //marcar como no visible
    }
  }
}