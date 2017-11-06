import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from './../../classes/products/products.class';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { CommonModule } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  productList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider, ) {
    this.productList = this.fireService.getList();
  }

  productSelected(name){
    this.fireService.search(name);
  }

}
