import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../classes/user/user.class';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user){
    this.fireService.registerUser(user);
  }

  focusFunction(){
    if (this.user.email.length > 0) {
      this.user.email = this.user.email.toLowerCase();
    }
    if (this.user.password.length > 0) {
      this.user.password = this.user.password.toLowerCase();
    }
  }



}
