import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { Tema } from '../models/tema';
import { map } from 'rxjs/operators';
import {UsuarioService} from '../services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {AyuntamientosService} from '../services/ayuntamientos.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.page.html',
  styleUrls: ['./temas.page.scss'],
})
export class TemasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  ayuntamientos: any;
  ayuntamiento: any;
  ayuntamientoId: any;
  users: any;
  argumento: any;
  data: any;
  userId: any;
  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private usuario: UsuarioService,
              private activatedRoute: ActivatedRoute,
              private servicioAyuntamiento: AyuntamientosService) {
  }
  ngOnInit() {
    this.argumento = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.argumento == null) {
      this.afAuth.authState.subscribe(data => {
        this.userId = data.uid;
      });
    }
    this.servicioAyuntamiento.getTowns().subscribe( ayuntamientos => {
        this.ayuntamientos = ayuntamientos;
    });
    this.usuario.getUsers().subscribe( users => {
      users.map( user => {
        this.users = user.payload.doc.data();
        if (this.argumento != null) {
          for (const i of this.ayuntamientos) {
            if (this.argumento === i.id) {
              this.ayuntamiento = i.nombre;
              this.ayuntamientoId = i.id;
            }
          }
        } else {
          if (this.users.uid === this.userId) {
            this.ayuntamiento = this.users.municipio.nombre;
            this.ayuntamientoId = this.users.municipio.id;
          }
        }
      });
    });
  }
  loadData(event) {
    console.log('cargando datos...');
    setTimeout(() => {
      if ( this.data.length > 30) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      const siguientes = new Array(12);
      this.data.push( ...siguientes );
      event.target.complete();
    }, 1000);
  }
}
