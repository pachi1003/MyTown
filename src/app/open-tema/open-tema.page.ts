import { Component, OnInit } from '@angular/core';
import { Comentario } from '../models/comentario';
import {ModalController, NavParams} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {TemasService} from '../services/temas.service';
import { Usuario } from '../services/usuario.service';
import construct = Reflect.construct;

@Component({
  selector: 'app-open-tema',
  templateUrl: './open-tema.page.html',
  styleUrls: ['./open-tema.page.scss'],
})
export class OpenTemaPage implements OnInit {
  public card: any;
  public ayuntamiento: string;

  public messages = [];
  public chat: any;

  public tema: any;

  public msg: string;
  constructor(private navparams: NavParams,
              private modal: ModalController,
              private servicioTemas: TemasService) {
    this.card = this.navparams.get('tema');
    this.ayuntamiento = this.navparams.get('ayuntamiento');
  }

  ngOnInit() {
    this.servicioTemas.getChatRoom(this.ayuntamiento, this.card.id).subscribe( chat => {
      this.chat = chat;
    });
  }


  closeChat() {
    this.modal.dismiss();
  }

  sendMessage() {

    const mensaje: Comentario = {
      mensaje: this.msg,
      fecha: new Date()
    };

    this.servicioTemas.sendMsgToFirebase( mensaje, this.card.id, this.ayuntamiento);
    this.msg = '';
  }
}
