import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ZonePage} from "../zone/zone";
import 'rxjs/Rx';
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {Zone} from "../../model/Zone";
import {FavorisPage} from "../favoris/favoris";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {Items} from "../../config/Items";

@Component({
  selector: 'page-domotique',
  templateUrl: 'domotique.html'
})
export class DomotiquePage
{

  items: any = [];
  searchFilter: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster, private storage: Storage, public loadingCtrl: LoadingController)
  {
    var vm = this;
    if (!navigator.onLine) {
      vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
    }
    vm.items= Items.items;
    vm.drawFavoritsIcon();

    vm.broadcaster.on<string>('configObject')
      .subscribe(msg => {
        vm.items = JSON.parse(msg);
        vm.drawFavoritsIcon();
      });
  }


  openNavZonePage(item, $event)
  {
    $event.preventDefault();
    $event.stopPropagation();
    this.navCtrl.push(ZonePage, { 'item': item });
  }

  openNavFavorisPage()
  {
    this.navCtrl.push(FavorisPage);
  }

  drawFavoritsIcon()
  {
    var vm = this;
    var myList =[];
    vm.storage.get('favoritsZones').then((val) => {
         if(val != null)
         {
           myList = JSON.parse(val);
         }
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
  setUnsetFavorits(item:Zone, $event:MouseEvent)
  {
    $event.stopPropagation();
    $event.stopImmediatePropagation();
    $event.preventDefault();
    var vm = this;
    var myList=[];
    vm.storage.get('favoritsZones').then((val) => {
        if(val != null)
        {
          myList = JSON.parse(val);
        }
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
  connectionInterrupted() {
    this.alertCtrl.create({
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
