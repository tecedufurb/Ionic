import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { IonicstorageProvider, Contato } from '../../providers/ionicstorage/ionicstorage';


@IonicPage()
@Component({
  selector: 'page-ionicstoragecadastro',
  templateUrl: 'ionicstoragecadastro.html',
  providers: [
    IonicstorageProvider
  ]
})
export class IonicstoragecadastroPage {

  title: string;
  form: FormGroup;
  contact: any;
  model : Contato;
  key: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: IonicstorageProvider, private toast: ToastController) {

    this.contact = this.navParams.data.contact || {};
    this.createForm();
    this.setupPageTitle();

    if(this.navParams.data.contact && this.navParams.data.key){
      this.model = this.navParams.data.contact;
      this.key = this.navParams.data.key;
    }else{
      this.model = new Contato();
    }

  }

  private setupPageTitle(){

    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';

  }

  createForm(){

    this.form = this.formBuilder.group({
      key: [this.contact.key],
      nome: [this.contact.nome, Validators.required],
      telefone: [this.contact.telefone, Validators.required],
      habilitado: [this.contact.habilitado, Validators.required],
    });

  }
  
  saveStorage(){

    this.saveContactStorage()
    .then(() => {
      this.toast.create({message: 'Contato salvo com sucesso.', duration: 3000}).present();
      this.navCtrl.pop();
    })
    .catch(() => {
      this.toast.create({message: 'Erro ao salvar contato', duration: 3000}).present();
      this.navCtrl.pop();
    });

  }

  private saveContactStorage(){

    if(this.key){
      return this.provider.updateStorage(this.key, this.model);
    }else{
      return this.provider.insertStorage(this.model);
    }

  }

  closePage(){

    this.navCtrl.pop();

  }

}