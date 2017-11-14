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
      //se non c'è utente perchè nessuno è loggato
      if (auth == null) {
        console.log('nessuno è loggato');
      } else {
        this.authState = auth;
        this.dbReference = this.db.list(auth.uid);
      }
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
      return "OK";
    } catch (e) {
      console.error(e);
      return e;
    }

  }
/*
  sendEmailVerification(){
      this.afAuth.authState.subscribe(user => {
          user.sendEmailVerification()
          .then(() => {
            console.log('email sent');
          })
        });
    }
  } */



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

  filterItems(searchTerm, list) {
    // per ogni elemento dell'array filter chiama la funzione tra ()
    // e mantiene nell'arrey filtrato solo gli elementi che restituiscono true

    // indexOf cerca searchTerm e mi da -1 se non trova corrispondenze
    // e un numero >=0 se trova corrispondenze (mi da l'indice)
    // mettendo >-1 restituisco un valore true o false
    return list.filter((matchWithSearch) => {
      return matchWithSearch.indexOf(searchTerm.toLowerCase()) > -1
    })
  }

}
