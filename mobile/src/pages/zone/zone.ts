import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Zone} from "../../model/Zone";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import construct = Reflect.construct;

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles: ['zone.scss']
})
export class ZonePage {
  zone: Zone;
  serverIP: string;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster, public loadingCtrl: LoadingController,) {

    var vm = this;
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
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/on",)
      .subscribe(
        data => {
          lamp.status = true;
          vm.loader.setShowBackdrop(false);
        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Problem d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
        }
      );
  }

  switchOffLamp(lamp: any) {
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/off",)
      .subscribe(
        data => {
          lamp.status = false;
          vm.loader.setShowBackdrop(false);
        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Erreur d\'extinction de la lampe : ' + vm.zone.title + ':' + lamp.id);
        }
      );
    lamp.status = false;
  }

  mouve(mywindow: any) {
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/position/window/" + vm.zone.id + "/" + mywindow.identifier + "/" + mywindow.value)
      .subscribe(
        data => {
          if (data == 1) {
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            vm.loader.setShowBackdrop(false);
          }
          else if (data == 2) {
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            vm.loader.setShowBackdrop(false);
          }
          else {
            vm.loader.setShowBackdrop(false);
          }

        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        }
      );
  }

  openTheWindow(mywindow: any) {
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/up")
      .subscribe(
        data => {

          if (data == 1) {
            vm.loader.setShowBackdrop(false);
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else if (data == 2) {
            vm.loader.setShowBackdrop(false);
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else {
            vm.loader.setShowBackdrop(false);
          }

        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Erreur d\'ouvrir la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        }
      );
  }

  closeTheWindow(mywindow: any) {
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/down")
      .subscribe(
        data => {

          if (data == 1) {
            vm.loader.setShowBackdrop(false);
            vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
          }
          else if (data == 2) {
            vm.loader.setShowBackdrop(false);
            vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
          }
        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        }
      );
  }

  airconditionnerOn(airconditionner: any) {
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.identifier + "/on")
      .subscribe(
        data => {
          airconditionner.status = true;
          vm.loader.setShowBackdrop(false);
        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Erreur d\'allumage du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
        }
      );
  }

  airconditionnerOff(airconditionner: any) {
    var vm = this;
    vm.loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.identifier + "/off")
      .subscribe(
        data => {
          airconditionner.status = true;
          vm.loader.setShowBackdrop(false);
        },
        error => {
          vm.loader.setShowBackdrop(false);
          vm.showAlert('Erreur de fermer du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
        }
      );
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
