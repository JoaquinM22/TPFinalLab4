import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit
{
  constructor(private usuariosService: UsuariosService) {}

  listaUsuarios: Usuario[] |undefined = [];

  ngOnInit(): void {
    this.mostrarRanking();
  }

  async mostrarRanking()
  {
    this.listaUsuarios = await this.usuariosService.getUsuarios();
    console.log(this.listaUsuarios);
  }
}
