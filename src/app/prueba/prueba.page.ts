import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
  titulo: string;

  constructor(public alertController: AlertController) {}
  ngOnInit() {
  }

  async inputAlertConfirm() {
    const input = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      inputs: [
        {
          name: 'txtnombre',
          type: 'text',
          placeholder: 'Titulo'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Boton cancelar');
          }
        }, {
          text: 'Okay',
          handler: (data) => {
            console.log('Boton Ok', data);
            this.titulo = data.txtnombre;
          }
        }
      ]
    });

    await input.present();
  }
}
