import {Component} from "@angular/core";
import {Headers, Http, URLSearchParams} from "@angular/http";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {DomotiquePage} from "../domotique/domotique";
import {ENV} from "../../config/environment.prod";
import {$WebSocket} from "angular2-websocket/angular2-websocket";
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
      if(val == "[]")
      {
         vm.showAlert("aucun Maison disponible !")
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

    var ws = new $WebSocket('ws://' + localStorage.getItem("ip") + "/push");

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
