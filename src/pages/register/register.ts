import { Component } from '@angular/core';
import { IonicPage, NavController,  NavParams,  ToastController} from 'ionic-angular';
import { User } from '../../classes/user/user.class';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {
    email: "",
    password: ""
  } as User;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fireService: FirebaseServiceProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user){
    this.fireService.registerUser(user).then((message) => {
      // Could do something with the Auth-Response
      console.log(message);
      if (message === "OK") {
          this.navCtrl.setRoot("HomePage");
      } else {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 5000,
          position: 'middle'
        });
        toast.present();
      }
    });
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
