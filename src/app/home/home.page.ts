import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
  slides = [
    {
      img: '../../assets/images/image1.png',
      titulo: 'Bienvenido a MyTown',
      descripcion: 'En esta guía le mostraremos como <br>sacar el máximo partido a MyTown'
    },
    {
      img: '../../assets/images/image2.png',
      titulo: 'Sugerencias y quejas',
      descripcion: 'Comenta y observa comentarios que han propuesto para tu ayuntamiento'
    },
    {
      img: '../../assets/images/image3.png',
      titulo: 'Valora los comentarios',
      descripcion: 'Da me gusta en los comentarios para<br>que se conviertan en destacados',
      button: 'Yes'
    }
  ];
}




