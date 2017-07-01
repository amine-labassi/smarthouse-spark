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
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DomotiquePage } from "../domotique/domotique";
import { ENV } from "../../config/environment.dev";
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    LoginPage.prototype.doLogin = function () {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', this.username);
        urlSearchParams.append('password', this.password);
        var body = urlSearchParams.toString();
        this.http.post(ENV.API_URL + '/login', body, { headers: headers })
            .subscribe(function (data) {
            localStorage.setItem("token", data.text());
            vm.navCtrl.setRoot(DomotiquePage);
        }, function (error) {
            // TODO
            vm.showAlert('La domotique est indisponible');
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
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
    __metadata("design:paramtypes", [NavController, NavParams, Http, AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map