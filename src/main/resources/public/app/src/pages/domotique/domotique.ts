import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ZonePage} from "../zone/zone";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ENV} from "../../config/environment.dev";
import 'rxjs/Rx';
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {Zone} from "../../model/Zone";

@Component({
  selector: 'page-domotique',
  templateUrl: 'domotique.html'
})
export class DomotiquePage
{
  items: any = [];
  searchFilter: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster)
  {
    var vm = this;
    vm.loadZones();
    vm.broadcaster.on<string>('configObject')
      .subscribe(msg => {
        vm.items = JSON.parse(msg);
      });
  }

  loadZones()
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.items = [];

    vm.http.get(ENV.API_URL + "/api/switching/lamp/all/status", options)
      .map(response => response.json())
      .subscribe(
        function(data){
          vm.items = data;
        },
        function (error) {
          vm.showAlert('Je n\'arrive pas à m\'initialiser');
        }
      );
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
