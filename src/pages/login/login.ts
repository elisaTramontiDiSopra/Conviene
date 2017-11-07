import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Storage } from "@ionic/storage";

import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { User } from "../../classes/user/user.class";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = {} as User;
  userName = "";
  userPassword = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider,public afAuth: AngularFireAuth, public storage: Storage) {
    this.storage.get("userName").then(userN => {
      if (userN != undefined) {
        console.log("utente già loggato prima = " + userN);
        this.userName = userN;
        this.storage.get("userPassword").then(userP => {
          console.log("userPassword = " + userP);
          this.userPassword = userP;
        }).then(() => {
          this.user = {
            email: this.userName,
            password: this.userPassword
          };
          this.fireService.loginUser(this.user).then(() => {
            this.navCtrl.setRoot("HomePage");
          });
        });
      }
    });
  }

  login(user) {
    this.fireService.loginUser(user).then(() => {
      this.storage.set("userName", user.email);
      this.storage.set("userPassword", user.password);
      this.navCtrl.setRoot("HomePage");
    });
  }
  register() {
    this.navCtrl.push("RegisterPage");
  }
}
