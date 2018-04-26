import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { environment } from '../../environment';
import { GoogleTranslateProvider } from '../../providers/google-translate/google-translate';
import { GoogleSpeechProvider } from '../../providers/google-speech/google-speech';

/**
 * Generated class for the TranslatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-translate',
  templateUrl: 'translate.html',
})
export class TranslatePage {

  picture : any;
  score : number = 0;
  scoreText: string= "Click to test your pronunciation";
  word : string ;
  wordTranslate : string ;
  listenActive : boolean = false;
  LanguageSelect: string;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private alert: AlertController, 
    private translator: GoogleTranslateProvider, private speecher: GoogleSpeechProvider, private tts: TextToSpeech,
    private speechRecognition: SpeechRecognition) {
    
      this.picture = navParams.get('image');
      this.word = navParams.get('text');

    this.speechRecognition.getSupportedLanguages()
      .then(
        (languages: Array<string>) => console.log(languages),
        (error) => console.log(error)
      )
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatePage');
  }

  listenWord(){
    this.tts.speak(this.wordTranslate)
    .then(() => console.log('listen Success'))
    .catch((reason: any) => console.log(reason));
  }

  getTranslation() { 
    console.log("choix de langue:", this.LanguageSelect);
    this.translateText(this.word, this.LanguageSelect.substring(0,2)).subscribe(data => {
      console.log("translation",data);
      this.wordTranslate = data.data.translations[0].translatedText;
    }, err => {
      this.showAlert(err);
    });    
  }

  pronunce(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  translateText(text, lang): Observable<any> {
    const body = {
      //"key":  environment.googleCloudVisionAPIKey,
      "q": text,
      "target": lang ,
      "format": "text",
      "source": "en"        
    };    

  return this.http.post('https://translation.googleapis.com/language/translate/v2?key='+ environment.googleCloudVisionAPIKey, body);
    
  //return this.http.get('https://translation.googleapis.com/language/translate/v2/?q='+text+ '&amp;target='+ lang +'&amp;format=text&amp;source=en&amp;key='+ environment.googleCloudVisionAPIKey);
    
  }

  captureAudio(){
    let options = { language: this.LanguageSelect };
    // Start the recognition process
    this.speechPermission;
    this.speechRecognition.startListening(options)
    .subscribe(
      matches => {
        console.log(matches);
        if( matches[0] == this.wordTranslate){
          this.score = this.pronunce(60,100);
        }else{
          this.score = this.pronunce(10,60);
        }
        this.scoreText = "Your pronunciation score is"+ this.score +" / 100";
        //this.showAlert(" Your pronunciation score is"+ this.score +" / 100");
      },
      (onerror) => {
        console.log('error:', onerror);
        this.showAlert(onerror);
      }
    )
  }

  speechPermission(){
    this.speechRecognition.hasPermission()
      .then( (hasPermission:boolean) => {
        if (!hasPermission){
         this.speechRecognition.requestPermission();
        }
      })
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  backHome(){
    this.navCtrl.pop();
  }

}
