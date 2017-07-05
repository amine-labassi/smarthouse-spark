import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Zone} from "../../model/Zone";
import {ENV} from "../../config/environment.dev";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles : ['zone.scss']
})
export class ZonePage
{
  zone:Zone;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster)
  {
    var vm = this;
    this.zone = navParams.get('item');
    vm.broadcaster.on<string>('configObject')
      .subscribe(msg => {
        var items:Array<Zone> = JSON.parse(msg);
        for(var i=0 ; i< items.length; i++)
        {
          if(vm.zone.id == items[i].id)
          {
            vm.zone =  items[i];
          }
        }
      });
  }

  switchOnLamp(lamp:any)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.identifier + "/on", options)
      .subscribe(function(data){
          lamp.status = true;
        },
        function (error) {
          vm.showAlert('Problem d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
  }

  switchOffLamp(lamp:any)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.identifier + "/off", options)
      .subscribe(function(data){
          lamp.status = false;
        },
        function (error) {
          vm.showAlert('Erreur d\'extinction de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
    lamp.status = false;
  }

  openTheWindow(mywindow:any)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/window/" + vm.zone.id +"/" + mywindow.identifier + "/up", options)
      .subscribe(function(data){

        },
        function (error) {
          vm.showAlert('Erreur d\'ouvrir de la lampe : ' + vm.zone.title + ':' + mywindow.identifier);
        });
  }

  closeTheWindow(mywindow:any)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/window/" + vm.zone.id +"/" + mywindow.identifier + "/down", options)
      .subscribe(function(data){

        },
        function (error) {
          vm.showAlert('Erreur de baisser de la lampe : ' + vm.zone.title + ':' + mywindow.identifier);
        });
  }

  airconditionnerOn(airconditionner:any)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/climatiseur/" + vm.zone.id +"/" + airconditionner.identifier + "/on", options)
      .subscribe(function(data){
          airconditionner.status = true;
        },
        function (error) {
          vm.showAlert('Erreur d\'allumage du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
        });
  }

  airconditionnerOff(airconditionner:any)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/climatiseur/" + vm.zone.id +"/" + airconditionner.identifier + "/off", options)
      .subscribe(function(data){
          airconditionner.status = true;
        },
        function (error) {
          vm.showAlert('Erreur de fermer du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
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
