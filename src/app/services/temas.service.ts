import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Ayuntamiento} from './ayuntamientos.service';
import { firestore } from 'firebase';
import { Comentario } from '../models/comentario';

export interface Temas {
  titulo: string;
  descripcion: string;
}
@Injectable({
  providedIn: 'root'
})
export class TemasService {

  constructor(private db: AngularFirestore) { }


  getTemas(id: string) {
    return this.db.collection('ayuntamientos').doc(id).collection('temas').snapshotChanges().pipe(map(temas => {
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

}
