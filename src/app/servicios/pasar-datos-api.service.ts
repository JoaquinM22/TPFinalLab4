import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable
({
  providedIn: 'root'
})

export class PasarDatosAPIService
{
  constructor() { }

  private valorCompartidoSource = new BehaviorSubject<any>(null);
  valorCompartido$ = this.valorCompartidoSource.asObservable();

  asignarValorCompartido(valor: any)
  {
    this.valorCompartidoSource.next(valor);
  }
  
}
