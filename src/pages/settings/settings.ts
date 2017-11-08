import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout(){
      this.fireService.signOut();
      this.navCtrl.setRoot('LoginPage');
  }

}
