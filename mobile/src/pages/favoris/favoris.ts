import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Favoris} from "../../model/Favoris";
import {Storage} from "@ionic/storage";
import {ZonePage} from "../zone/zone";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginPage} from "../login/login";

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
  serverIP: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, private storage: Storage)
  {
    var vm = this;
    vm.serverIP = localStorage.getItem("ip");
    vm.loadZones();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

  loadZones()
  {
    var vm = this;

    vm.items = [];
    var myList: Array<number> = [];
    vm.storage.get('favoritsZones').then((val) => {
      if (val != null) {
       myList = JSON.parse(val);
      }
    });
    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/all/status")
      .subscribe(
        function(data){
          var items: any = data;
          for (var i = 0; i < items.length; i++)
          {
            if (myList.indexOf(items[i].id) != -1) {
              vm.items.push(items[i]);
            }
          }
        },
        function (error) {
          vm.connectionInterrupted();
        }
      );
  }
  openNavZonePage(item)
  {

    this.navCtrl.push(ZonePage, { 'item': item });
  }

  connectionInterrupted() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: "Connection perdue",
      buttons: [{
        text: 'Login',
        handler: data => {
          this.navCtrl.setRoot(LoginPage)
        }
      }]
    });
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
