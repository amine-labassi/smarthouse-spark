import {Window} from "./Window";
import {Lamp} from "./Lamp";
import {Cooler} from "./Cooler";
export class Zone {
  constructor(
    public id:number,
    public title:string,
    public windows:Window[],
    public lamps:Lamp[],
    public coolers:Cooler[],
    public favoris:boolean
  ){}
}
