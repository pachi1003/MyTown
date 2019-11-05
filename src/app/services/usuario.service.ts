import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Ayuntamiento} from './ayuntamientos.service';

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

  constructor(private db: AngularFirestore) {
  }
  getUsers() {
    return this.db.collection('users').snapshotChanges().pipe(map(user => {
      return user.map(a => {
        const data: Usuario = a.payload.doc.data() as Usuario;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
    /*return this.db.collection('usuarios').snapshotChanges().pipe(map(usuario => {
      return usuario.map(a => {
        const data: Usuario = a.payload.doc.data() as Usuario;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));*/
  }
}
