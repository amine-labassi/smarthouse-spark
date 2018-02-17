import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {IonDigitKeyboard} from "../components/ion-digit-keyboard/ion-digit-keyboard";
import {DomotiquePage} from "../pages/domotique/domotique";
import {FavorisPage} from "../pages/favoris/favoris";
import {ZonePage} from "../pages/zone/zone";
import {ConfigurationPage} from "../pages/configuration/configuration";
import {TitlePipe} from "../pipes/title-pipe";
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {SmartHouseAppBroadcaster} from "../config/SmartHouseAppBroadcaster";

@NgModule({
  declarations: [
    MyApp,
    IonDigitKeyboard,
    LoginPage,
    ConfigurationPage,
    DomotiquePage,
    TitlePipe,
    FavorisPage,
    ZonePage
  ],
  imports: [
    HttpClientModule,
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
    ConfigurationPage,
    DomotiquePage,
    FavorisPage,
    ZonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmartHouseAppBroadcaster
  ]
})
export class AppModule {}
