import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Zone} from "../../model/Zone";
import {ENV} from "../../config/environment.prod";

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles : ['zone.scss']
})
export class ZonePage
{
  zone:Zone;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController)
  {
    this.zone = navParams.get('item');
  }

  switchOnLamp(lamp:any)
  {
    var vm = this;
    switchOffLamp(lamp:any)
    {
      lamp.status = false;
    }

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.http.get(ENV.API_URL + "/api/switching/lamp/" + vm.zone.id +"/" + lamp.id + "/on", options)
      .subscribe(function(data){
          lamp.status = true;
        },
        function (error) {
          vm.showAlert('Erreur d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
  }


  openTheWindow(mywindow:any)
  {
   mywindow.status = true;
  }

  closeTheWindow(mywindow:any)
  {
    mywindow.status = false;
  }

  hoter(airconditionner:any)
  {
    if(airconditionner.temperature < airconditionner.max)
    {
      airconditionner.temperature = airconditionner.temperature + 1;
    }
  }

  colder(airconditionner:any)
  {
    if(airconditionner.temperature > airconditionner.min)
    {
      airconditionner.temperature = airconditionner.temperature - 1;
    }
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
