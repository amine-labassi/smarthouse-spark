import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Favoris} from "../../model/Favoris";
import {Storage} from "@ionic/storage";
import {ZonePage} from "../zone/zone";
import {HttpClient} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {Items} from "../../config/Items";

/*
  Generated class for the Favoris page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage {

  favoris:Favoris;
  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, private storage: Storage, public loadingCtrl: LoadingController)
  {
    var vm = this;

    vm.loadFav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

  loadFav()
  {

    var vm = this;

    vm.items = [];
    var myList = [];
    var items: any = Items.items;
    vm.storage.get('favoritsZones').then((val) => {
      if (val != null) {
       myList = JSON.parse(val);
        for (var i = 0; i < items.length; i++)
        {
          if (myList.indexOf(items[i].id) != -1) {
            vm.items.push(items[i]);
          }
        }
      }
    });


  }
  openNavZonePage(item)
  {

    this.navCtrl.push(ZonePage, { 'item': item });
  }


  showAlert(msg: string)
  {
    let alert = this.alertCtrl.create({
      title: 'Oops!!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
