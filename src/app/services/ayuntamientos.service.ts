import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map} from 'rxjs/operators';
import { Tema } from '../models/tema';

export interface Ayuntamiento {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AyuntamientosService {
  public ayuntamientos: any = [];
  constructor(private db: AngularFirestore) { }


  getTowns() {
    return this.db.collection('ayuntamientos', ref => ref.orderBy('nombre')).snapshotChanges().pipe(map(ayuntamiento => {
      return ayuntamiento.map(a => {
        const data: Ayuntamiento = a.payload.doc.data() as Ayuntamiento;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
}
