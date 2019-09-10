import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {noteInfoModel} from "../../models/noteInfo";

/*
  Generated class for the DaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoProvider {

  database: SQLiteObject;
  constructor(public http: HttpClient, private sqlite: SQLite) {
  }

  dbInit() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      db.executeSql('CREATE TABLE IF NOT EXISTS note (id VARCHAR(40) , time STRING , content TEXT )', [])
        .catch((e) => {
          console.error(e);
        });
    });
  }

  insertNote(note: noteInfoModel) {
    let time = note.time.getTime();
    this.database.executeSql('INSERT INTO note VALUES(?,?,?)', [note.id, time, note.content])
      .catch((e) => {
        console.log(e);
      })
  }

  updateNote(note: noteInfoModel) {
    let time = note.time.getTime();
    this.database.executeSql('UPDATE note SET time=?,content=? WHERE id=?', [time, note.content, note.id])
      .catch(e => console.log(e));
  }

  deleteNote(id: string) {
    this.database.executeSql('DELETE FROM note WHERE id=?', [id])
      .catch(e => console.log(e));
  }

  async searchNote() {  //这里需要重新打开数据库是因为刚进入程序就是这个页面，此时init函数可能还没有执行完，这样会直接导致database的值为空。
    let promise = new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.database.executeSql('SELECT * FROM note ORDER BY time DESC', []).then((data) => {
          let activityValues = [];
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              activityValues.push(data.rows.item(i));
            }
          }
          resolve(activityValues);
        }, (error) => {
          console.log(error);
        }).catch(e => console.log(e));
      });
    });
    return await promise;
  };


}
