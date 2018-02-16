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
import { ENV } from "../../config/environment.dev";
var ZonePage = (function () {
    function ZonePage(navCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.zone = navParams.get('item');
    }
    ZonePage.prototype.switchOnLamp = function (lamp) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/on", options)
            .subscribe(function (data) {
            lamp.status = true;
        }, function (error) {
            vm.showAlert('Erreur d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
    };
    ZonePage.prototype.switchOffLamp = function (lamp) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/off", options)
            .subscribe(function (data) {
            lamp.status = false;
        }, function (error) {
            vm.showAlert('Erreur d\'extinction de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
        lamp.status = false;
    };
    ZonePage.prototype.openTheWindow = function (mywindow) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/up", options)
            .subscribe(function (data) {
        }, function (error) {
            vm.showAlert('Erreur d\'ouvrir de la lampe : ' + vm.zone.title + ':' + mywindow.identifier);
        });
    };
    ZonePage.prototype.closeTheWindow = function (mywindow) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/down", options)
            .subscribe(function (data) {
        }, function (error) {
            vm.showAlert('Erreur de baisser de la lampe : ' + vm.zone.title + ':' + mywindow.identifier);
        });
    };
    ZonePage.prototype.airconditionnerOn = function (airconditionner) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.id + "/on", options)
            .subscribe(function (data) {
            airconditionner.status = true;
        }, function (error) {
            vm.showAlert('Erreur d\'allumage du climatiseur : ' + vm.zone.title + ':' + airconditionner.id);
        });
    };
    ZonePage.prototype.airconditionnerOff = function (airconditionner) {
        var vm = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        var options = new RequestOptions({ headers: headers });
        vm.http.get(ENV.API_URL + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.id + "/off", options)
            .subscribe(function (data) {
            airconditionner.status = true;
        }, function (error) {
            vm.showAlert('Erreur de fermer du climatiseur : ' + vm.zone.title + ':' + airconditionner.id);
        });
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