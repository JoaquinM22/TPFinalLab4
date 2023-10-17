import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { withFetch } from '@angular/common/http';

@Component({
  selector: 'app-mostrar-foto',
  templateUrl: './mostrar-foto.component.html',
  styleUrls: ['./mostrar-foto.component.css']
})

export class MostrarFotoComponent implements OnInit
{

 
  ngOnInit(){}

  //FORMA PROPIA CON FETCH
  // LINK SALVADOR = https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b
  constructor()
  {
    const datosJuegos: any[] = [];
    
    
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
    
    //FORMA DE EJEMPLO - Tira los 20 res de la PAGINA 1
    /*
    fetch("https://api.rawg.io/api/games?key=9c7f75a955784bf9aa646f60ad51102b&page=1")
    .then(res => res.json())
    .then(data =>
    {
      console.log(data);
      for(let i = 0; i < 20; i++)
      {
        datosJuegos.push(data.results[i]);
      }
    })
    .catch(e => console.error(new Error(e)));
    */

    console.log("Los 500 juegos son: ", datosJuegos); 
    
  }
  


  //FORMA QUE ENSEÑO EL PROFE
  /*
  constructor()
  {
    function PedidoAPI()
    {
      return new Promise((resolve, reject) =>
      {
        const data = null;
      
        const xhr = new XMLHttpRequest(); //1
        xhr.withCredentials = true;

        xhr.open('GET', 'https://rawg-video-games-database.p.rapidapi.com/games');
        xhr.setRequestHeader('X-RapidAPI-Key', '9c7f75a955784bf9aa646f60ad51102b');
        xhr.setRequestHeader('X-RapidAPI-Host', 'rawg-video-games-database.p.rapidapi.com');
      

        xhr.onload = function()
        { //4
          if(xhr.status == 200)
          {
            console.log('respuesta del servidor o API');
            console.log(this.response);
            let data = JSON.parse(this.response);
            resolve(data);
          }else
          {
            reject(new Error('error en la conexion'));
          }
        };
      
        xhr.send(data); //5
      });
    }

    async function asyncCall()
    {
      console.log('calling');
      try
      { 
          let result = await PedidoAPI();
          console.log('respuesta JSON');
          console.log(result); 
          //console.log('joke');
          //console.log(result.value); sacar para wwel no return
          //aca llamaria a la funcion de agregar elementos
          //document.getElementById('chuck').innerHTML = result.value;
          //console.log(result.value);
          //agregarElementos(result.value);
      }catch(error)
      {
        console.log(error);
      };
    }
      
    //setInterval(asyncCall,5000);
    asyncCall();
  }
  */


  //FORMA DE LA PAGINA DE RAWG.IO
  /*
  constructor()
  {
    //const apiKey = '9c7f75a955784bf9aa646f60ad51102b';

    fetch('https://rawg.io/api/games?key={9c7f75a955784bf9aa646f60ad51102b}')
    .then(res => res.json())
    .then(data =>
    {
      console.log(data);
    })
    .catch(e => console.error(new Error(e)));
  }
  */


  //RAPID API - Node.js (fetch)
  /*
  constructor()
  {
    const fetch = require('node-fetch');

    const url = 'https://rawg-video-games-database.p.rapidapi.com/games';
    const options =
    {
      method: 'GET',
      headers:
      {
        'X-RapidAPI-Key': '9c7f75a955784bf9aa646f60ad51102b',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };

    async function asyncCall()
    {
      try
      {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      }catch(error)
      {
        console.error(error);
      }
    }

    asyncCall();
  }
  */


  //RAPID API - fetch con JS
  /*
  constructor()
  {
    const url = 'https://rawg-video-games-database.p.rapidapi.com/games';
    const options =
    {
      method: 'GET',
      headers:
      {
        'X-RapidAPI-Key': '9c7f75a955784bf9aa646f60ad51102b',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };

    async function asyncCall()
    {
      try
      {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      }catch(error)
      {
        console.error(error);
      }
    }

    asyncCall();
  }
  */


  //FORMA HTTP REQUEST
  /*
  constructor()
  {
    console.log("bocaaaaa 1");
    async function asyncCall()
    {
      const url = 'https://api.rawg.io/api/games';
      console.log("bocaaaaa 2");

      const options =
      {
        method: 'GET',
        headers:
          {
          'X-RapidAPI-Key': '9c7f75a955784bf9aa646f60ad51102b',
          'X-RapidAPI-Host': 'https://api.rawg.io/api/games'
        }
      };

      console.log("bocaaaaa 3");

      try
      {
        console.log("bocaaaaa   4");
        const response = await fetch(url, options);
        console.log("bocaaaaa   5");
        const result = await response.text();
        console.log("bocaaaaa   6");
        console.log(result);
        console.log("bocaaaaa   funca");
      }catch(error)
      {
        console.error(error);
      }    
      console.log("bocaaaaa 7");
    }  

    asyncCall();
  }
  */
  

  //EJEMPLO CON API POKEMON 
  /*
  constructor()
  {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(res => res.json())
    .then(data =>
    {
        console.log(data);
    })
    .catch(e => console.error(new Error(e)));
  }
  */
  

  //FORMA 1 DE CHATGPT
  /*
  games: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit()
  {
    this.getGames();
  }

  getGames()
  {
    this.http.get('https://api.rawg.io/api/games',
    {
      params:
      {
        apiKey: '9c7f75a955784bf9aa646f60ad51102b',
      },
    })
    .subscribe((response) =>
    {
      this.games = response;
    },(error) =>
    {
      console.error(error);
    });
  }
  */


  //FORMA 2 DE CHATGPT
  /*
  games: any = {};

  constructor(private http: HttpClient)
  {
    const apiKey = '9c7f75a955784bf9aa646f60ad51102b';
  }

  ngOnInit()
  {
    this.getGames();
  }

  getGames()
  {
    this.http.get('https://rawg.io/api/games?tken&key={apiKey}')
    .subscribe((response) =>
    {
      this.games = response;
    },(error) =>
    {
      console.error(error);
    });
  }
  */


  //FORMA 3 DE CHATGPT
  /*
  //games: any[] = [];
  games: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit()
  {
    this.getGames();
  }

  getGames()
  {
    this.http.get('https://api.rawg.io/api/games',
    {
      params:
      {
        api_key: '9c7f75a955784bf9aa646f60ad51102b',
      },
    })
    .subscribe((response) =>
    {
      console.log(response);
      //this.games = response.json().results;
    },(error) =>
    {
      console.error(error);
    });
  }
  */
 
  
}
