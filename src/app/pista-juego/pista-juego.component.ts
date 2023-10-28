import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pista-juego',
  templateUrl: './pista-juego.component.html',
  styleUrls: ['./pista-juego.component.css']
})
export class PistaJuegoComponent {
  
  @Input() juegos: any;
  puntaje: number = 0;
  i: number = 0;

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
        const foto = document.getElementById('fotoA');
        if(foto){
          foto.style.clipPath = 'inset(0% 0% 0% 0%)';
        }
        break;
     
      case 'jump':
        this.reset();
        this.moverPorArreglo();
        break;
     
      case 'consola':
        const VP1 = document.getElementById('VP1');
          // Haciendo que el div no sea visible
          if (VP1) {
            VP1.style.visibility = 'visible';
          }
        break;
     
      case 'creadores':
        const VP2 = document.getElementById('VP2');
          // Haciendo que el div no sea visible
          if (VP2) {
            VP2.style.visibility = 'visible';
          }
        break;
      
      case 'fecha':
        const VP3 = document.getElementById('VP3');
          // Haciendo que el div no sea visible
          if (VP3) {
            VP3.style.visibility = 'visible';
          }
        break;
      
      case 'genero':
        const VP4 = document.getElementById('VP4');
          // Haciendo que el div no sea visible
          if (VP4) {
            VP4.style.visibility = 'visible';
          }
        break;
    }
  }

  handleOptionButtonClick(optionText: string): void {
    this.juegos[this.i].visible=false;
    this.reset();
    if (optionText === this.juegos[this.i].nombre) {
      this.puntaje = this.puntaje + 100;
    }else{
      this.puntaje = this.puntaje + 10;
    }
    this.moverPorArreglo();
     
  }
  moverPorArreglo(){
    if(this.i<9)
      {
        this.i=this.i+1;
      }else{
        this.i=0;
        while(!this.juegos[this.i].visible){
          this.i=this.i+1;
        }
      } 
  }
  reset(){
    // reseteo el corte de la imagen
    const foto = document.getElementById('fotoA');
        if(foto){
          foto.style.clipPath = 'inset(3% 5% 47% 48%)';
        }

    const elementosConClase = document.querySelectorAll('.VP');

    elementosConClase.forEach((elemento) => {
    (elemento as HTMLElement).style.visibility = 'hidden'; 
    });
  }
}