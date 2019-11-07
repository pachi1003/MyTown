import { Component, OnInit } from '@angular/core';
import { Comentario } from '../models/comentario';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {TemasService} from '../services/temas.service';
import { Usuario } from '../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-open-tema',
  templateUrl: './open-tema.page.html',
  styleUrls: ['./open-tema.page.scss'],
})
export class OpenTemaPage implements OnInit {
  public card: any;
  public ayuntamiento: string;
  public chat: any;
  public user: any;
  public tema: any;

  public msg: string;
  constructor(private navparams: NavParams,
              private modal: ModalController,
              private servicioTemas: TemasService,
              private router: Router,
              private alertController: AlertController) {
    this.card = this.navparams.get('tema');
    this.ayuntamiento = this.navparams.get('ayuntamiento');
    this.user = this.navparams.get('usuario');
  }

  ngOnInit() {
    this.servicioTemas.getChatRoom(this.ayuntamiento, this.card.id).subscribe( chat => {
      this.chat = chat;
    });
    console.log(this.user);
  }


  closeChat() {
    this.modal.dismiss();
  }

  sendMessage() {
    if ( this.user != null) {
      const mensaje: Comentario = {
        mensaje: this.msg,
        fecha: new Date()
      };

      this.servicioTemas.sendMsgToFirebase(mensaje, this.card.id, this.ayuntamiento);
      this.msg = '';
    } else {
      this.presentAlertConfirm();
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '<center><strong>Para poder comentar, debes estar conectado</strong></center>',
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
