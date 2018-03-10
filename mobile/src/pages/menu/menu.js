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
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DomotiquePage } from "../domotique/domotique";
import { FavorisPage } from "../favoris/favoris";
import { ProceduresPage } from "../procedures/procedures";
import { Items } from "../../config/Items";
import { HttpClient } from "@angular/common/http";
import { LoginPage } from "../login/login";
//@IonicPage()
var MenuPage = (function () {
    function MenuPage(navCtrl, navParams, loadingCtrl, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        var vm = this;
        vm.serverIP = localStorage.getItem("ip");
        vm.loadZones();
    }
    MenuPage.prototype.loadZones = function () {
        var vm = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/all/status")
            .subscribe(function (data) {
            loader.dismissAll();
            Items.items = data;
        }, function (error) {
            loader.dismissAll();
            if (!navigator.onLine) {
                vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
            }
            else {
                vm.connectionInterrupted();
            }
        });
    };
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.openFavorisPage = function () {
        this.navCtrl.push(FavorisPage);
    };
    MenuPage.prototype.openDomotiquePage = function () {
        this.navCtrl.push(DomotiquePage);
    };
    MenuPage.prototype.openProceduresPage = function () {
        this.navCtrl.push(ProceduresPage);
    };
    MenuPage.prototype.connectionInterrupted = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '',
            subTitle: "Connection perdue",
            buttons: [{
                    text: 'Login',
                    handler: function (data) {
                        _this.navCtrl.setRoot(LoginPage);
                    }
                }]
        });
    };
    MenuPage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Oops!!',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    MenuPage = __decorate([
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController, HttpClient, AlertController])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map