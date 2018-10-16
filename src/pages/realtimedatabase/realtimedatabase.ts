import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RealtimedatabaseProvider } from '../../providers/realtimedatabase/realtimedatabase';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-realtimedatabase',
  templateUrl: 'realtimedatabase.html',
  providers: [
    RealtimedatabaseProvider
  ]
})
export class RealtimedatabasePage {

  contatos: Observable<any>;

  constructor(public navCtrl: NavController, private provider: RealtimedatabaseProvider,  private toast: ToastController) {

    this.contatos = this.provider.getAll();

  }

  abrirPagina(){
    this.navCtrl.push('RealtimedatabasecadastroPage');
  }

  editarContato(contact: any) {
    
    this.navCtrl.push('RealtimedatabasecadastroPage', { contact: contact });
 
  }
 
  excluirContato(key: string) {

    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }

  }

}