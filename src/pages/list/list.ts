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
  //productList;
  classes = ['pane & pasta', 'affettati', 'biscotti', 'bere', 'formaggi', 'scatolette', 'detersivi', 'varie ed eventuali'];
  searchItem: string;
  filterableList = [];
  entireList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider, ) {
    //this.productList = this.fireService.getList();

    this.fireService.getList().subscribe((list) => {
      this.productList = list;
      list.forEach(element => {
        this.filterableList.push(element.name);
        this.entireList.push(element.name);
      });
    });
  }


  filterFunction(searchTerm){
    if (searchTerm == "") {
      this.filterableList = this.entireList;
    } else {
      this.filterableList = this.fireService.filterItems(searchTerm, this.filterableList);
    }
  }
}
