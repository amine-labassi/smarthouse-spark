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
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ZonePage } from "../zone/zone";
import { Headers, Http, RequestOptions } from "@angular/http";
/*
  Generated class for the Favoris page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FavorisPage = (function () {
    function FavorisPage(navCtrl, navParams, http, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.items = [];
        var vm = this;
        vm.serverIP = localStorage.getItem("ip");
        vm.loadZones();
    }
    FavorisPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavorisPage');
    };
    FavorisPage.prototype.loadZones = function () {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.items = [];
        var myList = [];
        vm.storage.get('favoritsZones').then(function (val) {
            if (val != null) {
                myList = JSON.parse(val);
            }
        });
        vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/all/status", options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            var items = data;
            for (var i = 0; i < items.length; i++) {
                if (myList.indexOf(items[i].id) != -1) {
                    vm.items.push(items[i]);
                }
            }
        }, function (error) {
            vm.showAlert('Je n\'arrive pas à m\'initialiser');
        });
    };
    FavorisPage.prototype.openNavZonePage = function (item) {
        this.navCtrl.push(ZonePage, { 'item': item });
    };
    FavorisPage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Oops!!',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    return FavorisPage;
}());
FavorisPage = __decorate([
    Component({
        selector: 'page-favoris',
        templateUrl: 'favoris.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, AlertController, Storage])
], FavorisPage);
export { FavorisPage };
//# sourceMappingURL=favoris.js.map