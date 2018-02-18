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
import { SmartHouseAppBroadcaster } from "../../config/SmartHouseAppBroadcaster";
import { HttpClient, HttpHeaders } from "@angular/common/http";
var ZonePage = (function () {
    function ZonePage(navCtrl, navParams, http, alertCtrl, broadcaster) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.broadcaster = broadcaster;
        var vm = this;
        vm.serverIP = localStorage.getItem("ip");
        this.zone = navParams.get('item');
        vm.broadcaster.on('configObject')
            .subscribe(function (msg) {
            var items = JSON.parse(msg);
            for (var i = 0; i < items.length; i++) {
                if (vm.zone.id == items[i].id) {
                    vm.zone = items[i];
                }
            }
        });
    }
    ZonePage.prototype.switchOnLamp = function (lamp) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/on", { headers: headers })
            .subscribe(function (data) {
            lamp.status = true;
        }, function (error) {
            vm.showAlert('Problem d\'allumage de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
    };
    ZonePage.prototype.switchOffLamp = function (lamp) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/switching/lamp/" + vm.zone.id + "/" + lamp.identifier + "/off", { headers: headers })
            .subscribe(function (data) {
            lamp.status = false;
        }, function (error) {
            vm.showAlert('Erreur d\'extinction de la lampe : ' + vm.zone.title + ':' + lamp.id);
        });
        lamp.status = false;
    };
    ZonePage.prototype.mouve = function (mywindow) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/position/window/" + vm.zone.id + "/" + mywindow.identifier + "/" + vm.value, { headers: headers })
            .subscribe(function (data) {
            if (data == 1) {
                vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            }
            else if (data == 2) {
                vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            }
        }, function (error) {
            vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        });
    };
    ZonePage.prototype.openTheWindow = function (mywindow) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/up", { headers: headers })
            .subscribe(function (data) {
            if (data == 1) {
                vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            }
            else if (data == 2) {
                vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            }
        }, function (error) {
            vm.showAlert('Erreur d\'ouvrir la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        });
    };
    ZonePage.prototype.closeTheWindow = function (mywindow) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/switching/window/" + vm.zone.id + "/" + mywindow.identifier + "/down", { headers: headers })
            .subscribe(function (data) {
            if (data == 1) {
                vm.showAlert('quelqu\'un est en train d\'ouvrir la fenêtre: ' + vm.zone.title + ':' + mywindow.identifier);
            }
            else if (data == 2) {
                vm.showAlert('qu\'elle qu\'un entrain de fermer la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
            }
        }, function (error) {
            vm.showAlert('Erreur de baisser la fenetre : ' + vm.zone.title + ':' + mywindow.identifier);
        });
    };
    ZonePage.prototype.airconditionnerOn = function (airconditionner) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.identifier + "/on", { headers: headers })
            .subscribe(function (data) {
            airconditionner.status = true;
        }, function (error) {
            vm.showAlert('Erreur d\'allumage du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
        });
    };
    ZonePage.prototype.airconditionnerOff = function (airconditionner) {
        var vm = this;
        var headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        vm.http.get('https://' + vm.serverIP + "/api/switching/climatiseur/" + vm.zone.id + "/" + airconditionner.identifier + "/off", { headers: headers })
            .subscribe(function (data) {
            airconditionner.status = true;
        }, function (error) {
            vm.showAlert('Erreur de fermer du climatiseur : ' + vm.zone.title + ':' + airconditionner.identifier);
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
    __metadata("design:paramtypes", [NavController, NavParams, HttpClient, AlertController, SmartHouseAppBroadcaster])
], ZonePage);
export { ZonePage };
//# sourceMappingURL=zone.js.map