import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
//import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any[];
  //picInfo: Observable <any>;
  picInfo: any;

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
      this.picInfo = this.vision.getLabels(imageData);
      console.log("imgRseult",this.picInfo.subscribe(val => console.log(val)));
      this.saveResults(imageData, this.picInfo.responses);
      
      /*this.vision.getLabels(imageData).subscribe((result) => {
        //this.saveResults(imageData, result.json().responses);
        console.log("imgRseult",result);
        this.saveResults(imageData, result);
      }, err => {
        this.showAlert(err);
      });*/
    }, err => {
      this.showAlert(err);
    });
  }

  saveResults(imageData, results) {
    this.items.push({ imageData: imageData, results: results});
      //.then(_ => { }).catch(err => { this.showAlert(err) });
  }
  

}
