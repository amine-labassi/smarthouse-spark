import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DomotiquePage } from '../pages/domotique/domotique';
import { FavorisPage } from '../pages/favoris/favoris';
import { ZonePage } from '../pages/zone/zone';
import {TitlePipe} from "../pipes/title-pipe";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {SmartHouseAppBroadcaster} from "../config/SmartHouseAppBroadcaster";
import {IonicStorageModule} from "@ionic/storage";
import {ConfigurationPage} from "../pages/configuration/configuration";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DomotiquePage,
    FavorisPage,
    ZonePage,
    ConfigurationPage,
    TitlePipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DomotiquePage,
    FavorisPage,
    ZonePage,
    ConfigurationPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmartHouseAppBroadcaster
  ]
})
export class AppModule {}
