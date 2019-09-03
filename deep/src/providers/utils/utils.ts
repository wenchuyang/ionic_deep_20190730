import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UtilsProvider Provider');
  }


  // Generate GUID
  static S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  generateGUID = () => (UtilsProvider.S4() + UtilsProvider.S4() + "-" + UtilsProvider.S4() + "-" + UtilsProvider.S4() + "-" + UtilsProvider.S4() + "-" + UtilsProvider.S4() + UtilsProvider.S4() + UtilsProvider.S4());

}
