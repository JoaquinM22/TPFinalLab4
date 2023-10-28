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
  p33: number=0;

  constructor()
  {
  }


  handlePistaButtonClick(buttonText: string): void {
    switch (buttonText) {
      case '50%':
        this.puntaje=this.puntaje + 50;
        break;
      case '33%':
        let bien: boolean= false;
        while(!bien){
          let np: number = Math.floor(Math.random() * 4);
          if(this.juegos[this.i].nombresOpciones[np]!=this.juegos[this.i].nombre)
            {
              const miBoton = document.getElementById('opcion' + np) as HTMLButtonElement;
              if(miBoton && !miBoton.disabled){
                if (miBoton) {
                  miBoton.disabled = true;
                  miBoton.style.background ='white';
                  this.p33=this.p33+1;
                  bien=true;
                }
              }
            }
        }
        if(this.p33==2){
          const miBoton = document.getElementById('33%') as HTMLButtonElement;
          if (miBoton) {
            miBoton.disabled = true;
            miBoton.style.background ='white';
          }
        }
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
          if (VP1) {
            VP1.style.visibility = 'visible';
          }
        break;
     
      case 'creadores':
        const VP2 = document.getElementById('VP2');
          if (VP2) {
            VP2.style.visibility = 'visible';
          }
        break;
      
      case 'fecha':
        const VP3 = document.getElementById('VP3');
          if (VP3) {
            VP3.style.visibility = 'visible';
          }
        break;
      
      case 'genero':
        const VP4 = document.getElementById('VP4');
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
      this.sumarPuntos(100);
    }
    this.moverPorArreglo();   
  }

  moverPorArreglo(){
    if(this.i<9)
      {
        this.i=this.i+1;
      }else{
        this.i=0;
        while(!this.juegos[this.i].visible &&this.i<10){
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
    const elementosConClase2 = document.querySelectorAll('.option');

    elementosConClase2.forEach((elemento) => {
    (elemento as HTMLButtonElement).disabled = false;
    (elemento as HTMLButtonElement).style.background = 'red';
    });
    const miBoton = document.getElementById('33%') as HTMLButtonElement;
        if (miBoton) {
          miBoton.disabled = false;
          miBoton.style.background ='red';
        }
    this.p33=0;
  }
  sumarPuntos(puntos: number){
    this.puntaje=this.puntaje+puntos;
  }
  restarPuntos(puntos: number){
    this.puntaje=this.puntaje-puntos;
  }
}