import { Component } from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {DomotiquePage} from "../domotique/domotique";
import {ENV} from "../../config/environment.dev";
import {$WebSocket, WebSocketConfig} from "angular2-websocket/angular2-websocket";
import {Zone} from "../../model/Zone";
import {Broadcaster} from "ionic-native";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {ConfigurationPage} from "../configuration/configuration";
import {Server} from "../../model/Server";
import {Storage} from "@ionic/storage";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage
{
  items:Array<Server> = [];
  server:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster, private storage: Storage)
  {
    var vm = this;
    storage.get('SmartHomeServer').then((val) =>
    {
      if(val == null || val == "[]")
      {
        let alert = this.alertCtrl.create({
          title: 'Manque de resources',
          subTitle: "ajouter un SmartHome",
          buttons: [{
            text: 'Par ici !!!',
            handler: data => {
              vm.navCtrl.setRoot(ConfigurationPage)
            }
          }]
        });
        alert.present();
      }
      else
        {
          vm.items = JSON.parse(val);
        }
    });
  }

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
    localStorage.setItem("ip", vm.server);
    this.http.post('http://' + localStorage.getItem("ip") + '/login', body, {headers:headers})
      .subscribe(function(data){
          localStorage.setItem("token", data.text());
          vm.initializeWebSocket();
          vm.navCtrl.setRoot(DomotiquePage);
        },
        function (error) {
          // TODO
          vm.showAlert('La domotique est indisponible');
        });
  }

  initializeWebSocket()
  {
    var vm = this;

    const webSocketConfig = { reconnectIfNotNormalClose: true } as WebSocketConfig;
    var ws = new $WebSocket('wss://' + localStorage.getItem("ip") + "/push",null,webSocketConfig);

    ws.onMessage(
      (msg: MessageEvent)=> {
        vm.broadcaster.broadcast('configObject',msg.data);
      },
      {autoApply: false}
    );
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad LoginPage');
  }

  openNavConfigurationPage()
  {
    var vm = this;
    vm.navCtrl.setRoot(ConfigurationPage);
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
