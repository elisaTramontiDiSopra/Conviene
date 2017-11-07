import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { FirebaseListObservable } from "angularfire2/database";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

import { Product } from "../../classes/products/products.class";
import { User } from "../../classes/user/user.class";

@Injectable()
export class FirebaseServiceProvider {
  product = {} as Product;
  dbReference = this.db.list("products");

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    console.log("Hello FirebaseServiceProvider Provider");
  }

  //AUTH
  async registerUser(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  async loginUser(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  getList() {
    return this.dbReference;
  }

  searchPrice(name) {
    console.log("called searchPrice function");
    this.db.list("products", {
      query: {
        orderByChild: 'name',
        equalTo: "Nutella"
      }
    }).subscribe(result => {
      result.map(res => {
        console.log(res)
      })
    });

  }

  addProduct(product: Product) {
    //console.log("product added");
    return this.dbReference.push(product);
  }
}
