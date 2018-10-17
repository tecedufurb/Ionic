import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RealtimedatabaseProvider {

  private PATH = 'contatos/';

  constructor(public db: AngularFireDatabase) {}

  getAll(){
    
    return this.db.list(this.PATH, ref => ref.orderByChild('name')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  get(key : string){}

  save(contato : any){

    return new Promise((resolve, reject) => {
      if (contato.key) {
        this.db.list(this.PATH)
          .update(contato.key, { nome: contato.name, telefone: contato.tel, habilitado: contato.habilitado })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: contato.name, telefone: contato.tel, habilitado: contato.habilitado })
          .then(() => resolve());
      }
    });

  }

  remove(key : string){

    return this.db.list(this.PATH).remove(key);

  }

}