import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any[];

  constructor(public navCtrl: NavController,  private camera : Camera,  private vision: GoogleCloudVisionServiceProvider,    private alert: AlertController) {

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
      this.vision.getLabels(imageData).subscribe((result) => {
        this.saveResults(imageData, result.json().responses);
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert(err);
    });
  }

  saveResults(imageData, results) {
    this.items.push({ imageData: imageData, results: results})
      //.then(_ => { })
      //.catch(err => { this.showAlert(err) });
  }
  

}
