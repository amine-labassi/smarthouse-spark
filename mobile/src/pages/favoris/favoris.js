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
import { Storage } from "@ionic/storage";
import { ZonePage } from "../zone/zone";
import { HttpClient } from "@angular/common/http";
import { Items } from "../../config/Items";
/*
  Generated class for the Favoris page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FavorisPage = (function () {
    function FavorisPage(navCtrl, navParams, http, alertCtrl, storage, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.items = [];
        var vm = this;
        vm.loadFav();
    }
    FavorisPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavorisPage');
    };
    FavorisPage.prototype.loadFav = function () {
        var vm = this;
        vm.items = [];
        var myList = [];
        var items = Items.items;
        vm.storage.get('favoritsZones').then(function (val) {
            if (val != null) {
                myList = JSON.parse(val);
                for (var i = 0; i < items.length; i++) {
                    if (myList.indexOf(items[i].id) != -1) {
                        vm.items.push(items[i]);
                    }
                }
            }
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
    FavorisPage = __decorate([
        Component({
            selector: 'page-favoris',
            templateUrl: 'favoris.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, HttpClient, AlertController, Storage, LoadingController])
    ], FavorisPage);
    return FavorisPage;
}());
export { FavorisPage };
//# sourceMappingURL=favoris.js.map