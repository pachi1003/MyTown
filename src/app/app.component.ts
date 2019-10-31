import { Component } from '@angular/core';

import {MenuController, Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  usuario = {};
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Lista',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'pruebas',
      url: '/prueba',
      icon: 'code-working'
    },
    {
      title: 'productos',
      url: '/productos',
      icon: 'cart'
    },
    {
      title: 'logear',
      url: '/logear',
      icon: 'log-in'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authservice: AuthService,
    private menu: MenuController,
    private afAuth: AngularFireAuth,
    private router: Router,
    public toastController: ToastController
  ) {
    this.afAuth.authState.subscribe(data => {
      this.usuario = data; });
    this.initializeApp();
  }
  Onlogout() {
    this.authservice.logout();
    this.menu.close();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Te has desconectado correctamente.',
      duration: 3000
    });
    toast.present();
  }
  Onlogin() {
    this.router.navigate(['logear']);
    this.menu.close();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
