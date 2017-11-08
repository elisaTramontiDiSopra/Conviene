import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController  } from "ionic-angular";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Storage } from "@ionic/storage";

import { AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { User } from "../../classes/user/user.class";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fireService: FirebaseServiceProvider, public afAuth: AngularFireAuth,
    private toastCtrl: ToastController, public storage: Storage) {
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.navCtrl.setRoot('HomePage')}
    });
  }

  login(user) {
    this.fireService.loginUser(user).then(() => {
      //this.storage.set("userName", user.email);
      ////this.storage.set("userPassword", user.password);
      this.navCtrl.setRoot("HomePage");
    }).catch(err => {
      // Handle error
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 1000
      });
      toast.present();
    });;
  }

  register() {
    this.navCtrl.push("RegisterPage");
  }
}
