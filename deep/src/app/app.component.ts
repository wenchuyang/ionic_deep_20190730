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

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dao: DaoProvider) {
    platform.ready().then(() => {
      dao.dbInit();
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = HomePage;
    });
  }



}

