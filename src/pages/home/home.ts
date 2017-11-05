import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: FirebaseListObservable<any>;
  product = [];


  constructor(public navCtrl: NavController, af: AngularFireDatabase, public fireService: FirebaseServiceProvider) {
    this.products = af.list('/products');
  }

  addProduct(){
    this.fireService.addProduct("name","price", "store", "unit", "priceSale", "storeSale");
  }

}
