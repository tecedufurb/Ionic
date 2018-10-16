import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AuthenticationpagePage } from '../authenticationpage/authenticationpage';

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
  providers: [
    AuthenticationProvider
  ]
})
export class AuthenticationPage {

  constructor(public navCtrl: NavController,private toastCtrl: ToastController,private authService: AuthenticationProvider) {}

  signInWithGoogle() {

    this.authService.signInWithGoogle()
    .then(() => {
      this.navCtrl.setRoot(AuthenticationpagePage);
    })
    .catch((error) => {
      this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
        .present();
    });
    
  }

}
