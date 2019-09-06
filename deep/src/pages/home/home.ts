import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {noteInfoModel} from "../../models/noteInfo";
import {DaoProvider} from "../../providers/dao/dao";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: any = [];

  constructor(public navCtrl: NavController, private dao: DaoProvider,
              private sqlite: SQLite, private events: Events) {
    this.getNotes();
  }

  ionViewDidLoad() {
    this.events.subscribe('reloadPage',() => {
      this.getNotes();
    })
  }

  getNotes() {
    this.dao.searchNote().then((values) => {
      this.notes = values;
    });
  }

  goToDetail(id?: string, time?: Date, content?: string){
    let note = new noteInfoModel();
    note.id = id || "";
    note.time = time || new Date();
    note.content = content || "";
    this.navCtrl.push("DetailPage", {
      "id": note.id,
      "time": note.time,
      "content": note.content
    });
  }

}
