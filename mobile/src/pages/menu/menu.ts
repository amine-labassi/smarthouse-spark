import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DomotiquePage} from "../domotique/domotique";
import {FavorisPage} from "../favoris/favoris";
import {ProceduresPage} from "../procedures/procedures";

//@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openFavorisPage()
  {
    this.navCtrl.push(FavorisPage);
  }

  openDomotiquePage()
  {
    this.navCtrl.push(DomotiquePage);
  }

  openProceduresPage()
  {
    this.navCtrl.push(ProceduresPage);
  }
}
