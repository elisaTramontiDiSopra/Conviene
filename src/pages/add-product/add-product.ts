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

  product = {} as Product;
  savedProduct = false;
  completeForm = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct(product: Product){
    if (product.price && product.name) {
    this.fireService.addProduct(product);
    this.savedProduct = true;
    } else {
      this.completeForm = true;
    }
  }

  dismissAlert(){
    this.savedProduct = false;
  }

  dismissCompleteFormAlert() {
    this.completeForm = false;
  }
}
