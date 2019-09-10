import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UtilsProvider } from '../providers/utils/utils';
import { DaoProvider } from '../providers/dao/dao';
import {HttpClientModule} from "@angular/common/http";
import {SQLite} from "@ionic-native/sqlite";
import { DialogsProvider } from '../providers/dialogs/dialogs';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilsProvider,
    DaoProvider,
    DialogsProvider
  ]
})
export class AppModule {}
