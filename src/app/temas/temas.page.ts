import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { Tema } from '../models/tema';
import { map } from 'rxjs/operators';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.page.html',
  styleUrls: ['./temas.page.scss'],
})
export class TemasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  ayuntamiento: any;
  users: any;
  data: any;
  userId: any;
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private usuario: UsuarioService) {

    //this.user = usuario.getChatRoom(this.userId);
  }
  ngOnInit() {
    this.afAuth.authState.subscribe(data => {
      this.userId = data.uid;
    });
    this.usuario.getUsers().subscribe( users => {
      users.map( user => {
        this.users = user.payload.doc.data();
          if (this.users.uid === this.userId) {
            this.ayuntamiento = this.users.municipio.nombre;
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
