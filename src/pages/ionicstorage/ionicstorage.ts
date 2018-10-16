import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IonicstorageProvider, ContactList } from '../../providers/ionicstorage/ionicstorage';

@IonicPage()
@Component({
  selector: 'page-ionicstorage',
  templateUrl: 'ionicstorage.html',
  providers: [
    IonicstorageProvider
  ]
})
export class IonicstoragePage {

  contactsStorage: ContactList[];

  constructor(public navCtrl: NavController, private provider: IonicstorageProvider,  private toast: ToastController) {}

  ionViewDidEnter(){

    this.provider.getAllStorage().then(results=>{
        this.contactsStorage = results;
    });

  }

  abrirPagina(){

    this.navCtrl.push('IonicstoragecadastroPage');

  }

  editarContatoStorage(item: ContactList){

    this.navCtrl.push('IonicstoragecadastroPage', { key: item.key, contact: item.contato});

  }

  removerContatoStorage(item: ContactList){

    this.provider.removeStorage(item.key)
    .then(() => {
      let index = this.contactsStorage.indexOf(item);
      this.contactsStorage.splice(index, 1);
      this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
    });
    
  }

}