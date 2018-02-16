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
import { ZonePage } from "../zone/zone";
import { Headers, Http, RequestOptions } from "@angular/http";
import { ENV } from "../../config/environment.dev";
import 'rxjs/Rx';
import { SmartHouseAppBroadcaster } from "../../config/SmartHouseAppBroadcaster";
var DomotiquePage = (function () {
    function DomotiquePage(navCtrl, navParams, http, alertCtrl, broadcaster) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.broadcaster = broadcaster;
        this.items = [];
        this.searchFilter = '';
        var vm = this;
        vm.loadZones();
        vm.broadcaster.on('configObject')
            .subscribe(function (msg) {
            vm.items = JSON.parse(msg);
        });
    }
    DomotiquePage.prototype.loadZones = function () {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.items = [];
        vm.http.get(ENV.API_URL + "/api/switching/lamp/all/status", options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            vm.items = data;
        }, function (error) {
            vm.showAlert('Je n\'arrive pas à m\'initialiser');
        });
    };
    DomotiquePage.prototype.openNavZonePage = function (item) {
        this.navCtrl.push(ZonePage, { 'item': item });
    };
    DomotiquePage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Oops!!',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    return DomotiquePage;
}());
DomotiquePage = __decorate([
    Component({
        selector: 'page-domotique',
        templateUrl: 'domotique.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, AlertController, SmartHouseAppBroadcaster])
], DomotiquePage);
export { DomotiquePage };
//# sourceMappingURL=domotique.js.map