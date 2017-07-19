/**
 * Created by Yassine Chbinou on 11/07/2017.
 */


import {Component, ElementRef, ViewChild} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {Server} from "../../model/Server";


@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
  styles: ['configuration.css']
})

export class ConfigurationPage
{
  @ViewChild('title') inputTitle:ElementRef;
  @ViewChild('ip') inputIp:ElementRef;

  items:Array<Server> = [];



             constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage){
               storage.get('SmartHomeServer').then((val) =>
               {
                 if(val != null)
                 {
                   this.items = JSON.parse(val);
                 }
               });
               }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  returnToLogin()
  {
    this.inputTitle;
    this.navCtrl.setRoot(LoginPage);

  }



  addServer()
  {
    var vm = this;
    vm.storage.get('SmartHomeServer').then((val) => {
      if(val != null)
      {
        this.items = JSON.parse(val);
      }
      var newServer:Server = {} as Server;
      newServer.title = vm.inputTitle["_value"];
      newServer.ip = vm.inputIp["_value"];
      vm.items.push(newServer);
      vm.storage.set('SmartHomeServer', JSON.stringify(vm.items));

    });
  }


  removeItem(server:Server)
  {
    var vm = this;
    vm.storage.get('SmartHomeServer').then((val) =>
    {
      vm.items = JSON.parse(val);
      vm.items.splice(vm.items.indexOf(server), 1);
      vm.storage.set('SmartHomeServer', JSON.stringify(vm.items));
    });
  }
}
