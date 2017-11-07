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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConvienePage');
  }

  conviene(name, price){
    this.savedPrice = this.fireService.searchPrice(name)
    //this.convieneBool = false;
    console.log('name '+name);
    console.log('price '+price);
    console.log('savedPrice '+ this.savedPrice);

  }

  dismissAlert(){

  }

  goToPage(page){
    this.navCtrl.push(page);
    console.log(page);
  }


}
