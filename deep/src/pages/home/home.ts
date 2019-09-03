import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {noteInfoModel} from "../../models/noteInfo";
import {DaoProvider} from "../../providers/dao/dao";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: Array<noteInfoModel> = [];

  constructor(public navCtrl: NavController, private dao: DaoProvider) {
    // dao.searchNote();
    // storage.forEach( (item) => {
    //   this.notes.push(item);
    //   console.log(item);
    // });
  }

  goToDetail(){
    this.navCtrl.push("DetailPage", {
      "time": new Date()
    });
  }

}
