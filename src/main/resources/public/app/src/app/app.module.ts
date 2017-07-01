import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DomotiquePage } from '../pages/domotique/domotique';
import { FavorisPage } from '../pages/favoris/favoris';
import { ZonePage } from '../pages/zone/zone';
import {TitlePipe} from "../pipes/title-pipe";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DomotiquePage,
    FavorisPage,
    ZonePage,
    TitlePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DomotiquePage,
    FavorisPage,
    ZonePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
