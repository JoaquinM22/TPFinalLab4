import { Injectable } from '@angular/core';

@Injectable
({
  providedIn: 'root'
})

export class MinutosTempoService
{

  minutos: number = 10;
  segundos: number = 15;

  constructor()
  {

  }
}
