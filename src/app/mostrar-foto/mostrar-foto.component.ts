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
  
  Juegos: any[] = [];
  
  foto: String = "url";


  constructor()
  {
    const estavacio = (this.Juegos == null);
    console.log(estavacio);
    console.log(this.Juegos);
    if(this.Juegos.length == 0)
    {
      console.log("Entre al if");
      this.getJuegos();
    }
    //const datosJuegos: any[] = [];

    //FORMA QUE FUNCIONA Pokes
    /*
    class poke
    {
      // Atributos
      id: number;
      nombre: string;
    
      // Constructor
      constructor(id: number, nombre: string)
      {
        this.id = id;
        this.nombre = nombre;
      }
    }

    let pokedex = new Array<Object>();
    
    fetch("https://pokeapi.co/api/v2/pokedex/1/")
    .then(res => res.json())
    .then(data =>
    {
      console.log(data);
      for(const unPoke of data.pokemon_entries)
      {
        const unPokemon = new poke
        (
          unPoke.entry_number,
          unPoke.pokemon_species.name,
        );
        pokedex.push(unPokemon);
        
      }
      
      console.log("El poke de la pos 0 es: ", pokedex[0]);
      
    })
    .catch(e => console.error(new Error(e)));

    function codigo()
    {
      console.log("Poke de pos 0, fuera del then: ", pokedex[0]);
    }
    
    // Llama a la función después de un retraso de 3000 milisegundos (3 segundos).
    setTimeout(codigo, 3000);
    */
    
    
    //FORMA COMPLETA, TIRA LOS 500 JUEGOS
    /*
    for(let i = 1; i < 26; i++)
    {
      const API_Juegos = "https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page=" + i;

      fetch(API_Juegos)
      .then(res => res.json())
      .then(data =>
      {
        for(let i = 0; i < 20; i++)
        {
          datosJuegos.push(data.results[i]);
        }
      })
      .catch(e => console.error(new Error(e)));
    }
    */


    //FORMA DE EJEMPLO - Tira los 20 res de la PAGINA 1
    /*
    fetch("https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page=1")
    .then(res => res.json())
    .then(data =>
    {
      console.log("Respuesta data API: ", data);
      for(let i = 0; i < 20; i++)
      {
        datosJuegos.push(data.results[i]);
      }


      const numeroRandom = Math.floor(Math.random() * 20);
      const unJuegoRandom = datosJuegos[numeroRandom];
      
      const textoDeMiHTML = document.querySelector("#fotoJuego");

      const imagenJuego = document.createElement("img");
      imagenJuego.src = unJuegoRandom.short_screenshots[0].image;
      imagenJuego.width = 400;
      imagenJuego.height = 341;
      imagenJuego.alt = "Imagen aleatoria";

      if(textoDeMiHTML != null)
      {
        //textoDeMiHTML.replaceWith(imagenJuego);
      }

      this.foto = unJuegoRandom.short_screenshots[0].image;


    })
    .catch(e => console.error(new Error(e)));
    */
  
    /*
    const datosJuegos: any[] = [];

    fetch("https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page=1")
    .then(res => res.json())
    .then(data =>
    {
      console.log("Respuesta data API: ", data);
      for(let i = 0; i < 20; i++)
      {
        datosJuegos.push(data.results[i]);
      }

      console.log(datosJuegos[0]);
      this.Juegos = datosJuegos;

    })
    .catch(e => console.error(new Error(e)));
    */
  }


  //LLAMA A LA API Y GUARDA LOS JUEGOS
  getJuegos()
  {
    //const datosJuegos: any[] = [];

    fetch("https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page=1")
    .then(res => res.json())
    .then(data =>
    {
      console.log("Respuesta data API: ", data);
      for(let i = 0; i < 20; i++)
      {
        //datosJuegos.push(data.results[i]);
        this.Juegos.push(data.results[i]);
      }

      //console.log(datosJuegos[0]);
      //this.Juegos = datosJuegos;

      console.log("Juego de la POS 0: ",this.Juegos[0]);

      //const numeroRandom = Math.floor(Math.random() * 20);
      //this.foto = this.Juegos[numeroRandom].short_screenshots[0].image;

    })
    .catch(e => console.error(new Error(e)));
  
  }

  guardarDatosAPI()
  {
    localStorage.setItem('Juegos', JSON.stringify(this.Juegos));
  }

  recuperarDatosAPI()
  {
    //this.Juegos = JSON.parse(localStorage.getItem("Juegos"));
  }

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
                const numeroRandom = Math.floor(Math.random() * 20);

                const imagen = document.createElement("img");
                imagen.src = this.Juegos[numeroRandom].short_screenshots[0].image;
                imagen.width = 400;
                imagen.height = 341;
                imagen.alt = "Imagen aleatoria"
                imagen.title = "Imagen aleatoria";

                texto.replaceChildren(imagen);
            }
        });
    }
  }

  
  
  ngOnInit()
  {
    //this.getJuegos();
    //this.guardarDatosAPI();
    this.generarFoto();

  }


 
}
