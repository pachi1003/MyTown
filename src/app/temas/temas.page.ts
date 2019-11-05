import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { Tema } from '../models/tema';
import { map } from 'rxjs/operators';
import {UsuarioService} from '../services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {AyuntamientosService} from '../services/ayuntamientos.service';
import {TemasService} from '../services/temas.service';
import { OpenTemaPage } from '../open-tema/open-tema.page';

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
  temas: any[];
  users: any;
  userId: any;
  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private usuario: UsuarioService,
              private activatedRoute: ActivatedRoute,
              private servicioAyuntamiento: AyuntamientosService,
              private servicioTemas: TemasService,
              private modal: ModalController) {
  }
  ngOnInit() {
    this.ayuntamientoId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.ayuntamientoId == null) {
      this.afAuth.authState.subscribe(data => {
        if (data != null) {
          this.userId = data.uid;
        }
      });
    }
    this.servicioAyuntamiento.getTowns().subscribe( ayuntamientos => {
        this.ayuntamientos = ayuntamientos;
    });
    this.usuario.getUsers().subscribe( users => {
      this.users = users;
      if (this.ayuntamientoId != null) {
        for (const i of this.ayuntamientos) {
          if (this.ayuntamientoId === i.id) {
            this.ayuntamiento = i.nombre;
            this.ayuntamientoId = i.id;
          }
        }
      } else {
        for (const c of this.users) {
          if (c.uid === this.userId) {
            this.ayuntamiento = c.municipio.nombre;
            this.ayuntamientoId = c.municipio.id;
          }
        }
      }
      this.servicioTemas.getTemas(this.ayuntamientoId).subscribe( temas => {
        this.temas = temas;
      });
    });
  }
  loadData(event) {
    console.log('cargando datos...');
    setTimeout(() => {
      if ( this.temas.length > 30) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      const siguientes = new Array(12);
      this.temas.push( ...siguientes );
      event.target.complete();
    }, 1000);
  }
  openTema(tema1) {
    console.log(tema1);
    this.modal.create({
        component: OpenTemaPage,
        componentProps: {
            tema: tema1,
            ayuntamiento: this.ayuntamientoId
        }
    }).then((modal) => modal.present());
  }
}
