import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}


  abrirRealtimeDatabase(){

    this.navCtrl.push('RealtimedatabasePage');

  }

  abrirFirebaseAuthentication(){

    this.navCtrl.push('AuthenticationPage');

  }
  
  abrirFirebaseStorage(){

    this.navCtrl.push('StoragePage');

  }

  abrirIonicStorage(){

    this.navCtrl.push('IonicstoragePage');

  }

}