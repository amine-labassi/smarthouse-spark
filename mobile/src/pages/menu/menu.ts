import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DomotiquePage} from "../domotique/domotique";
import {FavorisPage} from "../favoris/favoris";
import {ProceduresPage} from "../procedures/procedures";
import {Items} from "../../config/Items";
import {HttpClient} from "@angular/common/http";
import {LoginPage} from "../login/login";

//@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  serverIP:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    var vm = this;
    vm.serverIP = localStorage.getItem("ip");
    vm.loadZones()


  }
  loadZones()
  {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    vm.http.get('https://' + vm.serverIP + "/api/status")
      .subscribe(
        data => {
          loader.dismissAll();
          Items.items = data;

        },
        error => {
          console.error(error);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openFavorisPage()
  {
    this.navCtrl.push(FavorisPage);
  }

  openDomotiquePage()
  {
    this.navCtrl.push(DomotiquePage);
  }

  openProceduresPage()
  {
    this.navCtrl.push(ProceduresPage);
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
