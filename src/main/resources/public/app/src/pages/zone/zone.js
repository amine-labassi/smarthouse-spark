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
import { Headers, Http, RequestOptions } from "@angular/http";
import { ENV } from "../../config/environment.prod";
var ZonePage = (function () {
    function ZonePage(navCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.shSlideOptions = {
            pager: true
        };
        this.zone = navParams.get('item');
    }
    ZonePage.prototype.switchOnLamp = function (lamp) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.id + "/on", options)
            .subscribe(function (data) {
            lamp.status = true;
        }, function (error) {
            vm.showAlert('Erreur d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
    };
    ZonePage.prototype.switchOffLamp = function (lamp) {
        lamp.status = false;
    };
    ZonePage.prototype.openTheWindow = function (mywindow) {
        mywindow.status = true;
    };
    ZonePage.prototype.closeTheWindow = function (mywindow) {
        mywindow.status = false;
    };
    ZonePage.prototype.hoter = function (airconditionner) {
        if (airconditionner.temperature < airconditionner.max) {
            airconditionner.temperature = airconditionner.temperature + 1;
        }
    };
    ZonePage.prototype.colder = function (airconditionner) {
        if (airconditionner.temperature > airconditionner.min) {
            airconditionner.temperature = airconditionner.temperature - 1;
        }
    };
    ZonePage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Oops!!',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    return ZonePage;
}());
ZonePage = __decorate([
    Component({
        selector: 'page-zone',
        templateUrl: 'zone.html',
        styles: ['zone.scss']
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, AlertController])
], ZonePage);
export { ZonePage };
//# sourceMappingURL=zone.js.map