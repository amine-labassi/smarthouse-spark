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
import { ZonePage } from "../zone/zone";
import 'rxjs/Rx';
import { SmartHouseAppBroadcaster } from "../../config/SmartHouseAppBroadcaster";
import { FavorisPage } from "../favoris/favoris";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { LoginPage } from "../login/login";
import { Items } from "../../config/Items";
var DomotiquePage = (function () {
    function DomotiquePage(navCtrl, navParams, http, alertCtrl, broadcaster, storage, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.broadcaster = broadcaster;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.items = [];
        this.searchFilter = '';
        var vm = this;
        if (!navigator.onLine) {
            vm.showAlert("Pas d'internet, activer wifi ou réseau cellulaire");
        }
        vm.items = Items.items;
        vm.drawFavoritsIcon();
        vm.broadcaster.on('configObject')
            .subscribe(function (msg) {
            vm.items = JSON.parse(msg);
            vm.drawFavoritsIcon();
        });
    }
    DomotiquePage.prototype.openNavZonePage = function (item, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.navCtrl.push(ZonePage, { 'item': item });
    };
    DomotiquePage.prototype.openNavFavorisPage = function () {
        this.navCtrl.push(FavorisPage);
    };
    DomotiquePage.prototype.drawFavoritsIcon = function () {
        var vm = this;
        var myList = [];
        vm.storage.get('favoritsZones').then(function (val) {
            if (val != null) {
                myList = JSON.parse(val);
            }
            for (var i = 0; i < vm.items.length; i++) {
                if (myList.indexOf(vm.items[i].id) != -1) {
                    vm.items[i].favoris = true;
                }
                else {
                    vm.items[i].favoris = false;
                }
            }
        });
    };
    DomotiquePage.prototype.setUnsetFavorits = function (item, $event) {
        $event.stopPropagation();
        $event.stopImmediatePropagation();
        $event.preventDefault();
        var vm = this;
        var myList = [];
        vm.storage.get('favoritsZones').then(function (val) {
            if (val != null) {
                myList = JSON.parse(val);
            }
            var idx = myList.indexOf(item.id);
            if (idx != -1) {
                myList.splice(idx, 1);
                item.favoris = false;
            }
            else {
                myList.push(item.id);
                item.favoris = true;
            }
            vm.storage.set('favoritsZones', JSON.stringify(myList));
        });
    };
    DomotiquePage.prototype.connectionInterrupted = function () {
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
    DomotiquePage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Oops!!',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    DomotiquePage = __decorate([
        Component({
            selector: 'page-domotique',
            templateUrl: 'domotique.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, HttpClient, AlertController, SmartHouseAppBroadcaster, Storage, LoadingController])
    ], DomotiquePage);
    return DomotiquePage;
}());
export { DomotiquePage };
//# sourceMappingURL=domotique.js.map