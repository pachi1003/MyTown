import { Component, OnInit } from '@angular/core';
import {AyuntamientosService} from '../services/ayuntamientos.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  municipios: any;
  constructor(public servicioAyuntamiento: AyuntamientosService) {
  }

  ngOnInit() {
    this.servicioAyuntamiento.getTowns().subscribe( ayuntamientos => {
      this.municipios = ayuntamientos;
      console.log(ayuntamientos);
    });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

