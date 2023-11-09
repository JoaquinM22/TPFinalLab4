/* import { CanActivateFn } from '@angular/router';


export const guardiaLogueoGuard: CanActivateFn = (route, state) =>
{
  
  return true;
  
}; */


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../servicios/usuarios.service';

@Injectable
({
  providedIn: 'root',
})

export class GuardiaLogueoGuard implements CanActivate
{
  constructor(private usuariosService: UsuariosService, private router: Router) {}

  canActivate
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    //Verifica si el usuario esta logueado
    if(this.usuariosService.login)
    {
      return true;
    }else
    {
      //Mensaje de que no esta logueado
      alert("Necesita loguearse para usar esta funcion");
      this.router.navigate(['/']); //Redirecciona al inicio
      return false;
    }
  }
}
 