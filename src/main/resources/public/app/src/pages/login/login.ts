import { Component } from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {DomotiquePage} from "../domotique/domotique";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage
{

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {}

    username;
    password;

    doLogin()
    {
      var vm = this;

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', this.username);
      urlSearchParams.append('password', this.password);
      let body = urlSearchParams.toString();

      this.http.post('http://192.168.99.100/login', body, {headers:headers})
        .subscribe(function(data){
          localStorage.setItem("token", data.text());
          vm.navCtrl.setRoot(DomotiquePage);
        },
        function (error) {
          // TODO
          vm.showAlert('La domotique est indisponible');
        });
    }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad LoginPage');
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
