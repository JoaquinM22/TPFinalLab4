import { Component } from '@angular/core';
import { MostrarFotoComponent } from './mostrar-foto/mostrar-foto.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPFinal_Lab4';

 /*  @ViewChild('miComponente') miComponente: MostrarFotoComponent;

  iniciarMiComponente() {
    // Llama al método iniciarComponente del componente hijo
    this.miComponente.iniciarComponente();
  } */
}
