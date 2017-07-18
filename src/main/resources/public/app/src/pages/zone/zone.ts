import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Zone} from "../../model/Zone";
import {ENV} from "../../config/environment.prod";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {stringify} from "@angular/core/src/util";

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles : ['zone.scss']
})
export class ZonePage
{
  zone:Zone;
  serverIP:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster)
  {
    var vm = this;
    vm.serverIP = localStorage.getItem("ip");
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.identifier + "/on", options)
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.identifier + "/off", options)
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/window/" + vm.zone.id +"/" + mywindow.identifier + "/up", options)
      .subscribe(function(data){
          if(data["_body"] == "1")
          {
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else if(data["_body"] == "2")
          {
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
        },
        function (error) {
          vm.showAlert('Erreur d\'ouvrir la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/window/" + vm.zone.id +"/" + mywindow.identifier + "/down", options)
      .subscribe(function(data){
        if(data["_body"] == "1")
        {
          vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
        }
        else if(data["_body"] == "2")
        {
          vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        }

        },
        function (error) {
          vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id +"/" + airconditionner.identifier + "/on", options)
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

    vm.http.get('http://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id +"/" + airconditionner.identifier + "/off", options)
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
