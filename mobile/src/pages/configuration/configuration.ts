/**
 * Created by Yassine Chbinou on 11/07/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, TextInput} from "ionic-angular";
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
  @ViewChild('title') inputTitle:TextInput;
  @ViewChild('ip') inputIp:TextInput;

  servers:Array<Server> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage){
     storage.get('SmartHomeServer').then(
       (val) => {
         if(val != null)
         {
           this.servers = JSON.parse(val);
         }
       }
     );
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
    let title = vm.inputTitle.value;
    let ip = vm.inputIp.value;
    if(typeof title  === "undefined" || title.length < 0 || typeof ip  === "undefined" || ip.length < 5){
      return;
    }
    vm.storage.get('SmartHomeServer').then((val) => {
      if(val != null)
      {
        this.servers = JSON.parse(val);
      }
      var newServer:Server = {} as Server;
      newServer.title = title;
      newServer.ip = ip;
      vm.servers.push(newServer);
      vm.storage.set('SmartHomeServer', JSON.stringify(vm.servers));
      vm.inputTitle.value = '';
      vm.inputIp.value = '';
    });
  }

  removeItem(server:Server)
  {
    var vm = this;
    vm.storage.get('SmartHomeServer').then((val) =>
    {
      vm.servers = JSON.parse(val);
      vm.servers.splice(vm.servers.indexOf(server), 1);
      vm.storage.set('SmartHomeServer', JSON.stringify(vm.servers));
    });
  }
}
