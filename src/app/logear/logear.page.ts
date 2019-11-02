import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-logear',
  templateUrl: './logear.page.html',
  styleUrls: ['./logear.page.scss'],
})
export class LogearPage implements OnInit {
  formulario: FormGroup;
  usuario = {
    email: '',
    password: ''
  };
  constructor( private authService: AuthService,
               public formBuilder: FormBuilder,
               public router: Router,
               public toastController: ToastController) {
    this.formulario = this.createMyForm();
  }

  ngOnInit() {
  }
  private createMyForm() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmitLogin() {
    console.log(this.usuario);
    this.authService.login( this.usuario.email, this.usuario.password).then( res => {
      this.presentToast();
      this.router.navigate(['/temas']);
    }).catch(err => alert('la contraseña es incorrecta o el usuario no existe'));
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: `Bienvenido a MyTown ${this.usuario.email}`,
      duration: 3000
    });
    toast.present();
  }
}
