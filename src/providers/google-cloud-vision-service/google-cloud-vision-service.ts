import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../../environment';

/*
  Generated class for the GoogleCloudVisionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleCloudVisionServiceProvider {

  data : any;

  constructor(public http: HttpClient) {
    console.log('Hello GoogleCloudVisionServiceProvider Provider');
  }

  getLabels(base64Image): Observable<any> {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    };
     
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' 
            + environment.googleCloudVisionAPIKey, body);
    
  }

}
