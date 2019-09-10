import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, TextInput, ToolbarTitle} from 'ionic-angular';
import {noteInfoModel} from "../../models/noteInfo";
import {UtilsProvider} from "../../providers/utils/utils";
import {DaoProvider} from "../../providers/dao/dao";
import {DialogsProvider} from "../../providers/dialogs/dialogs";
import * as $ from 'jquery';

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

  id: string;
  date: Date = null;
  content: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public utils: UtilsProvider, private dao: DaoProvider,
              public events: Events, public dialog: DialogsProvider) {  //public VS private
    this.id = this.navParams.get("id");
    this.date = this.navParams.get("time");
    this.content = this.navParams.get("content");
  }

  ngAfterViewInit(){
    // $(document).ready(function(){
    //   $('input[type="text"],textarea').on('click', function () {
    //     var target = this;
    //     setTimeout(function(){
    //       target.scrollIntoView();
    //     },1000);
    //   });
    // });
  }

  saveNote(title: ToolbarTitle, content: TextInput) {
    let note = new noteInfoModel();
    if(this.id) {
      note.id = this.id;
      note.time = new Date();
      note.content = content.value;
      this.dao.updateNote(note);
      this.returnHome();
    } else if(content.value === ""){
      this.dialog.showAlert("Warning", "You haven't input any message, the note won't be save", () => {
        this.returnHome();
      })
    } else {
      note.id = this.utils.generateGUID();
      note.time = this.date;
      note.content = content.value;
      this.dao.insertNote(note);
      this.returnHome();
    }
  }

  deleteNote() {
    this.dialog.showConfirm("Tip", "Do you want to delete it?", () => {
      this.dao.deleteNote(this.id);
      this.returnHome();
    });

  }

  returnHome() {
    this.navCtrl.pop().then(()=>{
      this.events.publish('reloadPage');
    });
  }

}
