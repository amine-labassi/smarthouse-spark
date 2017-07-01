import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ZonePage} from "../zone/zone";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ENV} from "../../config/environment.dev";

@Component({
  selector: 'page-domotique',
  templateUrl: 'domotique.html'
})
export class DomotiquePage
{
  items: any = [];
  searchFilter: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController)
  {
    var vm = this;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    vm.items = vm.http.get(ENV.API_URL + "/api/switching/lamp/all/status", options)
      .subscribe(function(data){
          vm.items = JSON.parse(data['_body']);
        },
        function (error) {
          vm.showAlert('Je n\'arrive pas à m\'initialiser');
        });
/*
    this.items.push(
      {
        'id':1,
        'title' : 'Chambre parents',
        'lamps' : [
          {
            'id' : 11,
            'title' : 'Plafonnier 3 lampes',
            'status' : true
          },
          {
            'id' : 12,
            'title' : 'Plafonnier 3 lampes',
            'status' : false
        }],
        'windows' : [
          {
            'id' : 13,
            'title' : 'Fenêtre face'
          },
          {
            'id' : 14,
            'title' : 'Fenêtre gauche'
          }],
        'airconditionners' : [
          {
            'id' : 15,
            'title' : 'Individuel',
            'temperature' : 22,
            'max' : 28,
            'min' : 6
          }]
      }
    );
    this.items.push(
      {
        'id':2,
        'title' : 'Chambre garçons',
        'lamps' : [
          {
            'id' : 21,
            'title' : 'Plafonnier 3 lampes',
            'status' : true
          },
          {
            'id' : 22,
            'title' : 'Plafonnier 3 lampes',
            'status' : true
          }],
        'windows' : [
          {
            'id' : 23,
            'title' : 'Fenêtre face 1'
          },
          {
            'id' : 24,
            'title' : 'Fenêtre face 2'
          }],
        'airconditionners' : [
          {
            'id' : 25,
            'title' : 'Individuel',
            'temperature' : 18,
            'max' : 28,
            'min' : 6
          }]
      }
    );*/
  }

  loadZones()
  {

  }

  openNavZonePage(item)
  {
    this.navCtrl.push(ZonePage, { 'item': item });
  }


  showAlert(msg: string)
  {
    let alert = this.alertCtrl.create({
      title: 'Oops!!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
