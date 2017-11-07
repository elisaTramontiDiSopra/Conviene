import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../classes/products/products.class';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-conviene',
  templateUrl: 'conviene.html',
})
export class ConvienePage {

  product = {} as Product;
  convieneBool: boolean;
  savedPrice;
  productQuery;
  completeForm = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConvienePage');
  }


  conviene(name, price: number){
    this.fireService.getProduct(name).subscribe((result) => {
      result.map(res => this.savedPrice = +res['price']);
      if (this.savedPrice > price) {
        console.log('conviene');
        this.convieneBool = true;
      }
      if (this.savedPrice < price) {
        console.log('NON conviene');
        this.convieneBool = false;
      }
    });
  }

  checkPrice(savedPrice, controlPrice){
    if (!savedPrice) {
      console.log('il prodotto non esiste');
    } else if (savedPrice < controlPrice) {
      console.log('non conviene');
    } else {
      console.log('conviene!!!!');
    }
  }

  updateSalePrice(){

  }


  dismissAlert(){
    this.completeForm = false;
  }

  goToPage(page){
    this.navCtrl.push(page);
    console.log(page);
  }


}
