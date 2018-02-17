import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Zone} from "../../model/Zone";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles : ['zone.scss']
})
export class ZonePage
{
  zone:Zone;
  serverIP:string;
  value: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster)
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

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.identifier + "/on", {headers: headers})
      .subscribe(
          data => {
            lamp.status = true;
          },
          error => {
            vm.showAlert('Problem d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
          }
        );
  }

  switchOffLamp(lamp:any)
  {
    var vm = this;

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.identifier + "/off", {headers: headers})
      .subscribe(
        data => {
          lamp.status = false;
        },
        error => {
          vm.showAlert('Erreur d\'extinction de la lampe : ' + vm.zone.title + ':' + lamp.id);
        }
       );
    lamp.status = false;
  }
  mouve(mywindow: any)
  {
    var vm = this;

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/position/window/" + vm.zone.id +"/" + mywindow.identifier + "/" + vm.value, { headers: headers })
      .subscribe(
          data => {
            if(data == 1)
            {
              vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            }
            else if(data == 2)
            {
              vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            }

          },
          error => {
            vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
        );
  }

  openTheWindow(mywindow:any)
  {
    var vm = this;

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id +"/" + mywindow.identifier + "/up", { headers: headers })
      .subscribe(
          data => {

            if(data == 1)
            {
              vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            }
            else if(data == 2)
            {
              vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            }
          },
          error => {
            vm.showAlert('Erreur d\'ouvrir la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
        );
  }

  closeTheWindow(mywindow:any)
  {
    var vm = this;

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id +"/" + mywindow.identifier + "/down", { headers: headers })
      .subscribe(
          data =>  {

            if(data == 1)
             {
                 vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
             }
              else if(data == 2)
             {
               vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
             }
          },
          error => {
            vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
        );
  }

  airconditionnerOn(airconditionner:any)
  {
    var vm = this;

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id +"/" + airconditionner.identifier + "/on", { headers: headers })
      .subscribe(
          data => {
            airconditionner.status = true;
          },
          error => {
            vm.showAlert('Erreur d\'allumage du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
          }
        );
  }

  airconditionnerOff(airconditionner:any)
  {
    var vm = this;

    var headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem("token"));

    vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id +"/" + airconditionner.identifier + "/off", { headers: headers })
      .subscribe(
          data => {
            airconditionner.status = true;
          },
          error => {
            vm.showAlert('Erreur de fermer du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
          }
        );
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
