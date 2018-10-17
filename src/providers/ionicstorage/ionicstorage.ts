import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class IonicstorageProvider {

  constructor(private storage: Storage) {}

  public insertStorage(contact : Contato){

    let key = '' + Math.random();
    
    if(contact.habilitado != true){
      contact.habilitado = false;
    }
        
    return this.saveStorage(key, contact);

  }

  public updateStorage(key: string, contact: Contato){

    return this.saveStorage(key, contact);

  }

  private saveStorage(key: string, contact: Contato){

    return this.storage.set(key, contact);

  }

  public removeStorage(key: string){

    return this.storage.remove(key);
    
  }

  public getAllStorage(){

    let contacts: ContactList[] = [];

   return this.storage.forEach((value: Contato, key: string, intrationNumber: Number) => {
      let contact = new ContactList();
      contact.key = key;
      contact.contato = value;
      contacts.push(contact);
    }).then(() =>{
      return Promise.resolve(contacts);
    }).catch((error) =>{
      return Promise.reject(error);
    });

  }

}

export class Contato{

  nome: string;
  telefone: string;
  habilitado: boolean;

}

export class ContactList{
  
  key: string;
  contato: Contato;

}