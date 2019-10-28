import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
  titulo: string;
  data = [
      {
        name: 'primary',
        selected: false
      },
    {
      name: 'secondary',
      selected: false
    },
    {
      name: 'success',
      selected: true
    }
      ];
  fecha: Date = new Date();
  customPickerOptions;

  constructor(public alertController: AlertController) {}
  ngOnInit() {
    this.customPickerOptions = {
      buttons: [{
        text: 'Guardar',
        handler: ( evento ) => {
          console.log('Guardado!');
          console.log(evento);
        }
        }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Cancelado.');
        }
      }]
    };
  }
  onClick( check ) {
    console.log( check );
  }
  cambioFecha(event) {
    console.log('ionChange', event);
    console.log('Date', new Date(event.detail.value));
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
