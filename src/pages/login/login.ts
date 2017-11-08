import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, AlertController } from "ionic-angular";
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

  user = {
    email: "",
    password: ""
  } as User;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fireService: FirebaseServiceProvider, public afAuth: AngularFireAuth,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public storage: Storage) {
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.navCtrl.setRoot('HomePage')}
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

  login(user) {
    this.fireService.loginUser(user).then((auth) => {
      // Could do something with the Auth-Response
      console.log(auth);
      if (auth) {
        this.navCtrl.setRoot("HomePage");
      } else {
        let toast = this.toastCtrl.create({
          message: "Qualcosa non va con il tuo login. Se non hai un account effettua la registrazione",
          duration: 5000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }

  register() {
    this.navCtrl.push("RegisterPage");
  }
}
