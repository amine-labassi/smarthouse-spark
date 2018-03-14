import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, AlertController, Select, LoadingController} from 'ionic-angular';
import {DomotiquePage} from "../domotique/domotique";
import {$WebSocket, WebSocketConfig} from "angular2-websocket/angular2-websocket";
import {SmartHouseAppBroadcaster} from "../../config/SmartHouseAppBroadcaster";
import {ConfigurationPage} from "../configuration/configuration";
import {Server} from "../../model/Server";
import {Storage} from "@ionic/storage";
import {IonDigitKeyboardOptions} from "../../components/ion-digit-keyboard/ion-digit-keyboard";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MenuPage} from "../menu/menu";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username;
  password;
  servers: Array<Server> = [];
  server: string;
  numericKeyboardOptions: IonDigitKeyboardOptions = {
    align: 'center',
    visible: true,
    leftActionOptions: {
      iconName: 'ios-backspace-outline',
      fontSize: '1.4em'
    },
    rightActionOptions: {
      iconName: 'ios-checkmark-circle-outline',
      text: '.',
      fontSize: '1.3em'
    },
    roundButtons: false,
    showLetters: false,
    swipeToHide: true,
    theme: 'opaque-white'
  } as IonDigitKeyboardOptions;

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController, public broadcaster: SmartHouseAppBroadcaster, private storage: Storage, public loadingCtrl: LoadingController) {
    var vm = this;
    if (!navigator.onLine) {
      vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
    }
    vm.server = localStorage.getItem("ip")
    storage.get('SmartHomeServer').then((val) => {
      if (val == null || val == "[]") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "Veuillez ajouter un SmartHome",
          buttons: [{
            text: 'Ajouter',
            handler: data => {
              vm.navCtrl.setRoot(ConfigurationPage)
            }
          }]
        });
        alert.present();
      }
      else {
        vm.servers = JSON.parse(val);
        if (vm.servers.length == 1) {
          vm.server = vm.servers[0].ip;
        }
      }
    });
  }

  doLogin($event) {
    var vm = this;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new HttpParams()
      .set('username', 'smartHouseOwner')
      .set('password', this.password);

    localStorage.setItem("ip", vm.server);

    this.http.post("https://" + vm.server + '/login', body, {headers:headers, responseType: 'text'})
      .subscribe(
        data => {
          localStorage.setItem("token", data);
          vm.initializeWebSocket();
          loader.dismissAll();
          vm.navCtrl.setRoot(MenuPage);
        },
        error => {
          // TODO
          loader.dismissAll();
          if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
          }
          else {
            vm.showAlert('La domotique est indisponible');
          }

        }
      );
  }

  addDigit(digit) {
    if (!this.password) {
      this.password = '' + digit;
    }
    else if (this.password && this.password.length < 6) {
      this.password = this.password + digit;
    }
  }

  removeDigit($event) {
    if (this.password && this.password.length > 0) {
      this.password = this.password.slice(0, -1);
    }
  }

  initializeWebSocket() {
    var vm = this;

    const webSocketConfig = {reconnectIfNotNormalClose: true} as WebSocketConfig;
    var ws = new $WebSocket('wss://' + vm.server, null, webSocketConfig);

    ws.onMessage(
      (msg: MessageEvent) => {
        vm.broadcaster.broadcast('configObject', msg.data);
      },
      {autoApply: false}
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openNavConfigurationPage() {
    var vm = this;
    vm.navCtrl.setRoot(ConfigurationPage);
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
