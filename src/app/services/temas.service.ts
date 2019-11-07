import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Ayuntamiento} from './ayuntamientos.service';
import { firestore } from 'firebase';
import { Comentario } from '../models/comentario';
import {Usuario} from './usuario.service';

export interface Temas {
  titulo: string;
  descripcion: string;
  fecha: Date;
  usuario: Usuario;
}
@Injectable({
  providedIn: 'root'
})
export class TemasService {
  datos;
  constructor(private db: AngularFirestore) { }


  getTemas(id: string) {
    return this.db.collection('ayuntamientos').doc(id).collection('temas',
 ref => ref.orderBy('fecha', 'desc')).snapshotChanges().pipe(map(temas => {
    /*this.datos.orderByChild('temas').orderBy('fecha');*/
        return temas.map(a => {
          const data: Ayuntamiento = a.payload.doc.data() as Ayuntamiento;
          data.id = a.payload.doc.id;
          return data;
      });
    }));
  }
  getChatRoom( ayuntamiento: string, chatId: any) {
    return this.db.collection('ayuntamientos').doc(ayuntamiento).collection('temas').doc(chatId).valueChanges();
  }


  sendMsgToFirebase( mensaje: Comentario, temaId: string, ayuntamiento: string) {

    this.db.collection('ayuntamientos').doc(ayuntamiento).collection('temas').doc(temaId).update({
      comentarios : firestore.FieldValue.arrayUnion(mensaje),
    });
  }
  sendTemaToFirebase(ayuntamiento: any, title: string, description: string, user: any, date: Date) {
    this.db.collection('ayuntamientos').doc(ayuntamiento).collection('temas').add({
      titulo: title,
      descripcion: description,
      usuario: user,
      fecha: date
    });
  }

}
