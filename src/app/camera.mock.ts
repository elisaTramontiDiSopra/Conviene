import { Camera } from '@ionic-native/camera'

export class CameraMock {
  getPicture(params) {
      return new Promise((resolve, reject) => {
          resolve("BASE_64_IMAGE_DATA");
      });
  }
}
