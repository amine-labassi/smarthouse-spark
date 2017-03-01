import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ZonePage} from "../zone/zone";

@Component({
  selector: 'page-domotique',
  templateUrl: 'domotique.html'
})
export class DomotiquePage
{
  items: any = [];
  searchFilter: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
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
    );
  }

  openNavZonePage(item)
  {
    this.navCtrl.push(ZonePage, { 'item': item });
  }
}
