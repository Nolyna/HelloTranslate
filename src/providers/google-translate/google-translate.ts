import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environment';

/*
  Generated class for the GoogleTranslateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleTranslateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GoogleTranslateProvider Provider');
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
    
  }

}
