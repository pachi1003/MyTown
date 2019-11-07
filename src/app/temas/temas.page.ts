import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonInfiniteScroll, ModalController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { Tema } from '../models/tema';
import {map, timestamp} from 'rxjs/operators';
import {UsuarioService} from '../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AyuntamientosService} from '../services/ayuntamientos.service';
import {TemasService} from '../services/temas.service';
import { OpenTemaPage } from '../open-tema/open-tema.page';
import { CreateTemaPageModule } from '../create-tema/create-tema.module';
import {CreateTemaPage} from '../create-tema/create-tema.page';

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
  temas: any [];
  users: any;
  userId: any;
  authUser: any;
  user: any;
  numCards: any;
  iterativeCard = 0;
  iterativeLimite = 10;
  flag: boolean;
  now;
  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private usuario: UsuarioService,
              private activatedRoute: ActivatedRoute,
              private servicioAyuntamiento: AyuntamientosService,
              private servicioTemas: TemasService,
              private modal: ModalController,
              private router: Router,
              private alertController: AlertController) {
    this.temas = new Array();
    this.flag = true;
    this.now = new Date();
  }
  ngOnInit() {
    this.now.valueOf();
    this.ayuntamientoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.afAuth.authState.subscribe(data => {
      this.authUser = data;
      if ( this.authUser) {
        this.userId = data.uid;
      }
    });
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
            this.user = c;
            this.ayuntamiento = c.municipio.nombre;
            this.ayuntamientoId = c.municipio.id;
          }
        }
      }
      this.servicioTemas.getTemas(this.ayuntamientoId).subscribe(temas => {
        this.temas = temas;
        console.log(temas);
        this.numCards = temas.length;
        console.log(this.numCards);
        if ((this.numCards - 1) % 10 === 0) {
          console.log('dentro');
          this.infiniteScroll.disabled = false;
          this.flag = true;
        }
        /*this.addTemas();*/
      });
    });
  }
  loadData(event) {
    console.log('cargando datos...');
    setTimeout(() => {
      if ( this.flag === false) {
        event.target.complete();
        console.log('completado');
        this.infiniteScroll.disabled = true;
        return;
      }
      this.iterativeLimite = this.iterativeLimite + 10;
      /*this.addTemas();*/
      event.target.complete();
    }, 1000);
  }
  openTema(tema1) {
    console.log(tema1);
    this.modal.create({
        component: OpenTemaPage,
        componentProps: {
            tema: tema1,
            ayuntamiento: this.ayuntamientoId,
            usuario: this.user
        }
    }).then((modal) => modal.present());
  }
  createTema() {
    if (this.userId) {
      this.modal.create({
        component: CreateTemaPage,
        componentProps: {
          ayuntamiento: this.ayuntamientoId,
          usuario: this.user
        }
      }).then((modal) => modal.present());
    } else {
      this.presentAlertConfirm();
    }
  }
  /*addTemas() {
    for ( this.iterativeCard; this.iterativeCard < this.iterativeLimite; this.iterativeCard++) {
      if ( this.temas1[this.iterativeCard] === undefined) {
        this.flag = false;
        return;
      } else {
        this.temas.push(this.temas1[this.iterativeCard]);
      }
    }
  }*/
  doRefresh(event) {
    setTimeout(() => {
      this.router.navigate(['/temas']);
      event.target.complete();
    }, 300);
  }
  final() {
    this.flag = false;
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '<center><strong>Para crear nuevos temas, debes estar conectado</strong></center>',
      buttons: [
        {
          text: 'Conectarte',
          handler: () => {
            this.router.navigate(['/logear']);
          }
        }, {
          text: 'Ahora no',
          role: 'cancel',
        }
      ]
    });

    await alert.present();
  }
  fecha(temaFecha) {
    let fecha1;
    let fecha2;
    let segundos;
    let minutos;
    let horas;
    let dias;
    let meses;
    let años;
    fecha1 = this.now.valueOf() / 1000;
    fecha1 = parseInt(fecha1.toString());
    fecha2 = temaFecha.valueOf();
    segundos = fecha1 - fecha2;
    if ( segundos > 59 ) {
      segundos = segundos / 60;
      minutos = parseInt( segundos.toString());
      if ( minutos > 59 ) {
        minutos = minutos / 60;
        horas = parseInt(minutos.toString());
        if ( horas > 23 ) {
          horas = horas / 24;
          dias = parseInt(horas.toString());
          if ( dias > 29 ) {
            dias = dias / 30;
            meses = parseInt(dias.toString());
            if ( meses > 11 ) {
              meses = meses / 12;
              años = parseInt(meses.toString());
              return años;
            } else {
              return (meses + ' meses');
            }
          } else {
            return (dias + ' dias');
          }
        } else {
          return (horas + ' horas');
        }
      } else {
        return (minutos + ' minutos');
      }
    } else {
      return ('Ahora mismo');
    }
  }
}
