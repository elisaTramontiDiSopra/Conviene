import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Product } from "../../classes/products/products.class";

@IonicPage()
@Component({
  selector: "page-add-product",
  templateUrl: "add-product.html"
})
export class AddProductPage {
  product = {} as Product;
  savedProduct = false;
  completeForm = false;

  image: string;
  pictureTaken = false;

  //CAMERA OPTIONS AS CONSTANT
  options: CameraOptions = {
    quality: 60,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    //destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireService: FirebaseServiceProvider, private camera: Camera ){
    this.product.name = this.navParams.get('productN');
    this.product.price = this.navParams.get('productP');
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddProductPage");
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.product.img = 'data:image/jpeg;base64,' + imageData;
      this.pictureTaken = true;
     }, (err) => {
      console.error(err);
     });
    }

  savePicture(){

    }

  addProduct(product: Product) {
    if (product.price && product.name) {
      this.fireService.addProduct(product);
      this.savedProduct = true;
    } else {
      this.completeForm = true;
    }
  }

  dismissAlert() {
    this.savedProduct = false;
    this.navCtrl.push("HomePage");
  }

  dismissCompleteFormAlert() {
    this.completeForm = false;
  }
}
