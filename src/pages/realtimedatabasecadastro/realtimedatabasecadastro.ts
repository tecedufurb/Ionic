import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RealtimedatabaseProvider } from '../../providers/realtimedatabase/realtimedatabase';

@IonicPage()
@Component({
  selector: 'page-realtimedatabasecadastro',
  templateUrl: 'realtimedatabasecadastro.html',
  providers: [
    RealtimedatabaseProvider
  ]
})
export class RealtimedatabasecadastroPage {

  titulo: string;
  form: FormGroup;
  contact: any;
 
  constructor(
    public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: RealtimedatabaseProvider,
    private toast: ToastController) {
     
    this.contact = this.navParams.data.contact || {};
    this.criarFormulario();
    this.tituloPagina();

  }
 
  private tituloPagina() {

    this.titulo = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';

  }
 
  criarFormulario() {

    this.form = this.formBuilder.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      tel: [this.contact.tel, Validators.required],
      habilitado: [this.contact.habilitado],
    });

  }
 
  onSubmit() {

    if (this.form.valid) {
      this.provider.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
        console.error(e);
      })
    }

  }

}