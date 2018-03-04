import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Zone} from "../../model/Zone";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {HttpClient} from "@angular/common/http";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles: ['zone.scss']
})
export class ZonePage {
  zone: Zone;
  serverIP: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster, public loadingCtrl: LoadingController) {

    var vm = this;
    if (!navigator.onLine) {
      vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
    }
    vm.serverIP = localStorage.getItem("ip");
    vm.zone = navParams.get('item');
    vm.broadcaster.on<string>('configObject')
      .subscribe(msg => {
        var items: Array<Zone> = JSON.parse(msg);
        for (var i = 0; i < items.length; i++) {
          if (vm.zone.id == items[i].id) {
            vm.zone = items[i];
          }
        }
      });

  }

  switchOnLamp(lamp: any) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    var vm = this;
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/on",)
      .subscribe(
        data => {
          lamp.status = true;
          loader.dismissAll();

        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }
        }
      );

  }

  switchOffLamp(lamp: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/off",)
      .subscribe(
        data => {
          lamp.status = false;
          loader.dismissAll();
        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }
        }
      );
    lamp.status = false;
  }

  mouve(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/window/" + vm.zone.id + "/" + mywindow.identifier + "/" + mywindow.value)
      .subscribe(
        data => {
          if (data == 1) {
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            loader.dismissAll();
          }
          else if (data == 2) {
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            loader.dismissAll();
          }
          else {
            loader.dismissAll();
          }

        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }
        }
      );
  }

  openTheWindow(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/up")
      .subscribe(
        data => {

          if (data == 1) {
            loader.dismissAll();
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else if (data == 2) {
            loader.dismissAll();
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else {
            loader.dismissAll();
          }

        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }
        }
      );
  }

  closeTheWindow(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/down")
      .subscribe(
        data => {

          if (data == 1) {
            loader.dismissAll();
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else if (data == 2) {
            loader.dismissAll();
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else {
            loader.dismissAll();


          }
        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }
        }
      );
  }

  airconditionnerOn(airconditionner: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.identifier + "/on")
      .subscribe(
        data => {
          airconditionner.status = true;
          loader.dismissAll();
        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }
        }
      );
  }

  airconditionnerOff(airconditionner: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.identifier + "/off")
      .subscribe(
        data => {
          airconditionner.status = true;
          loader.dismissAll();
        },
        error => {
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.connectionInterrupted();
          }

        }
      );
  }

  connectionInterrupted() {
    let alert = this.alertCtrl.create({
      title: 'Oops!!',
      subTitle: "Connection perdue",
      buttons: [{
        text: 'Login',
        handler: data => {
          this.navCtrl.setRoot(LoginPage)
        }
      }]
    });
    alert.present();
  }

  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Oops!!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
