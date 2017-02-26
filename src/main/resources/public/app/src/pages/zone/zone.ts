import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
  styles : ['zone.scss']
})
export class ZonePage
{
  zone:any[];
  shSlideOptions = {
    pager:true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.zone = navParams.get('item');
  }

  switchOnLamp(lamp:any)
  {
    lamp.status = true;
  }

  switchOffLamp(lamp:any)
  {
    lamp.status = false;
  }

  openTheWindow(mywindow:any)
  {
   mywindow.status = true;
  }

  closeTheWindow(mywindow:any)
  {
    mywindow.status = false;
  }

  hoter(airconditionner:any)
  {
    if(airconditionner.temperature < airconditionner.max)
    {
      airconditionner.temperature = airconditionner.temperature + 1;
    }
  }

  colder(airconditionner:any)
  {
    if(airconditionner.temperature > airconditionner.min)
    {
      airconditionner.temperature = airconditionner.temperature - 1;
    }
  }
}
