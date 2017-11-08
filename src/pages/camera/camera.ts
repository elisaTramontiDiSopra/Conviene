import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { CameraMock } from '../../app/camera.mock';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  image: string;

  //CAMERA OPTIONS AS CONSTANT
  options: CameraOptions = {
    quality: 60,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    //destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      console.error(err);
     });
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

}
