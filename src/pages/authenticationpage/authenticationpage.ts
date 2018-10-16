import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-authenticationpage',
  templateUrl: 'authenticationpage.html',
  providers: [
    AuthenticationProvider
  ]
})
export class AuthenticationpagePage {

  displayName: string;
  imgUrl: string;

  constructor(public navCtrl: NavController, private authService: AuthenticationProvider, private afAuth: AngularFireAuth, private toast: ToastController) {

    const authObserver = afAuth.authState.subscribe(user => {
      this.displayName = '';
      this.imgUrl = '';
      if (user) {
        this.displayName = user.displayName;
        this.imgUrl = user.photoURL;

        authObserver.unsubscribe();
      }
    });

  }

  public signOut() {
    
    this.authService.signOut()
    .then(() => {
      localStorage.setItem('logado', 'false');
      this.toast.create({message: 'Logoff realizado com sucesso', duration: 3000}).present();
      this.navCtrl.setRoot(HomePage);
      
    })
    .catch((error) => {
      this.toast.create({message: 'Erro ao efetuar login', duration: 3000}).present();
    });

  }

}
