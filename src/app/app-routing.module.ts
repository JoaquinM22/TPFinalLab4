import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { GuardiaLogueoGuard } from './guardia/guardia-logueo.guard';

const routes: Routes = [
  {path: 'menu', component:MenuPrincipalComponent, canActivate: [GuardiaLogueoGuard]},
  {path: 'login', component:LoginUsuarioComponent},
  {path: '**', component:MenuInicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
