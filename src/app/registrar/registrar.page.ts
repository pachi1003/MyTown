import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AyuntamientosService } from '../services/ayuntamientos.service';

import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  registro: FormGroup;
  municipios: any;
  ayuntamientoId: string;
  ayuntamiento: string;
  public  email: string;
  public  name: string;
  public password: string;
  public date: Date = new Date();
  customPickerOptions;

  constructor(private auth: AuthService,
              private router: Router,
              public formBuilder: FormBuilder,
              public servicioAyuntamiento: AyuntamientosService,
              public toastController: ToastController) {
    this.registro = this.createMyForm();
  }

  ngOnInit() {
    this.servicioAyuntamiento.getTowns().subscribe( ayuntamientos => {
      this.municipios = ayuntamientos;
      console.log(ayuntamientos);
    });
    this.customPickerOptions = {
      buttons: [{
        text: 'Guardar',
        handler: ( evento ) => {
          console.log('Guardado!');
          this.date = new Date(evento.year.text + '/' + evento.month.text + '/' + evento.day.text);
          console.log(evento);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Cancelado.');
          this.date = new Date();
        }
      }]
    };
  }
  private createMyForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repitPassword: ['', Validators.required],
      date: ['', Validators.required],
      town: ['', Validators.required]
    });
  }
  cambioFecha(event) {
    console.log('ionChange', event);
    console.log(this.ayuntamiento);
    console.log('Date', new Date(event.detail.value));
  }
  OnSubmitRegister() {
    for (const i of this.municipios) {
      if (i.nombre === this.ayuntamiento) {
        console.log(i.nombre);
        this.ayuntamientoId = i.id;
      }
    }
    this.auth.register(this.email, this.password, this.name, this.date, this.ayuntamiento, this.ayuntamientoId).then( auth => {
      this.presentToast();
      this.router.navigate(['/productos']);
      console.log(auth);
    }).catch(err => console.log(err));
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: `Bienvenido a MyTown ${this.name}`,
      duration: 3000
    });
    toast.present();
  }

}
