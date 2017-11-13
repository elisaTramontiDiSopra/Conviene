import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, IonicPage } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { User } from '../../classes/user/user.class';
import { LoginPage } from '../login/login';

@IonicPage()
=======
import { NavController } from 'ionic-angular';

>>>>>>> be7c0e370a93525d8eefafc8baffd44bb33e60bd
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: FirebaseListObservable<any>;
  product = [];
  //user = {} as User;
  seePassword = true;


  constructor(public navCtrl: NavController, af: AngularFireDatabase, public fireService: FirebaseServiceProvider, public afAuth: AngularFireAuth) {
    this.products = af.list('/products');
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => console.log(data));
  }

  addProduct(product){
    this.fireService.addProduct(product);
  }

  goToPage(page){
    this.navCtrl.push(page);
    console.log(page);
  }

  logOut(){
    this.fireService.logOut().then(() => {
      this.navCtrl.setRoot('LoginPage')
    });
  }

  makePasswordVisible(){
    console.log("OCCHIO");
    this.seePassword = !this.seePassword;
  }
}
