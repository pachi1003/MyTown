import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Ayuntamiento} from './ayuntamientos.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {pipe} from 'rxjs';

export interface Usuario {
  nombre: string;
  uid: string;
  fecha: Date;
  municipo: any;
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  userId: any;
  users: any;

  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth) {
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges().pipe(map(user => {
      return user.map(a => {
        const data: Usuario = a.payload.doc.data() as Usuario;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }
}
  /*return this.db.collection('usuarios').snapshotChanges().pipe(map(usuario => {
      return usuario.map(a => {
        const data: Usuario = a.payload.doc.data() as Usuario;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));*/
  /*getUser() {
    this.afAuth.authState.subscribe(data => {
      this.userId = data.uid;
    });
    this.getUsers().subscribe( users => {
      this.users = users;
      console.log(this.userId);
      for (const i of this.users) {
        if (i.uid === this.userId) {
          return i;
        }
      }
    });
  }*/
