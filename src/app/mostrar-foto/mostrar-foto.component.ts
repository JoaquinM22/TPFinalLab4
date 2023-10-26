import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-foto',
  templateUrl: './mostrar-foto.component.html',
  styleUrls: ['./mostrar-foto.component.css']
})

export class MostrarFotoComponent implements OnInit
{

  //FORMA PROPIA CON FETCH
  // LINK SALVADOR = https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b
  
  datosJuegos: any[] = [];
  nombresJuegos: String[] = [];
  
  //foto: String = "url";

  constructor()
  {

  }


  //BOTON LLAMA A LA API
  llamarAPI()
  {
    const botonLlamarAPI = document.querySelector("#botonLlamarAPI");
    if(botonLlamarAPI)
    {
      botonLlamarAPI.addEventListener("click", (evento) =>
      {
        evento.preventDefault();

        let numeroRandom = Math.floor(Math.random() * 100) + 1;

        this.getNombresJuegos((numeroRandom+5));
        //Hace un timeout para que se carge completamente el arreglo de nombres
        setTimeout(() => {this.getJuegos(numeroRandom)}, 1000);
 
      });
      console.log("Llamada de la API exitosa");
    }
  }


  //LLAMA A LA API Y GUARDA LOS JUEGOS
  getJuegos(i: number)
  {
    class Juego
    {
      // Atributos
      nombre: String;
      foto: String;
      fecha: String;
      generos: String[];
      plataformas: String[];
      nombresOpciones: String[];
      visible: boolean;
    
      // Constructor
      constructor(nombre: String, foto: String, fecha: String, generos: String[], plataformas: String[], nombresOpciones: String[])
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

    let API_Juegos =
    "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page_size=10&page=" + i;

    fetch(API_Juegos)
    .then(res => res.json())
    .then(data =>
    {
      console.log("Inicio segundo fetch");
      console.log("Respuesta data API: ", data);

      for(const juego of data.results)
      {

        //Carga nombre Juego
        const nuevoNombre: String = juego.name;

        //Carga URL fotos en un arreglo auxiliar
        const nuevasFotos: String[] = [];
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
        const nuevaFoto: String = nuevasFotos[posRandom];

        //Carga la fecha del juego
        const nuevaFecha: String = juego.released;

        //Carga los generos del juego
        const nuevosGeneros: String[] = [];
        for(const unGenero of juego.genres)
        {
          nuevosGeneros.push(unGenero.name);
        }

        //Carga las plataformas del juego, evita cargar plataformas repetidas
        const nuevasPlataformas: String[] = [];
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
        function randomizarNombres(arregloNombres: String[])
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
        this.datosJuegos.push(nuevoJuego);
      }

      //Diferentes console.log() para ver si hay errores
      console.log("Juego de la POS 0: ",this.datosJuegos[0]);
      console.log("Se termino de ejecutar segundo fetch");

      console.log(this.datosJuegos[0].nombresOpciones[0]);
      console.log(this.datosJuegos[0].nombresOpciones[1]);
      console.log(this.datosJuegos[0].nombresOpciones[2]);
      console.log(this.datosJuegos[0].nombresOpciones[3]);

      console.log("Arreglo juegos Completo: ",this.datosJuegos);

      console.log("Juego de la POS 1: ",this.datosJuegos[1]);
      console.log("Juego de la POS 2: ",this.datosJuegos[2]);
      console.log("Juego de la POS 3: ",this.datosJuegos[3]);

    })
    .catch(e => console.error(new Error(e)));
  
  }


  getNombresJuegos(i: number)
  {
    let nombres =
    "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page_size=40&page=" + i;

    fetch(nombres)
    .then(res => res.json())
    .then(data =>
    {
      console.log("Cargando solo nombres");
      for(const juego of data.results)
      {
        this.nombresJuegos.push(juego.name);
      }
      console.log("Se cargaron todos los nombres");

    })
    .catch(e => console.error(new Error(e)));
  }


  //BOTON MUESTRA FOTO RANDOM DEL ARREGLO
  generarFoto()
  {
    const botonGenerarFoto = document.querySelector("#botonGenerarFoto");
    if(botonGenerarFoto)
    {
      botonGenerarFoto.addEventListener("click", (evento) =>
      {
        evento.preventDefault();

        const texto = document.querySelector("#texto");
        if(texto)
        {
          //Genera numeros del 0 al 9, que son las posiciones
          //validas del arreglo de juegos
          let numeroRandom = Math.floor(Math.random() * 10);
          
          const imagen = document.createElement("img");
          imagen.src = this.datosJuegos[numeroRandom].foto;
          imagen.width = 800;
          imagen.height = 500;
          imagen.alt = "Imagen aleatoria"
          imagen.title = "Imagen aleatoria";

          texto.replaceChildren(imagen);
        }
      });
    }
  }
  

  ngOnInit()
  {
    this.llamarAPI();
    this.generarFoto();
  }

}
