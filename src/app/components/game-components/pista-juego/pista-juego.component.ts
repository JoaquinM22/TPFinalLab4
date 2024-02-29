

/*
import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { JuegoInt } from '../../../interfaces/juegoInt';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { MenuPrincipalComponent } from '../../menu-principal/menu-principal.component';

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
  tiempoSobrante = 1,
}

@Component
({
  selector: 'app-pista-juego',
  templateUrl: './pista-juego.component.html',
  styleUrls: ['./pista-juego.component.css']
})

export class PistaJuegoComponent implements OnInit
{

  @ViewChild(TemporizadorComponent) temporizador!: TemporizadorComponent
  @ViewChild(MenuPrincipalComponent) menuPrincipal!: MenuPrincipalComponent

  cartelAdvertenciaNuevito: boolean = false;

  async abandonarPartida()
  {
    if(this.temporizador)
    {
      await this.usuariosService.actualizarPuntos(this.puntaje);
      this.temporizador.reiniciarTempo();
      this.mostrarYocultar("fotoA",false);
      this.cartelFinal = false;
      this.enviarDatos('finalizar');
    }
  }

  // Función de Abandonar Partida que llama a la función pausaTemporizador() del componente Temporizador
  pausaTemporizadorAux()
  {
    if(this.temporizador)
    {
      this.temporizador.pausaTemporizador();
    }
  }

  //Funcion que llama a playTemporizador() del componente temporizador
  playTemporizadorAux()
  {
    if(this.temporizador)
    {
      this.temporizador.playTemporizador();
    }
  }

  //envia a componente mostrar foto
  @Output() mensajeEnviado: EventEmitter<string> = new EventEmitter<string>();
  // recibe de mostrar foto
  @Input() juegos: JuegoInt[] = [];
  // envia al temporizador para cortar el timepo
  terminar: boolean = true;

  //carga los puntos del usuario en sesion
  puntaje: number = this.usuariosService.obtenerDatos().puntos;

  puntosExtra: number = 0;

  contBloqueoPistaSaltar: number = 0;

  //controlador de inicio y fin
  empezar: boolean = false;
  //controlador de inicio, fin y advertencia
  cartelInicio: boolean = true;
  cartelFinal: boolean = false;
  cartelAdvertencia:boolean=false;
  //contador del arreglo de juegos
  contJuego: number = 0;
  //respuestas correctas y incorrectas
  correctas: JuegoInt[] = [];
  incorrectas: JuegoInt[] = [];
  // uso de pistas
  pistaUsos: number = 0;
  //control estados de las pistas
  eliminaOp: boolean=false; 
  imgP: boolean=false;
  consola: boolean=false;
  genero: boolean=false;
  fecha: boolean=false;
  // Link a la imagen
  src: string = "";



  constructor(private usuariosService: UsuariosService,)
  {
  }

  ngOnInit()
  {
    this.chequeoCosto();
  };


  iniciarPartida()
  {
    this.cartelInicio=false;
    this.empezar=true;
    this.src=this.juegos[this.contJuego].foto;
    this.mostrarYocultar("fotoA",true);
    this.generarValoresAleatoriosImagen();
    console.log("Dimension de las 10 fotos: ", this.juegos.length); 
    //Va de 0 a 9. La pos 8 es la ante ultima, en esa se debe bloquear la pista 
    //de saltear imagen
  }

  async finalizarPartida()
  {
    await this.usuariosService.guardarPartidaHistorial(this.puntaje,this.incorrectas.length,this.correctas.length,this.pistaUsos,new Date());
    this.mostrarYocultar("fotoA",false);
    this.cartelFinal=false;
    this.enviarDatos('finalizar');
  }

  async empezarOtra()
  {
    await this.usuariosService.guardarPartidaHistorial(this.puntaje,this.incorrectas.length,this.correctas.length,this.pistaUsos,new Date());
    this.cartelFinal=false;
    this.enviarDatos('otra');
  }

  // envia al componente padre
  enviarDatos(mensaje : string)
  {
    this.mensajeEnviado.emit(mensaje);
  }
  
  // manejo de respuestas
  handleOptionButtonClick(optionText: string): void
  {
    let resp:boolean;
    this.reset();
    if(optionText == this.juegos[this.contJuego].nombre) 
    {
      this.correctas.push(this.juegos[this.contJuego]);
      this.sumarPuntos(valores.acierto);
      resp=true
    }else
    {
      this.incorrectas.push(this.juegos[this.contJuego]);
      this.restarPuntos(valores.fallo);
      resp=false;
    }

    this.memeRespuesta(resp);
    this.desabilitarYhablitarAllBoton(true);
    setTimeout(() => {
      this.desabilitarYhablitarAllBoton(false);
      if(this.juegos.length > 1)
        {
          this.juegos.splice(this.contJuego,1);
          this.moverPorArreglo();        
        }else{
          this.terminar = false;
        }
    }, 1500);
  }
  
  // recorre el arreglo
  moverPorArreglo()
  {

    this.contBloqueoPistaSaltar++;
    console.log("contador: ", this.contBloqueoPistaSaltar);

    if(this.contBloqueoPistaSaltar == 9)
    {
      let boton = document.getElementById("jump");
      if(boton)
      {
        (boton as HTMLButtonElement).disabled = true;
        boton.style.background ='red';
      }

      this.contBloqueoPistaSaltar = 0;
    }
    if(this.contJuego>=this.juegos.length-1)
    {
      this.contJuego=0;
    }else
    {
      this.contJuego=this.contJuego+1;
    }
    this.generarValoresAleatoriosImagen();
    this.src=this.juegos[this.contJuego].foto;
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

  }

  sumarPuntos(puntos: number)
  {
    this.puntaje=this.puntaje+puntos;
    this.chequeoCosto(); 
  }

  restarPuntos(puntos: number)
  {
    if(this.puntaje>=puntos)
    {
      this.puntaje=this.puntaje-puntos;
    }
    this.chequeoCosto(); 
  }

  desabilitarYhablitarAllBoton(estado:boolean){
    const elementos = document.querySelectorAll('.bloquear');
    elementos.forEach((elemento) =>
    {
      (elemento as HTMLButtonElement).disabled = estado;
    });
  }
  
  desabilitarYhablitarBoton(boton:string,estado:boolean)
  {
    const miBoton = document.getElementById(boton) as HTMLButtonElement;
    if(miBoton)
    {
      miBoton.disabled = estado;
      if(estado){
        miBoton.style.background ='red';
      }else{
        miBoton.style.background ='rgba(172, 255, 47, 0.784)';
      }
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

  chequeoCosto()
  {
    const elementosConClase = document.querySelectorAll(".pista");
    elementosConClase.forEach((elemento) =>
    {
      switch (elemento.id)
      {
        case 'eliminaOp':
          if(this.puntaje < valores.eliminaOp || this.eliminaOp){
            this.desabilitarYhablitarBoton(elemento.id,true);
          }
        else
        {
          this.desabilitarYhablitarBoton(elemento.id,false);
        }
          break;
        case 'imgP':
          if(this.puntaje < valores.imgP || this.imgP){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
          {
            this.desabilitarYhablitarBoton(elemento.id,false);
          }
          break;
        case 'jump':
          if(this.puntaje < valores.jump){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
          {
            this.desabilitarYhablitarBoton(elemento.id,false);
          }
          break;
        case 'consola':
          if(this.puntaje < valores.consola || this.consola)
          {this.desabilitarYhablitarBoton(elemento.id,true);}
          else
        {
          this.desabilitarYhablitarBoton(elemento.id,false);
        }
          break;
        case 'fecha':
          if(this.puntaje < valores.fecha || this.fecha){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
          {
            this.desabilitarYhablitarBoton(elemento.id,false);
          }
          break;
        case 'genero':
          if(this.puntaje < valores.genero || this.genero){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
        {
          this.desabilitarYhablitarBoton(elemento.id,false);
        }
          break;
      }
    })
  }

  //funciones de imagen
  generarValoresAleatoriosImagen()
  {
    var clipPathValue="";
    let num = Math.floor(Math.random()*11);

    switch(num)
    {
      case 0 :
        clipPathValue = "polygon(100% 0, 90% 0, 100% 100%, 100% 10%, 0 100%, 10% 100%, 0 0, 0 90%)";
      break;
      case 1 :
        clipPathValue = "polygon(0 35%, 90% 0, 0 100%, 100% 65%, 10% 100%, 100% 0)";
      break;
      case 2 :
        clipPathValue = "circle(20.0% at 21% 21%)";
      break;
      case 3 :
        clipPathValue = "polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)";
      break;
      case 4 :
        clipPathValue = "polygon(50% 85%, 100% 0, 50% 100%, 0 0)";
      break;
      case 5 :
        clipPathValue = "polygon(50% 0%, 55% 45%, 98% 35%, 55% 55%, 79% 91%, 50% 60%, 21% 91%, 45% 55%, 2% 35%, 45% 45%)";
      break;
      case 6 :
        clipPathValue = "polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 90% 10%, 90% 90%, 0 90%, 0 100%, 100% 100%, 100% 0%)";
      break;
      case 7 :
        clipPathValue = "polygon(40% 0%, 10% 45%, 100% 45%, 100% 55%, 10% 55%, 40% 100%, 0% 50%)";
      break;
      case 8 :
        clipPathValue = "polygon(0 45%, 90% 45%, 60% 0%, 100% 50%, 60% 100%, 90% 55%, 0 55%)";
      break;
      case 9 :
        clipPathValue = "polygon(50% 25%, 100% 0, 75% 0, 100% 100%, 100% 75%, 50% 0, 0 75%, 0 100%, 25% 0, 0 0)";
      break;
      case 10 :
        clipPathValue = "ellipse(10% 20% at 50% 25%)";
      break;
    }

    //clipPathValue = this.generarPoligono();
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = clipPathValue; 
    }
  }




      
  //----------- Funciones de las pistas ----------

  // maneja los botones de las pistas de texto
  handlePistaButtonClick(buttonText: string): void
  {
    switch (buttonText)
    {
      case 'consola':
        this.consola=true;
        this.mostrarPista('VP1',valores.consola);
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
    this.restarPuntos(valores.eliminaOp);
  }

  fotoCompleta()
  {
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = "none";
    }
    this.imgP=true;
    this.restarPuntos(valores.imgP);
  }

  saltarFoto()
  {
    if(this.verificarPistas('.pista') && this.puntaje>=5)
    {
      this.cartelAdvertencia=true;
    }
    else
    {
      this.contBloqueoPistaSaltar--;
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

  mostrarYocultar(id:string,estado:boolean)
  {
    const pista = document.getElementById(id);
    if(pista)
    {
      if(estado){
        pista.style.visibility = 'visible';
      }else{
        pista.style.visibility = 'hidden';
      }
    }
  }

  //suma usos de pistas
  usoPista()
  {
    this.pistaUsos=this.pistaUsos+1;
  }

  memeRespuesta(resp:boolean)
  {
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = "none";
    }

    if(resp==false)
    {
      if(this.puntaje<25)
      {
        this.src="assets/DiCaprioIncorrectaSinPuntos.gif"
      }else
      {
        this.src="assets/DicaprioIncorrectaGIF.gif"
      }
    }else
    {
      this.src="assets/DicaprioCorrectaGIF.gif";
    }
  }
  
  // recibindo datos desde componente temporizador y actualiza los puntos totales en el servidor
  async recibindoDatosDesdeTemporizador(mensaje: string)
  {
    this.puntosExtra = Number(mensaje) * valores.tiempoSobrante;
    this.puntaje= this.puntaje + this.puntosExtra;
    //this.puntaje= this.puntaje + Number(mensaje) * valores.tiempoSobrante;
    await this.usuariosService.actualizarPartidasJugadas();
    await this.usuariosService.actualizarPuntos(this.puntaje);
    this.cartelFinal = true;
  }




}


*/




















import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { JuegoInt } from '../../../interfaces/juegoInt';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { MenuPrincipalComponent } from '../../menu-principal/menu-principal.component';

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
  tiempoSobrante = 1,
}

@Component
({
  selector: 'app-pista-juego',
  templateUrl: './pista-juego.component.html',
  styleUrls: ['./pista-juego.component.css']
})

export class PistaJuegoComponent implements OnInit
{

  @ViewChild(TemporizadorComponent) temporizador!: TemporizadorComponent
  @ViewChild(MenuPrincipalComponent) menuPrincipal!: MenuPrincipalComponent

  cartelAdvertenciaNuevito: boolean = false;

  contBloqueoPistaSaltar: number = 0;


  async abandonarPartida()
  {
    if(this.temporizador)
    {
      await this.usuariosService.actualizarPuntos(this.puntaje);
      this.temporizador.reiniciarTempo();
      this.mostrarYocultar("fotoA",false);
      this.cartelFinal = false;
      this.enviarDatos('finalizar');
    }
  }

  // Función de Abandonar Partida que llama a la función pausaTemporizador() del componente Temporizador
  pausaTemporizadorAux()
  {
    if(this.temporizador)
    {
      this.temporizador.pausaTemporizador();
    }
  }

  //Funcion que llama a playTemporizador() del componente temporizador
  playTemporizadorAux()
  {
    if(this.temporizador)
    {
      this.temporizador.playTemporizador();
    }
  }


  //envia a componente mostrar foto
  @Output() mensajeEnviado: EventEmitter<string> = new EventEmitter<string>();
  // recibe de mostrar foto
  @Input() juegos: JuegoInt[] = [];
  // envia al temporizador para cortar el timepo
  terminar: boolean = true;

  //carga los puntos del usuario en sesion
  puntaje: number = this.usuariosService.obtenerDatos().puntos;

  puntosExtra: number = 0;

  //controlador de inicio y fin
  empezar: boolean = false;
  //controlador de inicio, fin y advertencia
  cartelInicio: boolean = true;
  cartelFinal: boolean = false;
  cartelAdvertencia:boolean=false;
  //contador del arreglo de juegos
  contJuego: number = 0;
  //respuestas correctas y incorrectas
  correctas: JuegoInt[] = [];
  incorrectas: JuegoInt[] = [];
  // uso de pistas
  pistaUsos: number = 0;
  //control estados de las pistas
  eliminaOp: boolean=false; 
  imgP: boolean=false;
  consola: boolean=false;
  genero: boolean=false;
  fecha: boolean=false;
  // Link a la imagen
  src: string = "";

  constructor(private usuariosService: UsuariosService,)
  {
  }

  ngOnInit()
  {
    this.chequeoCosto();
  };


  iniciarPartida()
  {
    this.cartelInicio=false;
    this.empezar=true;
    this.src=this.juegos[this.contJuego].foto;
    this.mostrarYocultar("fotoA",true);
    this.generarValoresAleatoriosImagen();
  }

  async finalizarPartida()
  {
    console.log("Llegue al final");
    await this.usuariosService.guardarPartidaHistorial(this.puntaje,this.incorrectas.length,this.correctas.length,this.pistaUsos,new Date());
    this.mostrarYocultar("fotoA",false);
    this.cartelFinal=false;
    this.enviarDatos('finalizar');
  }

  async empezarOtra()
  {
    await this.usuariosService.guardarPartidaHistorial(this.puntaje,this.incorrectas.length,this.correctas.length,this.pistaUsos,new Date());
    this.cartelFinal=false;
    this.enviarDatos('otra');
  }

  // envia al componente padre
  enviarDatos(mensaje : string)
  {
    this.mensajeEnviado.emit(mensaje);
  }
  
  // manejo de respuestas
  async handleOptionButtonClick(optionText: string): Promise<void>
  { 
    let resp:boolean;
    this.reset();
    if(optionText == this.juegos[this.contJuego].nombre)
    {
      this.correctas.push(this.juegos[this.contJuego]);
      this.sumarPuntos(valores.acierto);
      resp=true;
    }else
    {
      this.incorrectas.push(this.juegos[this.contJuego]);
      this.restarPuntos(valores.fallo);
      resp=false;
    }
    console.log("contadorJiren: ", this.contBloqueoPistaSaltar);
    this.memeRespuesta(resp);
    this.desabilitarYhablitarAllBoton(true); 

    await new Promise<void>((resolve) => setTimeout(() =>
    {
      if(this.contBloqueoPistaSaltar == 9)
      {
        console.log("Se termino la partida"); 
        this.terminar = false;
      }else
      {
        this.desabilitarYhablitarAllBoton(false);
        this.juegos.splice(this.contJuego, 1);
        this.moverPorArreglo();
      } 

      /* this.desabilitarYhablitarAllBoton(false);
      if(this.juegos.length > 1)
      {
        this.juegos.splice(this.contJuego, 1);
        if(this.juegos.length === 1)
        {
          const boton = document.getElementById("jump");
          if(boton)
          {
            (boton as HTMLButtonElement).disabled = true;
            boton.style.background = 'red';
          }
        }
        this.moverPorArreglo();
      }else if(this.juegos.length === 0)
      {
        console.log("Se termino la partida"); 
        this.terminar = false;
      } */

      resolve(); // Resolve la promesa para continuar la ejecución

    }, 2000));

  }
  
  // recorre el arreglo
  moverPorArreglo()
  {
    console.log("juegos:", this.juegos.length);
    this.contBloqueoPistaSaltar++;
    
    console.log("contJuegos: ", this.contJuego);

    /* if(this.contBloqueoPistaSaltar == 9)
    {
      let boton = document.getElementById("jump");
      if(boton)
      {
        (boton as HTMLButtonElement).disabled = true;
        boton.style.background ='red';
      }
    } */

    if(this.contJuego>=this.juegos.length-1)
    {
      this.contJuego=0;
    }else
    {
      this.contJuego=this.contJuego+1;
    }
    this.generarValoresAleatoriosImagen();
    this.src=this.juegos[this.contJuego].foto;
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

  }

  sumarPuntos(puntos: number)
  {
    this.puntaje=this.puntaje+puntos;
    this.chequeoCosto(); 
  }

  restarPuntos(puntos: number)
  {
    if(this.puntaje>=puntos)
    {
      this.puntaje=this.puntaje-puntos;
    }
    this.chequeoCosto(); 
  }

  desabilitarYhablitarAllBoton(estado:boolean)
  {
    const elementos = document.querySelectorAll('.bloquear');
    elementos.forEach((elemento) =>
    {
      (elemento as HTMLButtonElement).disabled = estado;
    });
  }
  
  desabilitarYhablitarBoton(boton:string,estado:boolean)
  {
    const miBoton = document.getElementById(boton) as HTMLButtonElement;
    if(miBoton)
    {
      miBoton.disabled = estado;
      if(estado){
        miBoton.style.background ='red';
      }else{
        miBoton.style.background ='rgba(172, 255, 47, 0.784)';
      }
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

  chequeoCosto()
  {
    const elementosConClase = document.querySelectorAll(".pista");
    elementosConClase.forEach((elemento) =>
    {
      switch (elemento.id)
      {
        case 'eliminaOp':
          if(this.puntaje < valores.eliminaOp || this.eliminaOp){
            this.desabilitarYhablitarBoton(elemento.id,true);
          }
        else
        {
          this.desabilitarYhablitarBoton(elemento.id,false);
        }
          break;
        case 'imgP':
          if(this.puntaje < valores.imgP || this.imgP){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
          {
            this.desabilitarYhablitarBoton(elemento.id,false);
          }
          break;
        case 'jump':
          if(this.puntaje < valores.jump){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
          {
            this.desabilitarYhablitarBoton(elemento.id,false);
          }
          break;
        case 'consola':
          if(this.puntaje < valores.consola || this.consola)
          {this.desabilitarYhablitarBoton(elemento.id,true);}
          else
        {
          this.desabilitarYhablitarBoton(elemento.id,false);
        }
          break;
        case 'fecha':
          if(this.puntaje < valores.fecha || this.fecha){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
          {
            this.desabilitarYhablitarBoton(elemento.id,false);
          }
          break;
        case 'genero':
          if(this.puntaje < valores.genero || this.genero){

            this.desabilitarYhablitarBoton(elemento.id,true);
          }
          else
        {
          this.desabilitarYhablitarBoton(elemento.id,false);
        }
          break;
      }
    })
  }

  //funciones de imagen
  generarValoresAleatoriosImagen()
  {
    var clipPathValue="";
    let num = Math.floor(Math.random()*11);
    switch(num){
      case 0 :
        clipPathValue = "polygon(100% 0, 90% 0, 100% 100%, 100% 10%, 0 100%, 10% 100%, 0 0, 0 90%)";
      break;
      case 1 :
        clipPathValue = "polygon(0 35%, 90% 0, 0 100%, 100% 65%, 10% 100%, 100% 0)";
      break;
      case 2 :
        clipPathValue = "circle(20.0% at 21% 21%)";
      break;
      case 3 :
        clipPathValue = "polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)";
      break;
      case 4 :
        clipPathValue = "polygon(50% 85%, 100% 0, 50% 100%, 0 0)";
      break;
      case 5 :
        clipPathValue = "polygon(50% 0%, 55% 45%, 98% 35%, 55% 55%, 79% 91%, 50% 60%, 21% 91%, 45% 55%, 2% 35%, 45% 45%)";
      break;
      case 6 :
        clipPathValue = "polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 90% 10%, 90% 90%, 0 90%, 0 100%, 100% 100%, 100% 0%)";
      break;
      case 7 :
        clipPathValue = "polygon(40% 0%, 10% 45%, 100% 45%, 100% 55%, 10% 55%, 40% 100%, 0% 50%)";
      break;
      case 8 :
        clipPathValue = "polygon(0 45%, 90% 45%, 60% 0%, 100% 50%, 60% 100%, 90% 55%, 0 55%)";
      break;
      case 9 :
        clipPathValue = "polygon(50% 25%, 100% 0, 75% 0, 100% 100%, 100% 75%, 50% 0, 0 75%, 0 100%, 25% 0, 0 0)";
      break;
      case 10 :
        clipPathValue = "ellipse(10% 20% at 50% 25%)";
      break;
    }

    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = clipPathValue; 
    }
  }

  
  /*

  generarPoligonoPrueba()
  {

    //FROMA UNO
    let porcentajes = [];
    for(let i = 0; i < 16; i++)
    {
      let unPorcentaje = Math.round(Math.random() * 100);
      porcentajes.push("unPorcentaje");
    }

    let clip = 'polygon(' + porcentajes[0] + '% ' + porcentajes[1] + '%, ' +
    porcentajes[2] + '% ' + porcentajes[3] + '%, ' +
    porcentajes[4] + '% ' + porcentajes[5] + '%, ' +
    porcentajes[6] + '% ' + porcentajes[7] + '%, ' +
    porcentajes[8] + '% ' + porcentajes[9] + '%, ' +
    porcentajes[10] + '% ' + porcentajes[11] + '%, ' +
    porcentajes[12] + '% ' + porcentajes[13] + '%, ' +
    porcentajes[14] + '% ' + porcentajes[15] + '%)';

    return clip;
    

    
    //FROMA DOS
    const numVertices = Math.floor(Math.random() * 4) + 3; // Entre 3 y 6 vértices
    const vertices = [];
  
    for(let i = 0; i < numVertices; i++)
    {
      const x = Math.round(Math.random() * 100); // X entre 0 y 100
      const y = Math.round(Math.random() * 100); // Y entre 0 y 100
      vertices.push(`${x}% ${y}%`);
    }
  
    // Opcional: Agregar un 50% de probabilidad de generar un círculo o elipse
    if(Math.random() < 0.5)
    {
      const radioX = Math.round(Math.random() * 50); // Radio X entre 0 y 50
      const radioY = Math.round(Math.random() * 50); // Radio Y entre 0 y 50
      const centroX = Math.round(Math.random() * 100); // Centro X entre 0 y 100
      const centroY = Math.round(Math.random() * 100); // Centro Y entre 0 y 100
      const forma = Math.random() < 0.5 ? "circle" : "ellipse";
      const clipPathValue = `${forma}(${radioX}% ${radioY}% at ${centroX}% ${centroY}%)`;
      return clipPathValue;
    }else
    {
      const clipPathValue = `polygon(${vertices.join(", ")})`;
      return clipPathValue;
    } 
  }

  */
      
  // ----------- Funciones de las pistas -----------

  // maneja los botones de las pistas de texto
  handlePistaButtonClick(buttonText: string): void
  {
    switch (buttonText)
    {
      case 'consola':
        this.consola=true;
        this.mostrarPista('VP1',valores.consola);
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
    this.restarPuntos(valores.eliminaOp);
  }

  fotoCompleta()
  {
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = "none";
    }
    this.imgP=true;
    this.restarPuntos(valores.imgP);
  }

  saltarFoto()
  {
    this.contBloqueoPistaSaltar--;
    if(this.verificarPistas('.pista') && this.puntaje>=5)
    {
      this.pausaTemporizadorAux();
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

  mostrarYocultar(id:string,estado:boolean)
  {
    const pista = document.getElementById(id);
    if(pista)
    {
      if(estado){
        pista.style.visibility = 'visible';
      }else{
        pista.style.visibility = 'hidden';
      }
    }
  }

  //suma usos de pistas
  usoPista()
  {
    this.pistaUsos=this.pistaUsos+1;
  }

  memeRespuesta(resp:boolean)
  {
    const foto = document.getElementById('fotoA');
    if(foto)
    {
      foto.style.clipPath = "none";
    }

    if(resp==false)
    {
      if(this.puntaje<25)
      {
        this.src="assets/DiCaprioIncorrectaSinPuntos.gif"
      }else
      {
        this.src="assets/DicaprioIncorrectaGIF.gif"
      }
    }else
    {
      this.src="assets/DicaprioCorrectaGIF.gif";
    }
  }
  
  // recibindo datos desde componente temporizador y actualiza los puntos totales en el servidor
  async recibindoDatosDesdeTemporizador(mensaje: string)
  {
    this.puntosExtra = Number(mensaje) * valores.tiempoSobrante;
    this.puntaje = this.puntaje + this.puntosExtra;
    //this.puntaje= this.puntaje + Number(mensaje) * valores.tiempoSobrante;
    await this.usuariosService.actualizarPartidasJugadas();
    await this.usuariosService.actualizarPuntos(this.puntaje);
    this.cartelFinal = true;
  }



}

