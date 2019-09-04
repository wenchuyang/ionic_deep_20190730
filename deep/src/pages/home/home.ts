import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {noteInfoModel} from "../../models/noteInfo";
import {DaoProvider} from "../../providers/dao/dao";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: any = [];

  constructor(public navCtrl: NavController, private dao: DaoProvider, private sqlite: SQLite) {

    this.searchNote();


  }


  searchNote = () => {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM note', []).then((data) => {
        console.log("SEARCH SUCCESS");
        console.log(data);
        let activityValues = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            activityValues.push(data.rows.item(i));
          }
        }
        this.notes = activityValues;
      }, (error) => {
        console.log(error);
      })
    });
  };


  goToDetail(){
    this.navCtrl.push("DetailPage", {
      "time": new Date()
    });
  }

}
