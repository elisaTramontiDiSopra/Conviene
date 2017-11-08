import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Product } from "../../classes/products/products.class";

import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

@IonicPage()
@Component({
  selector: "page-conviene",
  templateUrl: "conviene.html"
})
export class ConvienePage {

  product = {} as Product;
  convieneBool: boolean;
  savedPrice;
  productQuery;
  completeForm = false;
  noResult = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConvienePage");
  }

  conviene(name, price: number) {
    //check if the form is completed
    if (name == undefined || price == undefined) {
      this.completeForm = true;
    } else {
      this.fireService.getProduct(name).subscribe(result => {
        //if the object is empty == no results
        if (result.length === 0 ) {
          this.noResult = true;
        }
        result.map(res => {
           this.product = res;
           this.savedPrice = +res["price"]
         });
          //(this.savedPrice = +res["price"])  );
        if (this.savedPrice > price) {
          console.log("conviene");
          this.convieneBool = true;
        }
        if (this.savedPrice < price) {
          console.log("NON conviene");
          this.convieneBool = false;
        }
      });
    }
  }

  updateProduct(key, price) {
    this.fireService.updateProduct(key, price)
  }

  dismissAlert() {
    this.completeForm = false;
    this.noResult = false;
  }

  goToPage(page) {
    this.navCtrl.push(page);
    console.log(page);
  }
}
