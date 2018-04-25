import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/*import { environment } from '../environment';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';*/


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { TranslatePage } from '../pages/translate/translate';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import { GoogleTranslateProvider } from '../providers/google-translate/google-translate';
import { GoogleSpeechProvider } from '../providers/google-speech/google-speech';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //TranslatePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleCloudVisionServiceProvider,
    GoogleTranslateProvider,
    GoogleSpeechProvider,
    SpeechRecognition,
    TextToSpeech
  ]
})
export class AppModule {}
