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

        const numeroRandom = Math.floor(Math.random() * 100);

        this.getJuegos(numeroRandom);
 
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
      fotos: String[];
      fecha: String;
      generos: String[];
      plataformas: String[];
    
      // Constructor
      constructor(nombre: String, fotos: String[], fecha: String, generos: String[], plataformas: String[])
      {
        this.nombre = nombre;
        this.fotos = fotos;
        this.fecha = fecha;
        this.generos = generos;
        this.plataformas = plataformas;
      }
    }

    const API_Juegos =
    "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page_size=40&page=" + i;

    fetch(API_Juegos)
    .then(res => res.json())
    .then(data =>
    {
      console.log("Respuesta data API: ", data);

      for(const juego of data.results)
      {

        let nuevoNombre = juego.name;

        let nuevasFotos: any[] =[];
        for(const unaFoto of juego.short_screenshots)
        {
          nuevasFotos.push(unaFoto.image);
        }

        let nuevaFecha = juego.released;

        let nuevosGeneros: any[] =[];
        for(const unGenero of juego.genres)
        {
          nuevosGeneros.push(unGenero.name);
        }

        let nuevasPlataformas: any[] =[];
        for(const unaPlataforma of juego.platforms)
        {
          let nombreDeLaPlataforma = unaPlataforma.platform.name;
          if(nombreDeLaPlataforma == 'macOS' || nombreDeLaPlataforma == 'Linux')
          {
            nuevasPlataformas.push('PC');
          }else
          {
            nuevasPlataformas.push(nombreDeLaPlataforma);
          }
        }

        const nuevoJuego = new Juego
        (
          nuevoNombre,
          nuevasFotos,
          nuevaFecha,
          nuevosGeneros,
          nuevasPlataformas
        );
        this.datosJuegos.push(nuevoJuego);
      }

      console.log("Juego de la POS 0: ",this.datosJuegos[0]);
      

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
          const numeroRandom = Math.floor(Math.random() * 40);
          const posRandom = Math.floor(Math.random() * 6);

          const imagen = document.createElement("img");

          imagen.src = this.datosJuegos[numeroRandom].fotos[posRandom];
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
