import { Component, Input, OnInit } from '@angular/core';


enum consteP {
  eliminaOp = 25,
  imgP = 25,
  jump = 5,
  consola = 10,
  genero = 15,
  fecha = 5
}

@Component({
  selector: 'app-pista-juego',
  templateUrl: './pista-juego.component.html',
  styleUrls: ['./pista-juego.component.css']
})
export class PistaJuegoComponent {
  
  @Input() juegos: any;
  minutos: string="";
  segundos: string="";
  puntaje: number=200 ;
  i: number = 0;
  //estados de las pistas
  eliminaOP: number=0;
  imgP: boolean=false;
  consola: boolean=false;
  genero: boolean=false;
  fecha: boolean=false;
  constructor()
  {
  }
  

  handlePistaButtonClick(buttonText: string): void {
    switch (buttonText) {
      case '50%':
        this.puntaje=this.puntaje + 50;
        break;
      case 'eliminaOp':
        this.pistaEliminaOp();
        this.restarPuntos(25);
        break;
      case 'imgP':
        const foto = document.getElementById('fotoA');
        if(foto){
          foto.style.clipPath = 'inset(0% 0% 0% 0%)';
        }
        this.restarPuntos(25);
        break;
     
      case 'jump':
        if(this.verificarPistas('pista')){
          if(confirm("Si saltas pierdes las pistas usadas")){
            this.reset();
            this.moverPorArreglo();  
          }
        }else{
          this.moverPorArreglo();
        }
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
    if(this.i<this.juegos.length)
      {
        this.i=this.i+1;
      }else{
        this.i=0;
        while(!this.juegos[this.i].visible &&this.i<this.juegos.length+1){
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
      //oculto las pistas
    const elementosConClase = document.querySelectorAll('.VP');
    elementosConClase.forEach((elemento) => {
    (elemento as HTMLElement).style.visibility = 'hidden'; 
    });
    //habilito los botones devuelta
    const elementosConClase2 = document.querySelectorAll('.option');
    elementosConClase2.forEach((elemento) => {
    (elemento as HTMLButtonElement).disabled = false;
    (elemento as HTMLButtonElement).style.background = 'red';
    });

    this.desabilitarYhablitarBoton('eliminaOp',false);
    this.eliminaOP=0;

  }

  sumarPuntos(puntos: number){
    this.puntaje=this.puntaje+puntos;
    this.chequeoCosto('pista');
  }

  restarPuntos(puntos: number){
    if(this.puntaje>=puntos){
      this.puntaje=this.puntaje-puntos;
    }
    this.chequeoCosto('pista');
  }


  pistaEliminaOp(){
    let bien: boolean= false;
          while(!bien){
            let np: number = Math.floor(Math.random() * 4);
            if(this.juegos[this.i].nombresOpciones[np]!=this.juegos[this.i].nombre)
              {
                const miBoton = document.getElementById('opcion' + np) as HTMLButtonElement;
                if(miBoton && !miBoton.disabled){
                  this.desabilitarYhablitarBoton('opcion' + np,true)
                    this.eliminaOP=this.eliminaOP+1;
                    bien=true;
                }
              }
          }
          if(this.eliminaOP==2){
            this.desabilitarYhablitarBoton('eliminaOp',true);
          }
  }

  desabilitarYhablitarBoton(boton:string,estado:boolean){
    const miBoton = document.getElementById(boton) as HTMLButtonElement;
    if (miBoton) {
      miBoton.disabled = estado;
      miBoton.style.background ='white';
    }
  }

  verificarPistas(clase:string){
    let usada : boolean = false;
    const elementosConClase = document.querySelectorAll(clase);
    elementosConClase.forEach((elemento) => {
      if((elemento as HTMLButtonElement).disabled){
        usada  = true;
      }
    });
    if(this.eliminaOP>0){
      usada  = true;
    }
    return usada;
  }
  chequeoCosto(clase:string){
    const elementosConClase = document.querySelectorAll(clase);
    elementosConClase.forEach((elemento) => {
      switch (elemento.id) {
        case 'eliminaOP':
          if(this.puntaje<consteP.eliminaOp){
            (elemento as HTMLButtonElement).disabled = true;
          }else{
            if(this.eliminaOP==0){
              (elemento as HTMLButtonElement).disabled = false;
            }
          }
          break;
        case 'imgP':
          if(this.puntaje<consteP.imgP){
            (elemento as HTMLButtonElement).disabled = true;
          }else{
            if(!this.imgP){
              (elemento as HTMLButtonElement).disabled = false;
            }
          }
          break;
        case 'jump':
          if(this.puntaje<consteP.jump){
            (elemento as HTMLButtonElement).disabled = true;
          }else{
            (elemento as HTMLButtonElement).disabled = false;
          }
          break;
        case 'consola':
          if(this.puntaje<consteP.consola){
            (elemento as HTMLButtonElement).disabled = true;
          }else{
            if(!this.consola){
              (elemento as HTMLButtonElement).disabled = false;
            }
          }
          break;
        case 'fecha':
          if(this.puntaje<consteP.fecha){
            (elemento as HTMLButtonElement).disabled = true;
          }else{
            if(!this.fecha){
              (elemento as HTMLButtonElement).disabled = false;
            }
          }
          break;
        case 'genero':
          if(this.puntaje<consteP.genero){
            (elemento as HTMLButtonElement).disabled = true;
          }else{
            if(!this.genero){
              (elemento as HTMLButtonElement).disabled = false;
            }
          }
          break;
        
        }
      })
  }
}
