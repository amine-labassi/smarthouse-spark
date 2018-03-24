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
  windowsValues: object = {};


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
    vm.http.get('https://' + vm.serverIP + "/api/lamps/" + vm.zone.id + "/" + lamp.identifier + "/on",)
      .subscribe(
        data => {
          lamp.status = true;
          loader.dismissAll();

        },
        error => {
          loader.dismissAll();
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
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
    vm.http.get('https://' + vm.serverIP + "/api/lamps/" + vm.zone.id + "/" + lamp.identifier + "/off",)
      .subscribe(
        data => {
          lamp.status = false;
          loader.dismissAll();
        },
        error => {
          loader.dismissAll();
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
          }
        }
      );
    lamp.status = false;
  }

  demi(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/windows/" + vm.zone.id + "/" + mywindow.identifier + "/open/" + 50)
      .subscribe(
        data => {

            loader.dismissAll();


        },
        error => {
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
          }
        }
      );
  }

  quard(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/windows/" + vm.zone.id + "/" + mywindow.identifier + "/open/" + 25)
      .subscribe(
        data => {

          loader.dismissAll();


        },
        error => {
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
          }
        }
      );
  }

  troisQuards(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/windows/" + vm.zone.id + "/" + mywindow.identifier + "/open/" + 75)
      .subscribe(
        data => {

          loader.dismissAll();


        },
        error => {
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
          }
        }
      );
  }

  stop(mywindow: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/windows/" + vm.zone.id + "/" + mywindow.identifier + "/stop")
      .subscribe(
        data => {

          loader.dismissAll();


        },
        error => {
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
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
    vm.http.get('https://' + vm.serverIP + "/api/windows/" + vm.zone.id + "/" + mywindow.identifier + "/open")
      .subscribe(
        data => {


            loader.dismissAll();


        },
        error => {
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
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
    vm.http.get('https://' + vm.serverIP + "/api/windows/" + vm.zone.id + "/" + mywindow.identifier + "/close")
      .subscribe(
        data => {


            loader.dismissAll();



        },
        error => {
          loader.dismissAll();
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
          }
        }
      );
  }

  coolerOn(cooler: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/coolers/" + vm.zone.id + "/" + cooler.identifier + "/on")
      .subscribe(
        data => {
          cooler.status = true;
          loader.dismissAll();
        },
        error => {
          loader.dismissAll();
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
          }
        }
      );
  }

  coolerOff(cooler: any) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    vm.http.get('https://' + vm.serverIP + "/api/coolers/" + vm.zone.id + "/" + cooler.identifier + "/off")
      .subscribe(
        data => {
          cooler.status = true;
          loader.dismissAll();
        },
        error => {
          loader.dismissAll();
          if (error == 401) {
            vm.connectionInterrupted();

          }
          else {
            vm.showAlert("Error");
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
