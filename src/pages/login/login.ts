import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { User } from '../../classes/user/user.class';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider, public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user) {
    this.fireService.loginUser(user).then(() => {
      this.navCtrl.setRoot('HomePage');
    });

  }
  register() {
    this.navCtrl.push('RegisterPage');
  }

}
