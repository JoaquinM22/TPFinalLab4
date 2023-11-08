import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JuegoInt } from '../../../interfaces/juegoInt';
import { PasarDatosAPIService } from '../../../servicios/pasar-datos-api.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


enum valores
{
  eliminaOp = 50,
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

export class PistaJuegoComponent 
{

  //envia a componente mostrar foto
  @Output() mensajeEnviado: EventEmitter<string> = new EventEmitter<string>();
  // recibe de mostrar foto
  @Input() juegos: JuegoInt[] = [];
  // envia al temporizador para cortar el timepo
  terminar: boolean = true;

  //carga los puntos del usuario en sesion
  puntaje: number = this.usuariosService.login.puntos;

  //controlador de inicio y fin
  empezar: boolean = false;
  //controlador de inicio, fin y advertencia
  cartelInicio: boolean = true;
  cartelFinal: boolean = false;
  cartelAdvertencia:boolean=false;
  //contador del arreglo de juegos
  contJuego: number = 0;
  //respuestas correctas y incorrectas
  correctas: number=0;
  incorrectas: number=0;
  // uso de pistas
  pistaUsos: number = 0;
  //control estados de las pistas
  eliminaOp: boolean=false; 
  imgP: boolean=false;
  consola: boolean=false;
  genero: boolean=false;
  fecha: boolean=false;

  constructor(private usuariosService: UsuariosService)
  {
  }
  
  iniciarPartida(){
    this.cartelInicio=false;
    this.empezar=true;
  }

  finalizarPartida(){
    this.cartelFinal=false;
    this.enviarDatos('finalizar');
  }

  empezarOtra(){
    this.cartelFinal=false;
    this.enviarDatos('otra');
  }
  // envia al componente padre
  enviarDatos(mensaje : string) {
    this.mensajeEnviado.emit(mensaje);
  }
  
  // manejo de respuestas
  handleOptionButtonClick(optionText: string): void
  {
    this.juegos[this.contJuego].visible=false;
    this.reset();
    if(optionText === this.juegos[this.contJuego].nombre)
    {
      this.sumarPuntos(valores.acierto);
      this.correctas=this.correctas+ 1;
    }else
    {
      this.restarPuntos(valores.fallo);
      this.incorrectas = this.incorrectas + 1;
    }
    this.moverPorArreglo();   
  }
  // recorre el arreglo
  moverPorArreglo()
  {
    if(this.contJuego<this.juegos.length-1)
    {
      this.contJuego=this.contJuego+1;
    }else
    {
      this.contJuego = 0;
      while(!this.juegos[this.contJuego].visible && this.contJuego<this.juegos.length)
      {
        this.contJuego=this.contJuego+1;
      }
    }
    if(this.juegos.length == this.correctas+this.incorrectas)
    {
      this.terminar = false;
      this.contJuego=0;
      this.cartelFinal=true;
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
      (elemento as HTMLButtonElement).style.background = '#0073ff';
    });

    this.desabilitarYhablitarBoton('eliminaOp',false);
    //reseteo los valores para chequear las pistas
    this.eliminaOp=false;
    this.imgP=false;
    this.consola=false;
    this.genero=false;
    this.fecha=false;
    /* this.eliminaOpBool=false; */

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
      miBoton.style.background ='red';
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
          this.desabilitarYhablitarBoton(elemento.id,this.puntaje < valores.eliminaOp || this.eliminaOp);
          /* (elemento as HTMLButtonElement).disabled = this.puntaje < valores.eliminaOp || this.eliminaOP > 1; */
          break;
        case 'imgP':
          if(this.puntaje < valores.imgP || this.imgP)
          this.desabilitarYhablitarBoton(elemento.id,false);
          /* (elemento as HTMLButtonElement).disabled = this.puntaje < valores.imgP || this.imgP; */
          break;
        case 'jump':
          this.desabilitarYhablitarBoton(elemento.id,this.puntaje < valores.jump);
          /* (elemento as HTMLButtonElement).disabled = this.puntaje < valores.jump; */
          break;
        case 'consola':
          this.desabilitarYhablitarBoton(elemento.id,this.puntaje < valores.consola || this.consola);
          /* (elemento as HTMLButtonElement).disabled = this.puntaje < valores.consola || this.consola; */
          break;
        case 'fecha':
          this.desabilitarYhablitarBoton(elemento.id,this.puntaje < valores.fecha || this.fecha);
          /* (elemento as HTMLButtonElement).disabled = this.puntaje < valores.fecha || this.fecha; */
          break;
        case 'genero':
          this.desabilitarYhablitarBoton(elemento.id,this.puntaje < valores.genero || this.genero);
          /* (elemento as HTMLButtonElement).disabled = this.puntaje < valores.genero || this.genero; */
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

  // maneja los botones de las pistas de texto
  handlePistaButtonClick(buttonText: string): void
  {
    switch (buttonText)
    {
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

  pistaEliminaOp()
  {
    let i:number=0;
    while(i<2)
    {
      let np: number = Math.floor(Math.random() * 4);
      if(this.juegos[this.contJuego].nombresOpciones[np]!=this.juegos[this.contJuego].nombre)
      {
        const miBoton = document.getElementById('opcion' + np) as HTMLButtonElement;
        if(miBoton && !miBoton.disabled)
        {
          this.desabilitarYhablitarBoton('opcion' + np,true)
          i=i+1;
        }
      }
    }
    this.eliminaOp=true;
    this.desabilitarYhablitarBoton('eliminaOp',true);
    this.restarPuntos(valores.eliminaOp);
  }

  fotoCompleta()
  {
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = 'none';
    }
    this.imgP=true;
    this.desabilitarYhablitarBoton('imgP',true);
    this.restarPuntos(valores.imgP);
  }

  saltarFoto()
  {
    if(this.verificarPistas('.pista'))
    {
      this.cartelAdvertencia=true;
    }
    else
    {
      this.moverPorArreglo();
      this.generarValoresAleatoriosImagen();
      this.restarPuntos(valores.jump);
    }
   
  }
  
  saltarFotoPerdiendoPuntos(){
    this.reset();
    this.moverPorArreglo();
    this.cartelAdvertencia=false
    this.restarPuntos(valores.jump);
  }

  mostrarPista(id:string,coste:number)
  {
    const pista = document.getElementById(id);
    if(pista)
    {
      pista.style.visibility = 'visible';
    }
    this.restarPuntos(coste);
  }

  // recibindo datos desde componente temporizador y actualiza los puntos totales en el servidor
  recibindoDatosDesdeTemporizador(mensaje: string)
  {
    this.puntaje= this.puntaje + Number(mensaje) * valores.tiempoSobrante;
    this.usuariosService.actualizarPuntos(this.usuariosService.login.id, this.puntaje);
  }
 /*  precargarImagenes(){
    const div=document.getElementById('cargaImagenes');
    if(div){
      for (const foto of this.juegos) {
        const img = new Image();
        img.src = foto.foto;
        img.style.display = 'none';
        div.appendChild(img);
      }
    }
  } */
}
