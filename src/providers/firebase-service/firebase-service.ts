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
  uid;
  dbReference;
  //dbReference = this.db.list(this.uid);
  //dbReference = this.db.list("products");
  authState: any = null;

  constructor(public http: Http, public db: AngularFireDatabase, public afAuth: AngularFireAuth  ) {
    console.log("Hello FirebaseServiceProvider Provider");
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.dbReference = this.db.list(auth.uid);
    });
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
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  getAuthUID(){
    return this.authState.uid;
  }

  getList() {
    return this.dbReference;
  }

  value;

  getProduct(name) {
      return this.db.list(this.authState.uid, {
        query: {
          orderByChild: "name",
          equalTo: name
        }
      });
  }

  searchInDb(name, property) {
    console.log("called searchPrice function");
    this.db
      .list("products", {
        query: {
          orderByChild: "name",
          equalTo: name
        }
      })
      .subscribe(result => {
        result.map(res => {
          //console.log(res[property])
          this.value = res;
        });
      });
    return this.value;
  }

  addProduct(product: Product) {
    //console.log("product added");

    return this.dbReference.push(product);
  }

  updateProduct(key, priceSale) {
    this.dbReference.update(key, {
      priceSale: priceSale
    });
  }

  addKeyCopy(key) {
    this.dbReference.update(key, {
      keyCopy: key
    });
  }

  updateWholeProduct(product){
    this.dbReference.update(product.$key, {
      img: product.img,
      name: product.name,
      price: product.price,
      store: product.store,
      priceSale: product.priceSale,
      storeSale: product.storeSale,
      unity: product.unity
    });
  }
}
