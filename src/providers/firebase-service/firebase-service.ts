import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from '../../classes/products/products.class';

@Injectable()
export class FirebaseServiceProvider {

  dbReference = this.db.list('products');

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  getList() {
    return this.dbReference;
  }

  addProduct(product: Product){
    console.log("product added");
    return this.dbReference.push(product);

  }

}
