import { Storage } from "@ionic/storage";
import { FirebaseImageStorageProvider } from '../../providers/firebase-image-storage/firebase-image-storage';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FirebaseApp } from "angularfire2";

import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";

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

  picturesStored;
  myPicRef;

  //CAMERA OPTIONS AS CONSTANT
  options: CameraOptions = {
    quality: 60,
    targetWidth: 600,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fireService: FirebaseServiceProvider, private fireImgService: FirebaseImageStorageProvider,
    public toastCtrl: ToastController, private camera: Camera) {
    this.product.name = this.navParams.get("productN");
    this.product.price = this.navParams.get("productP");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddProductPage");
  }

  takePicture() {
    this.camera.getPicture(this.options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.product.img = "data:image/jpeg;base64," + imageData;
        this.pictureTaken = true;
        return this.fireImgService.uploadImage(this.product.img, this.fireService.getAuthUID());
      },
      err => {
        console.error(err);
      }
    );
  }

  addProduct(product: Product) {
    if (product.price > 0 && product.name.length > 0) {
      /*let toast = this.toastCtrl.create({
        message: "prezzo e nome inseriti",
        duration: 5000,
        position: 'middle'
      });
      toast.present();*/
      this.fireService.addProduct(product)
      this.savedProduct = true;
    } else {/*
      let toast = this.toastCtrl.create({
        message: "prezzo e nome NON INSERITI",
        duration: 5000,
        position: 'middle'
      });
      this.completeForm = true;*/
    }
  }

  dismissAlert() {
    this.savedProduct = false;
    this.navCtrl.push("HomePage");
  }

  dismissCompleteFormAlert() {
    this.completeForm = false;
  }

  focusFunction(){
    if (this.product.name.length > 0) {
      this.product.name = this.product.name.toLowerCase();
    }
  }

}
