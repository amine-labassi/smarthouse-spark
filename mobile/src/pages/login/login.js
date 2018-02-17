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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DomotiquePage } from "../domotique/domotique";
import { $WebSocket } from "angular2-websocket/angular2-websocket";
import { SmartHouseAppBroadcaster } from "../../config/SmartHouseAppBroadcaster";
import { ConfigurationPage } from "../configuration/configuration";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, alertCtrl, broadcaster, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.broadcaster = broadcaster;
        this.storage = storage;
        this.items = [];
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
            theme: 'messenger'
        };
        var vm = this;
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
                vm.items = JSON.parse(val);
            }
        });
    }
    LoginPage.prototype.doLogin = function ($event) {
        var vm = this;
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = new HttpParams()
            .set('username', 'smartHouseOwner')
            .set('password', this.password);
        localStorage.setItem("ip", vm.server);
        this.http.post('https://' + localStorage.getItem("ip") + '/login', body, { headers: headers })
            .subscribe(function (data) {
            localStorage.setItem("token", data);
            vm.initializeWebSocket();
            vm.navCtrl.setRoot(DomotiquePage);
        }, function (error) {
            // TODO
            vm.showAlert('La domotique est indisponible');
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
        var ws = new $WebSocket('wss://' + localStorage.getItem("ip") + "/push", null, webSocketConfig);
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
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, HttpClient, AlertController, SmartHouseAppBroadcaster, Storage])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map