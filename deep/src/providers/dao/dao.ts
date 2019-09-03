import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    console.log('Hello DaoProvider Provider');
  }

  dbInit() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      this.createNoteTable();
    }).catch(e => console.log(e));
  }

  createNoteTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS note (id VARCHAR(40) , time DATETIME , content TEXT )', [])
      .then(()=>{
        console.log("create table success");
      }, (res)=>{
        console.log(res);
      });
  }

  insertNote(note: noteInfoModel) {
    this.database.executeSql('INSERT INTO note VALUES(?,?,?)',[note.id, note.time, note.content])
  }

  updateNote(note: noteInfoModel) {
    this.database.executeSql('UPDATE note SET time=?,content=? WHERE id=?', [note.time, note.content, note.id])
  }

  searchNote() {
    this.database.executeSql('SELECT * FROM note', []).then((res) => {
      console.log(res);
      return res;
    })
  }

}
