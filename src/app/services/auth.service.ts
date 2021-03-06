import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string;
  constructor( private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
  }
  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }
  logout() {
    this.AFauth.auth.signOut()//.then(() => {
     //this.router.navigate(['/logear']);
     //});
  }
  register(email: string, password: string, name: string, date: Date, nombre: string, id: string) {
    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res => {
        // console.log(res.user.uid);
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          nombre: name,
          uid: uid,
          fecha: date,
          municipio: {nombre, id}
        });
        resolve(res);
      }).catch( err => reject(err));
    });
  }
}
