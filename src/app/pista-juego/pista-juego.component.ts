import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { JuegoInt } from '../interfaces/juegoInt';


enum valores
{
  eliminaOp = 25,
  imgP = 25,
  jump = 5,
  consola = 10,
  genero = 15,
  creadores=10,
  fecha = 5,
  acierto = 150,
  fallo = 25,
  tiempoSobrante = 10,
}

@Component
({
  selector: 'app-pista-juego',
  templateUrl: './pista-juego.component.html',
  styleUrls: ['./pista-juego.component.css']
})

export class PistaJuegoComponent  {
  //datos de otros componentes
  /* @ViewChild('TemporizadorComponent') TemporizadorComponent = new TemporizadorComponent; */
  @Output() mensajeEnviado: EventEmitter<string> = new EventEmitter<string>();
  @Input() juegos: JuegoInt[] = [];
  terminar: boolean = true;
  puntaje: number = 200 ;

  //controlador de inicio y fin
  empezar: boolean = false;
  cartelInicio: boolean = true;
  cartelFinal: boolean = false;
  //contador del arreglo de juegos
  contJuego: number = 0;

  //estados de las pistas
  eliminaOP: number=0;
  imgP: boolean=false;
  consola: boolean=false;
  genero: boolean=false;
  fecha: boolean=false;

  constructor()
  {
  }
  
  iniciarPartida(){
    this.cartelInicio=false;
    this.empezar=true;
  }
  finalizarPartida(){

  }
  empezarOtra(){
    this.enviarDatos('otra');
  }

  enviarDatos(mensaje : string) {
    this.mensajeEnviado.emit(mensaje);
  }
  // maneja los botones de las pistas
  handlePistaButtonClick(buttonText: string): void
  {
    switch (buttonText)
    {
      case '50%':
        this.puntaje=this.puntaje + 50;
        break;
      case 'eliminaOp':
        this.pistaEliminaOp();
        this.restarPuntos(valores.eliminaOp);
        break;
      case 'imgP':
        this.imgP=true;
        this.fotoCompleta();
        this.restarPuntos(valores.imgP);
        break;
     
      case 'jump':
        this.saltarFoto();
        break;
     
      case 'consola':
        this.consola=true;
        this.mostrarPista('VP1',valores.consola);
        break;
     
      case 'creadores':
        this.mostrarPista('VP2',valores.creadores);
        break;
      
      case 'fecha':
        this.fecha=true;
        this.mostrarPista('VP3',valores.fecha);
        break;
      
      case 'genero':
        this.genero=true;
        this.mostrarPista('VP4',valores.genero);
        break;
    }
  }

  handleOptionButtonClick(optionText: string): void
  {
    this.juegos[this.contJuego].visible=false;
    this.reset();
    if(optionText === this.juegos[this.contJuego].nombre)
    {
      this.sumarPuntos(valores.acierto);
    }else
    {
      this.restarPuntos(valores.fallo);
    }
    this.moverPorArreglo();   
  }

  moverPorArreglo()
  {
    if(this.contJuego<this.juegos.length)
    {
      this.contJuego=this.contJuego+1;
    }else
    {
      this.contJuego = 0;
      while(!this.juegos[this.contJuego].visible && this.contJuego<this.juegos.length+1)
      {
        this.contJuego=this.contJuego+1;
      }
    }
    if(this.juegos.length == this.contJuego)
    {
      this.terminar = false;
      this.contJuego=0;
    }
  }

  reset()
  {
    // reseteo el corte de la imagen
    this.generarValoresAleatoriosImagen();
    
    //oculto las pistas
    const elementosConClase = document.querySelectorAll('.VP');
    elementosConClase.forEach((elemento) =>
    {
      (elemento as HTMLElement).style.visibility = 'hidden'; 
    });

    //habilito los botones de opciones devuelta
    const elementosConClase2 = document.querySelectorAll('.option');
    elementosConClase2.forEach((elemento) =>
    {
      (elemento as HTMLButtonElement).disabled = false;
      (elemento as HTMLButtonElement).style.background = 'red';
    });

    this.desabilitarYhablitarBoton('eliminaOp',false);
    //reseteo los valores para chequear las pistas
    this.eliminaOP=0;
    this.imgP=false;
    this.consola=false;
    this.genero=false;
    this.fecha=false;

  }

  sumarPuntos(puntos: number)
  {
    this.puntaje=this.puntaje+puntos;
    this.chequeoCosto('.pista'); 
  }

  restarPuntos(puntos: number)
  {
    if(this.puntaje>=puntos)
    {
      this.puntaje=this.puntaje-puntos;
    }
    this.chequeoCosto('.pista'); 
  }

  desabilitarYhablitarBoton(boton:string,estado:boolean)
  {
    const miBoton = document.getElementById(boton) as HTMLButtonElement;
    if(miBoton)
    {
      miBoton.disabled = estado;
      miBoton.style.background ='white';
    }
  }
  
  verificarPistas(clase:string)
  {
    let usada : boolean = false;
    const elementosConClase = document.querySelectorAll(clase);
    elementosConClase.forEach((elemento) =>
    {
      if((elemento as HTMLButtonElement).disabled)
      {
        usada  = true;
      }
    });

    if(this.eliminaOP>0)
    {
      usada  = true;
    }
    return usada;
  }

  chequeoCosto(clase:string)
  {
    const elementosConClase = document.querySelectorAll(clase);
    elementosConClase.forEach((elemento) =>
    {
      switch (elemento.id)
      {
        case 'eliminaOp':
          (elemento as HTMLButtonElement).disabled = this.puntaje < valores.eliminaOp || this.eliminaOP > 1;
          break;
        case 'imgP':
          (elemento as HTMLButtonElement).disabled = this.puntaje < valores.imgP || this.imgP;
          break;
        case 'jump':
          (elemento as HTMLButtonElement).disabled = this.puntaje < valores.jump;
          break;
        case 'consola':
          (elemento as HTMLButtonElement).disabled = this.puntaje < valores.consola || this.consola;
          break;
        case 'fecha':
          (elemento as HTMLButtonElement).disabled = this.puntaje < valores.fecha || this.fecha;
          break;
        case 'genero':
          (elemento as HTMLButtonElement).disabled = this.puntaje < valores.genero || this.genero;
          break;
          
      }
    })
  }

  //funciones de imagen
  generarValoresAleatoriosImagen()
  {
    // Selecciona valores aleatorios para los puntos, garantizando que el área visible sea aproximadamente el 33%
    const x1 = 50;
    const y1 = 0
    const x2 = Math.floor(Math.random() * 100)  // Ajusta según sea necesario
    const y2 =  100  // Ajusta según sea necesario
    const x3 = 0  // Ajusta según sea necesario
    const y3 = Math.floor(Math.random() * 100) // Ajusta según sea necesario
    const x4 = 100  // Ajusta según sea necesario
    const y4 = Math.floor(Math.random() * 100)  // Ajusta según sea necesario
    const x5 = Math.floor(Math.random() * 100)  // Ajusta según sea necesario
    const y5 = 100  // Ajusta según sea necesario
      
    // Formatea los valores en el formato requerido para clip-path
    const clipPathValue = `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%, ${x5}% ${y5}%)`;
    // Aplica el nuevo valor a la propiedad clip-path de la imagen
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = clipPathValue; 
      /* foto.style.clipPath = 'polygon(100% 0, 35% 24%, 0 100%, 100% 100%, 79% 50%)'; */
    }
  }
      
  //funciones de las pistas
  pistaEliminaOp()
  {
    let bien: boolean= false;
    while(!bien)
    {
      let np: number = Math.floor(Math.random() * 4);
      if(this.juegos[this.contJuego].nombresOpciones[np]!=this.juegos[this.contJuego].nombre)
      {
        const miBoton = document.getElementById('opcion' + np) as HTMLButtonElement;
        if(miBoton && !miBoton.disabled)
        {
          this.desabilitarYhablitarBoton('opcion' + np,true)
          this.eliminaOP=this.eliminaOP+1;
          bien=true;
        }
      }
    }

    if(this.eliminaOP==2)
    {
      this.desabilitarYhablitarBoton('eliminaOp',true);
    }
  }

  fotoCompleta()
  {
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = 'none';
    }
  }

  saltarFoto()
  {
    if(this.verificarPistas('.pista'))
    {
      if(confirm("Si saltas pierdes las pistas usadas"))
      {
        this.reset();
        this.moverPorArreglo();  
      }
    }else
    {
      this.moverPorArreglo();
      this.generarValoresAleatoriosImagen();
    }
    this.restarPuntos(valores.jump);
  }

  mostrarPista(id:string,coste:number)
  {
    const pista = document.getElementById(id);
    if(pista)
    {
      pista.style.visibility = 'visible';
    }
    this.desabilitarYhablitarBoton(id,true)
    this.restarPuntos(coste);
  }

  // recibindo datos desde componente temporizador
  recibindoDatosDesdeTemporizador(mensaje: string)
  {
    this.puntaje= this.puntaje + Number(mensaje) * valores.tiempoSobrante;
    console.log(this.puntaje);
  }
}
