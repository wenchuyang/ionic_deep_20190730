import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {DaoProvider} from "../providers/dao/dao";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dao: DaoProvider) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.dao.dbInit();
    console.log("app初始化完成");
  }



}

