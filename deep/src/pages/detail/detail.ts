import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, TextInput, ToolbarTitle} from 'ionic-angular';
import {noteInfoModel} from "../../models/noteInfo";
import { Storage } from '@ionic/storage'

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  date: Date = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage) {
    this.date = this.navParams.get("time");
  }

  saveNote(title: ToolbarTitle, content: TextInput) {
    let note = new noteInfoModel();
    note.title = title.getTitleText();
    note.content = content.value;

  }


}
