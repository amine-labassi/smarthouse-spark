var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Yassine Chbinou on 11/07/2017.
 */
import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, TextInput } from "ionic-angular";
import { LoginPage } from "../login/login";
import { Storage } from "@ionic/storage";
var ConfigurationPage = (function () {
    function ConfigurationPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.servers = [];
        storage.get('SmartHomeServer').then(function (val) {
            if (val != null) {
                _this.servers = JSON.parse(val);
            }
        });
    }
    ConfigurationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfigurationPage');
    };
    ConfigurationPage.prototype.returnToLogin = function () {
        this.inputTitle;
        this.navCtrl.setRoot(LoginPage);
    };
    ConfigurationPage.prototype.addServer = function () {
        var _this = this;
        var vm = this;
        var title = vm.inputTitle.value;
        var ip = vm.inputIp.value;
        if (typeof title === "undefined" || title.length < 0 || typeof ip === "undefined" || ip.length < 5) {
            return;
        }
        vm.storage.get('SmartHomeServer').then(function (val) {
            if (val != null) {
                _this.servers = JSON.parse(val);
            }
            var newServer = {};
            newServer.title = title;
            newServer.ip = ip;
            vm.servers.push(newServer);
            vm.storage.set('SmartHomeServer', JSON.stringify(vm.servers));
            vm.inputTitle.value = '';
            vm.inputIp.value = '';
        });
    };
    ConfigurationPage.prototype.removeItem = function (server) {
        var vm = this;
        vm.storage.get('SmartHomeServer').then(function (val) {
            vm.servers = JSON.parse(val);
            vm.servers.splice(vm.servers.indexOf(server), 1);
            vm.storage.set('SmartHomeServer', JSON.stringify(vm.servers));
        });
    };
    __decorate([
        ViewChild('title'),
        __metadata("design:type", TextInput)
    ], ConfigurationPage.prototype, "inputTitle", void 0);
    __decorate([
        ViewChild('ip'),
        __metadata("design:type", TextInput)
    ], ConfigurationPage.prototype, "inputIp", void 0);
    ConfigurationPage = __decorate([
        Component({
            selector: 'page-configuration',
            templateUrl: 'configuration.html',
            styles: ['configuration.css']
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], ConfigurationPage);
    return ConfigurationPage;
}());
export { ConfigurationPage };
//# sourceMappingURL=configuration.js.map