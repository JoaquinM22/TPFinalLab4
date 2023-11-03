import { Component } from '@angular/core';

@Component
({
  selector: 'app-mostrar-foto',
  templateUrl: './mostrar-foto.component.html',
  styleUrls: ['./mostrar-foto.component.css']
})

export class MostrarFotoComponent
{

  cartelInicio: boolean = true;
  empezar: boolean =false;
  datosJuegos: any[] = [];
  nombresJuegos: string[] = [];
  modoSeleccionado: string = 'modoNormal';
  generoSeleccionado: string = 'porDefecto';

  constructor()
  {
  }


  //BOTON LLAMA A LA API
  llamarAPI()
  {
    let numeroRandom: number;

    switch (this.modoSeleccionado)
    {
      case "modoNormal":
        numeroRandom = Math.floor(Math.random() * 25) + 1;
        console.log("Modo Normal");

        this.getNombresJuegos((numeroRandom + 5));
        //Hace un timeout para que se carge completamente el arreglo de nombres
        setTimeout(() => { this.getJuegos(numeroRandom, this.generoSeleccionado) }, 1000);
        console.log("Entre al PorDefecto, Estoy debajo del setInterval");
      break;
      case "modoMedio":
        numeroRandom = Math.floor(Math.random() * 50) + 1;
        console.log("Modo Medio");

        this.getNombresJuegos((numeroRandom + 5));
        //Hace un timeout para que se carge completamente el arreglo de nombres
        setTimeout(() => { this.getJuegos(numeroRandom, this.generoSeleccionado) }, 1000);
      break;
      case "modoDificil":
        numeroRandom = Math.floor(Math.random() * 500) + 1;
        console.log("Modo Dificil");

        this.getNombresJuegos((numeroRandom + 5));
        //Hace un timeout para que se carge completamente el arreglo de nombres
        setTimeout(() => { this.getJuegos(numeroRandom, this.generoSeleccionado) }, 1000);
      break;
    }
    
    console.log("Llamada de la API exitosa");
    console.log("Genero Elegido", this.generoSeleccionado);
  }
  //LLAMA A LA API Y GUARDA LOS JUEGOS
  
  getJuegos(i: number, genero: string)
  {
    console.log("Entre a GetJuegos");
    class Juego
    {
      // Atributos
      nombre: string;
      foto: string;
      fecha: string;
      generos: string[];
      plataformas: string[];
      nombresOpciones: string[];
      visible: boolean;
    
      // Constructor
      constructor(nombre: string, foto: string, fecha: string, generos: string[], plataformas: string[], nombresOpciones: string[])
      {
        this.nombre = nombre;
        this.foto = foto;
        this.fecha = fecha;
        this.generos = generos;
        this.plataformas = plataformas;
        this.nombresOpciones = nombresOpciones;
        this.visible = true;
      }
    }

    let arregloDeJuegos: Juego[] = [];

    let API_Juegos;
    if(genero == 'porDefecto')
    {
      API_Juegos =
    "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page_size=10&page=" + i;
    }else
    {
      API_Juegos =
    "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page_size=10&page=" + i + "&genres=" + genero;
    }

    fetch(API_Juegos)
    .then(res => res.json())
    .then(data =>
    {
      console.log("Inicio segundo fetch");
      console.log("Respuesta data API: ", data);

      for(const juego of data.results)
      {

        //Carga nombre Juego
        const nuevoNombre: string = juego.name;

        //Carga URL fotos en un arreglo auxiliar
        const nuevasFotos: string[] = [];
        for(const unaFoto of juego.short_screenshots)
        {
          nuevasFotos.push(unaFoto.image);
        }

        //Como hay juegos que tienen menos de 7 fotos, con el do while
        //me aseguro que tome una posicion valida
        let posRandom;
        do
        {

          posRandom = Math.floor(Math.random() * 6);

        }while(posRandom >= nuevasFotos.length);

        //Cargo esa URL random valida en nuevaFoto
        const nuevaFoto: string = nuevasFotos[posRandom];

        //Carga la fecha del juego
        const nuevaFecha: string = juego.released;

        //Carga los generos del juego
        const nuevosGeneros: string[] = [];
        for(const unGenero of juego.genres)
        {
          if(unGenero.name == 'Action')
          {
            nuevosGeneros.push('Accion');
          }else if(unGenero.name == 'Indie')
          {
            nuevosGeneros.push(unGenero.name);
          }else if(unGenero.name == 'Adventure')
          {
            nuevosGeneros.push('Aventura');
          }else if(unGenero.name == 'RPG')
          {
            nuevosGeneros.push(unGenero.name);
          }else if(unGenero.name == 'Strategy')
          {
            nuevosGeneros.push('Estrategia');
          }else if(unGenero.name == 'Shooter')
          {
            nuevosGeneros.push(unGenero.name);
          }else if(unGenero.name == 'Casual')
          {
            nuevosGeneros.push(unGenero.name);
          }else if(unGenero.name == 'Simulation')
          {
            nuevosGeneros.push('Simulacion');
          }else if(unGenero.name == 'Puzzle')
          {
            nuevosGeneros.push(unGenero.name);
          }else if(unGenero.name == 'Arcade')
          {
            nuevosGeneros.push(unGenero.name);
          }else if(unGenero.name == 'Platformer')
          {
            nuevosGeneros.push('Plataformas');
          }else if(unGenero.name == 'Massively Multiplayer')
          {
            nuevosGeneros.push('Multijugador masivo');
          }else if(unGenero.name == 'Racing')
          {
            nuevosGeneros.push('Carreras');
          }else if(unGenero.name == 'Sports')
          {
            nuevosGeneros.push('Deportes');
          }else if(unGenero.name == 'Fighting')
          {
            nuevosGeneros.push('Lucha');
          }else if(unGenero.name == 'Family')
          {
            nuevosGeneros.push('Familiar');
          }else if(unGenero.name == 'Board Games')
          {
            nuevosGeneros.push('Juegos de Mesa');
          }else if(unGenero.name == 'Educational')
          {
            nuevosGeneros.push('Educativos');
          }else if(unGenero.name == 'Card')
          {
            nuevosGeneros.push('De Cartas');
          }
        }

        //Carga las plataformas del juego, evita cargar plataformas repetidas
        const nuevasPlataformas: string[] = [];
        for(const unaPlataforma of juego.platforms)
        {
          const nombreDeLaPlataforma = unaPlataforma.platform.name;
          if(nombreDeLaPlataforma == 'macOS' || nombreDeLaPlataforma == 'Linux')
          {
            let existe = nuevasPlataformas.includes('PC')
            if(existe == false)
            {
              nuevasPlataformas.push('PC');
            }
          }else
          {
            let existe = nuevasPlataformas.includes(nombreDeLaPlataforma)
            if(existe == false)
            {
              nuevasPlataformas.push(nombreDeLaPlataforma);
            }
          }
        }


        //Del arreglo nombres, cambia el orden de los datos, de manera que pese a que
        //siempre cargue las posiciones 0, 1, 2 y 3. Los datos seran siempre al azar
        function randomizarNombres(arregloNombres: string[])
        {
          for(let i = arregloNombres.length - 1; i > 0; i--)
          {
            const j = Math.floor(Math.random() * (i + 1));
            [arregloNombres[i], arregloNombres[j]] = [arregloNombres[j], arregloNombres[i]];
          }
        }

        const nuevosNombresOpciones = [];
        randomizarNombres(this.nombresJuegos);
        nuevosNombresOpciones.push(this.nombresJuegos[0]);
        nuevosNombresOpciones.push(this.nombresJuegos[1]);
        nuevosNombresOpciones.push(this.nombresJuegos[2]);
        nuevosNombresOpciones.push(this.nombresJuegos[3]);

        //Sobreescribo una posicion random por el nombre real del juego.
        const randomNum = Math.floor(Math.random() * 4);
        nuevosNombresOpciones[randomNum] = nuevoNombre;

        const nuevoJuego = new Juego
        (
          nuevoNombre,
          nuevaFoto,
          nuevaFecha,
          nuevosGeneros,
          nuevasPlataformas,
          nuevosNombresOpciones
        );
        arregloDeJuegos.push(nuevoJuego);
      }

      this.datosJuegos = arregloDeJuegos;

      //Diferentes console.log() para ver si hay errores
      console.log("Juego de la POS 0: ",this.datosJuegos[0]);
      console.log("Se termino de ejecutar segundo fetch");

      console.log("Juego de la POS 0: ",this.datosJuegos[0].generos);
      console.log("Juego de la POS 1: ",this.datosJuegos[1].generos);
      console.log("Juego de la POS 2: ",this.datosJuegos[2].generos);
      console.log("Juego de la POS 3: ",this.datosJuegos[3].generos);
      console.log("Juego de la POS 4: ",this.datosJuegos[4].generos);
      console.log("Juego de la POS 5: ",this.datosJuegos[5].generos);
      console.log("Juego de la POS 6: ",this.datosJuegos[6].generos);
      console.log("Juego de la POS 7: ",this.datosJuegos[7].generos);
      console.log("Juego de la POS 8: ",this.datosJuegos[8].generos);
      console.log("Juego de la POS 9: ",this.datosJuegos[9].generos);

      console.log("Los 10 juego son", this.datosJuegos);

      console.log("Se cargo correctamente this.datosJuegos");

      console.log("Le pase los datos a Pista component");
    })
    .catch(e => console.error(new Error(e)));
  
  }


  getNombresJuegos(i: number)
  {
    let arregloDeNombres: string[] = [];
    let nombres =
    "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page_size=40&page=" + i;

    fetch(nombres)
    .then(res => res.json())
    .then(data =>
    {
      console.log("Cargando solo nombres");
      for(const juego of data.results)
      {
        arregloDeNombres.push(juego.name);
      }
      console.log("Se cargaron todos los nombres");

      this.nombresJuegos = arregloDeNombres;

      console.log("Los 40 nombres son", this.nombresJuegos);
      console.log("Se cargo correctamente this.nombresJuegos");
    })
    .catch(e => console.error(new Error(e)));
  }

  iniciarPartida(){
    this.llamarAPI();
    this.empezar=true;
    this.cartelInicio=false;
  }

  recibindoDatosDesdeTemporizador(mensaje: string) {
    switch(mensaje){
      case 'otra':
        this.empezar=false;
        this.cartelInicio=true;
        break;
      case 'terminar':
        break;
    }
  }
}
