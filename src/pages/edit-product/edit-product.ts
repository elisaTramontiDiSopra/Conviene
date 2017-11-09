import { Storage } from "@ionic/storage";
import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";
import { FirebaseImageStorageProvider } from '../../providers/firebase-image-storage/firebase-image-storage';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Product } from "../../classes/products/products.class";

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  product = {} as Product;
  savedProduct = false;
  completeForm = false;

  image: string;

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
    private camera: Camera) {
    this.product = this.navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  update(product){
    if(product.name == undefined ||
       product.name == null ||
       product.name == '' ||
       product.price == undefined ||
       product.price == null ||
       product.price == ''
      ) {
      this.completeForm = true;
    }
    if(product.img == undefined || product.img == null) {
      product.img = '';
    }
    if(product.store == undefined || product.store == null) {
      product.store = '';
    }
    if(product.storeSale == undefined || product.storeSale == null) {
      product.storeSale = '';
    }
    if(product.priceSale == undefined || product.priceSale == null) {
      product.priceSale = '';
    }
    this.fireService.updateWholeProduct(product);
    this.savedProduct = true;
  }

  dismissAlert() {
    this.savedProduct = false;
    this.navCtrl.push("HomePage");
  }

  dismissCompleteFormAlert() {
    this.completeForm = false;
  }

  takePicture() {
    this.camera.getPicture(this.options).then(
      imageData => {
        this.product.img = "data:image/jpeg;base64," + imageData;
        return this.fireImgService.uploadImage(this.product.img, this.fireService.getAuthUID());
      },
      err => {
        console.error(err);
      }
    );
  }

}
