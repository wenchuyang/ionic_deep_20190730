import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from "ionic-angular";
import {Constants} from "../../Constants/constants";

/*
  Generated class for the DialogsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DialogsProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
  }

  showAlert(title: string, message: string, callback?: () => void) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: Constants.BUTTON_RIGHT,
        handler: () => {
          if(callback) {callback()}
        }
      }]
    });
    alert.present();
  }

  showConfirm(title: string, message: string, buttonRight?: () => void, buttonLeft?: () => void) {
    const confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: Constants.BUTTON_LEFT,
          handler: () => {
            if(buttonLeft) {buttonLeft()}
          }
        },
        {
          text: Constants.BUTTON_RIGHT,
          handler: () => {
            if(buttonRight) {buttonRight()}
          }
        }
      ]
    });
    confirm.present();
  }

}
