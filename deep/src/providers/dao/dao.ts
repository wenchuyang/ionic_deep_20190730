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

  constructor(public http: HttpClient, private sqlite: SQLite) {

  }

  dbInit() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS note (id VARCHAR(40) , time DATETIME , content TEXT )', [])
        .then(() => {
          console.log("CREATE TABLE SUCCESS");
        })
        .catch((e) => {
          console.error(e);
        });
    }).catch(e => console.log(e));
  }

  insertNote(note: noteInfoModel) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO note VALUES(?,?,?)', [note.id, note.time, note.content])
        .then((res) => {
          console.log("INSERT SUCCESS");
          console.log(res);
        })
    });
  }

  updateNote(note: noteInfoModel) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE note SET time=?,content=? WHERE id=?', [note.time, note.content, note.id])
        .then((res) => {
          console.log("UPDATE SUCCESS");
          console.log(res);
        })
    });
  }

  searchNote = () => {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT * FROM note', []).then((data) => {
          console.log("SEARCH SUCCESS");
          console.log(data);
          let activityValues = [];
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              activityValues.push(data.rows.item(i));
            }
          }
          return resolve(activityValues);
        }, (error) => {
          return reject(error);
        })
      });
    })
  }


}
