import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {TemasService} from '../services/temas.service';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-create-tema',
  templateUrl: './create-tema.page.html',
  styleUrls: ['./create-tema.page.scss'],
})
export class CreateTemaPage implements OnInit {
  formulario: FormGroup;
  titulo: string;
  descripcion: string;
  ayuntamiento: any;
  usuario: any;
  fecha: Date;
  constructor(private navparams: NavParams,
              private afAuth: AngularFireAuth,
              private modal: ModalController,
              private servicioTemas: TemasService,
              public formBuilder: FormBuilder,
              public router: Router,
              private alertController: AlertController) {
    this.formulario = this.createMyForm();
    this.usuario = this.navparams.get('usuario');
    this.ayuntamiento = this.navparams.get('ayuntamiento');
  }

  ngOnInit() {
    console.log(this.ayuntamiento);
    console.log(this.usuario);
  }
  private createMyForm() {
    return this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  closeChat() {
    this.modal.dismiss();
  }
  createTema() {
    let dato;
    this.afAuth.authState.subscribe(data => {
      dato = data;
      if (dato) {
        this.fecha = new Date();
        this.servicioTemas.sendTemaToFirebase(this.ayuntamiento, this.titulo, this.descripcion, this.usuario, this.fecha);
        this.modal.dismiss();
      } else {
        this.presentAlertConfirm();
      }
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '<center><strong>Para crear nuevos temas, debes estar conectado</strong></center>',
      buttons: [
        {
          text: 'Conectarte',
          handler: () => {
            this.router.navigate(['/logear']);
            this.closeChat();
          }
        }, {
          text: 'Ahora no',
          role: 'cancel',
        }
      ]
    });

    await alert.present();
  }
}
