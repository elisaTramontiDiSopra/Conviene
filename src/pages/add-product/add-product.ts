import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Product } from '../../classes/products/products.class'


@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: Product = {
    name: "",
    price: 0,
    store: "",
    priceSale: 0,
    storeSale: "",
    unity: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct(product: Product){
    this.fireService.addProduct(product);
  }

}
