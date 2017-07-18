import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ZonePage} from "../zone/zone";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ENV} from "../../config/environment.prod";
import 'rxjs/Rx';
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {Zone} from "../../model/Zone";
import {FavorisPage} from "../favoris/favoris";

import {Favoris} from "../../model/Favoris";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-domotique',
  templateUrl: 'domotique.html'
})
export class DomotiquePage
{
  items: any = [];

  searchFilter: string = '';
  serverIP:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster, private storage: Storage)
  {
    var vm = this;
    vm.serverIP = localStorage.getItem("ip");
    vm.loadZones();
    vm.broadcaster.on<string>('configObject')
      .subscribe(msg => {
        vm.items = JSON.parse(msg);
        vm.drawFavoritsIcon();
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/lamp/all/status", options)
      .map(response => response.json())
      .subscribe(
        function(data){
          vm.items = data;
          vm.drawFavoritsIcon();
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

  openNavFavorisPage()
  {
    this.navCtrl.push(FavorisPage);
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
  drawFavoritsIcon()
  {
    var vm = this;
    var myList =[];
    vm.storage.get('favoritsZones').then((val) => {
          myList = JSON.parse(val);
          for (var i = 0; i < vm.items.length; i++)
          {
           if (myList.indexOf(vm.items[i].id) != -1)
           {
              vm.items[i].favoris = true;
           }
          else
           {
              vm.items[i].favoris = false;
           }
        }

    });
  }
  setUnsetFavorits(item:Zone)
  {
    var vm = this;
    var myList=[];
    vm.storage.get('favoritsZones').then((val) => {
        myList = JSON.parse(val);
        var idx = myList.indexOf(item.id);
        if (idx != -1) {
          myList.splice(idx, 1);
          item.favoris = false;
        }
        else {
          myList.push(item.id);
          item.favoris = true;
        }
        vm.storage.set('favoritsZones', JSON.stringify(myList));

    });

  }
}
