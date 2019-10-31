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
    return this.db.collection('users').snapshotChanges();
    /*return this.db.collection('usuarios').snapshotChanges().pipe(map(usuario => {
      return usuario.map(a => {
        const data: Usuario = a.payload.doc.data() as Usuario;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));*/
  }
  getChatRoom( userId: string){
    return this.db.collection('users').doc(userId).valueChanges();
  }
  getUserTown(userId: string) {
    return this.db.collection('usuarios').snapshotChanges().pipe(map(usuario => {
      console.log(usuario);
      return usuario.map(a => {
        console.log(a);
        const data: Usuario = a.payload.doc.data() as Usuario;
        console.log(data);
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }
}
