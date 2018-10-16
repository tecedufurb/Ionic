import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
import { ImagePicker } from '@ionic-native/image-picker';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@IonicPage()
@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html',
  providers: [
    StorageProvider
  ]
})
export class StoragePage {
  
  title: string;
  imgPath: string;
  referencia: any;
  arquivo: any;
  status : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, 
    private imagePicker: ImagePicker, @Inject(FirebaseApp) fb: any) {

      this.referencia = fb.storage().ref();
     
  }

  closeModal(){

    this.navCtrl.pop();

  }

  baixarArquivo(nome: string){

    let caminho = this.referencia.child('images/exemplo.jpg');
    caminho.getDownloadURL().then(url => {
      console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
    });

  }

  atualizaArquivo(event){

    this.arquivo = event.srcElement.files[0];
    this.enviarArquivo();

  }

  gerarAleatorio(){

    var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var aleatorio = ''
    var tamanho=10;

    for (var i = 0; i < tamanho; i++) {
        var rnum = Math.floor(Math.random() * letras.length);
        aleatorio += letras.substring(rnum, rnum + 1);
    }

    return aleatorio;

  }

  enviarArquivo(){
    
    var randomino = this.gerarAleatorio();
    var nome = '';

    let caminho = this.referencia.child('arquivos/'+randomino +this.arquivo.name);
    let tarefa = caminho.put(this.arquivo);
    tarefa.on('state_changed', (snapshot)=>{
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       this.status = progress + '% enviado';

    }, error => {
      // Tratar possíveis erros
    }, () => {
      // Função de retorno quando o upload estiver completo
      tarefa.snapshot.ref.getDownloadURL().then(function(url) {
        
        var pulledProfileImage = url; 
        console.log(pulledProfileImage); 
      
      });

      this.status = '';
      this.closeModal();
      this.toast.create({message: 'Arquivo enviado com sucesso', duration: 3000}).present();
    
    });

  }

}