import {Window} from "./Window";
import {Lamp} from "./Lamp";
import {AirConditionner} from "./AirConditionner";
export class Zone {
  constructor(
    public id:number,
    public title:string,
    public windows:Window[],
    public lamps:Lamp[],
    public airConditionners:AirConditionner,
    public favoris:boolean
  ){}
}
