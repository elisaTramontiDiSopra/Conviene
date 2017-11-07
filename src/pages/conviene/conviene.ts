import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../classes/products/products.class';

@IonicPage()
@Component({
  selector: 'page-conviene',
  templateUrl: 'conviene.html',
})
export class ConvienePage {

  product = {} as Product;
  convieneBool: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConvienePage');
  }

  conviene(){
    this.convieneBool = false;
    console.log(this.convieneBool);

  }

  dismissAlert(){

  }

  goToPage(page){
    this.navCtrl.push(page);
    console.log(page);
  }


}
