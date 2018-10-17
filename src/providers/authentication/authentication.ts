import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthenticationProvider {

  constructor(private angularFireAuth: AngularFireAuth, private googlePlus: GooglePlus) { }

  signInWithGoogle() {

    return this.googlePlus.login({
      'webClientId': '1070000864844-mdd8bljs998sq0br1efrnlig0fm4fh17.apps.googleusercontent.com',
      'offline': true
    })
    .then(res => {
      return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then((user: firebase.User) => {
          // atualizando o profile do usuario
          return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
        });
    });

  }

  signOut(){
    
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        var provider = this.angularFireAuth.auth.currentUser.providerData[i];

        if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) { // Se for o gooogle
          // o disconnect limpa o oAuth token e tambem esquece qual conta foi selecionada para o login
          return this.googlePlus.disconnect()
            .then(() => {
              return this.signOutFirebase();
            });
        }
      }
    }

    return this.signOutFirebase();

  }

  private signOutFirebase() {

    return this.angularFireAuth.auth.signOut();

  }

}