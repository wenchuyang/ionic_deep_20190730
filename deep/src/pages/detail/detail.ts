import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, TextInput, ToolbarTitle} from 'ionic-angular';
import {noteInfoModel} from "../../models/noteInfo";
import { Storage } from '@ionic/storage'
import {UtilsProvider} from "../../providers/utils/utils";
import {MyApp} from "../../app/app.component";
import {DaoProvider} from "../../providers/dao/dao";

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
              private storage: Storage, public utils: UtilsProvider, private dao: DaoProvider) {  //public VS private
    this.date = this.navParams.get("time");
  }

  saveNote(title: ToolbarTitle, content: TextInput) {
    let note = new noteInfoModel();
    note.id = this.utils.generateGUID();
    note.time = this.date;
    note.content = content.value;
    this.dao.insertNote(note);
  }


}
