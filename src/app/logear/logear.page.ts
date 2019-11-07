import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {UsuarioService} from '../services/usuario.service';


@Component({
  selector: 'app-logear',
  templateUrl: './logear.page.html',
  styleUrls: ['./logear.page.scss'],
})
export class LogearPage implements OnInit {
  formulario: FormGroup;
  users: any;
  userId: any;
  nombre: any;
  usuario = {
    email: '',
    password: ''
  };
  constructor( private authService: AuthService,
               private user: UsuarioService,
               private afAuth: AngularFireAuth,
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
    this.authService.login( this.usuario.email, this.usuario.password).then( res => {
      this.afAuth.authState.subscribe(data => {
        this.userId = data;
      });
      this.user.getUsers().subscribe( users => {
        this.users = users;
        for (const i of this.users) {
          if (i.uid === this.userId.uid) {
            this.nombre = i;
            this.presentToast();
          }
        }
      });
      this.router.navigate(['/temas']);
    }).catch(err => alert('la contraseña es incorrecta o el usuario no existe'));
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: `Bienvenido a MyTown ${this.nombre.nombre}`,
      duration: 3000
    });
    toast.present();
  }
}
