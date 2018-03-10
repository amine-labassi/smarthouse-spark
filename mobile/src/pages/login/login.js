var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { $WebSocket } from "angular2-websocket/angular2-websocket";
import { SmartHouseAppBroadcaster } from "../../config/SmartHouseAppBroadcaster";
import { ConfigurationPage } from "../configuration/configuration";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MenuPage } from "../menu/menu";
var LoginPage = (function () {
    function LoginPage(navCtrl, http, alertCtrl, broadcaster, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.broadcaster = broadcaster;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.servers = [];
        this.numericKeyboardOptions = {
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
        };
        var vm = this;
        if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
        }
        vm.server = localStorage.getItem("ip");
        storage.get('SmartHomeServer').then(function (val) {
            if (val == null || val == "[]") {
                var alert_1 = _this.alertCtrl.create({
                    title: '',
                    subTitle: "Veuillez ajouter un SmartHome",
                    buttons: [{
                            text: 'Ajouter',
                            handler: function (data) {
                                vm.navCtrl.setRoot(ConfigurationPage);
                            }
                        }]
                });
                alert_1.present();
            }
            else {
                vm.servers = JSON.parse(val);
                if (vm.servers.length == 1) {
                    vm.server = vm.servers[0].ip;
                }
            }
        });
    }
    LoginPage.prototype.doLogin = function ($event) {
        var vm = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        var body = new HttpParams()
            .set('username', 'smartHouseOwner')
            .set('password', this.password);
        localStorage.setItem("ip", vm.server);
        this.http.post("http://" + vm.server + '/api/login', body, { headers: headers, responseType: 'text' })
            .subscribe(function (data) {
            localStorage.setItem("token", data);
            vm.initializeWebSocket();
            loader.dismissAll();
            vm.navCtrl.setRoot(MenuPage);
        }, function (error) {
            // TODO
            loader.dismissAll();
            if (!navigator.onLine) {
                vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
            }
            else {
                vm.showAlert('La domotique est indisponible');
            }
        });
    };
    LoginPage.prototype.addDigit = function (digit) {
        if (!this.password) {
            this.password = '' + digit;
        }
        else if (this.password && this.password.length < 6) {
            this.password = this.password + digit;
        }
    };
    LoginPage.prototype.removeDigit = function ($event) {
        if (this.password && this.password.length > 0) {
            this.password = this.password.slice(0, -1);
        }
    };
    LoginPage.prototype.initializeWebSocket = function () {
        var vm = this;
        var webSocketConfig = { reconnectIfNotNormalClose: true };
        var ws = new $WebSocket('wss://' + vm.server + '/push', null, webSocketConfig);
        ws.onMessage(function (msg) {
            vm.broadcaster.broadcast('configObject', msg.data);
        }, { autoApply: false });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.openNavConfigurationPage = function () {
        var vm = this;
        vm.navCtrl.setRoot(ConfigurationPage);
    };
    LoginPage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Oops!!',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController, HttpClient, AlertController, SmartHouseAppBroadcaster, Storage, LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map