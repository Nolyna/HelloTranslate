import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any[];
  picInfo: any;
  baseImage: any;

  constructor(public navCtrl: NavController,  private camera : Camera,  private vision: GoogleCloudVisionServiceProvider,private alert: AlertController) {

  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe(data => {
        console.log("retour 2",data.responses[0].labelAnnotations[0].description);
        this.picInfo = data.responses[0].labelAnnotations[0].description;
        this.baseImage = "data:image/jpeg;base64," + imageData;
        this.goToMyPage(this.baseImage, this.picInfo);
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert("Camera "+ err);
    });
  }

  goToMyPage(img, info) {
    this.navCtrl.push('TranslatePage', {'image': img, 'text':info });
  }

  saveResults(imageData, results) {
    this.items.push({ image: imageData, name: results});
  }
  

}
