/**
 * Created by Yassine Chbinou on 13/03/2018.
 */
const zones = require("../arduino/SmarthouseConfig").zones;

class WindowWorker {

    constructor() {
        var self = this;
        this.arduino = require('../arduino/ArduinoConfig');


    }


 /*   setStateZoneLamps(zones, stauts) {
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                for(let zone in zones){
                    for(let l in zones[zone].lamps){
                        var lamp= zones[zone].lamps[l]
                        if (lamp.addressOutput < 8) {
                            if (self.getState(lamp.mcpInput, lamp.addressInput) == stauts) {
                                var portData = self.i2c1.readByteSync(lamp.mcpOutput, 0x12);
                                portData = portData & (255 - (255 & (1 << lamp.addressOutput)))
                                self.i2c1.writeByteSync(lamp.mcpOutput, 0x14, portData);}
                        } else {
                            var pin = lamp.addressOutput - 8;
                            if (self.getState(lamp.mcpInput, lamp.addressInput) == stauts) {
                                var portData = self.i2c1.readByteSync(lamp.mcpOutput, 0x13);
                                portData = portData & (255 - (255 & (1 << pin)))
                                self.i2c1.writeByteSync(lamp.mcpOutput, 0x15, portData);}
                        }
                    }}

                setTimeout(function () {
                    try {
                        for(let zone in zones){
                            for(let l in zones[zone].lamps){
                                var lamp= zones[zone].lamps[l];

                                if (lamp.addressOutput < 8) {
                                    var portData = self.i2c1.readByteSync(lamp.mcpOutput, 0x14) | (1 << lamp.addressOutput);
                                    self.i2c1.writeByteSync(lamp.mcpOutput, 0x14, portData);
                                } else {
                                    pin = lamp.addressOutput - 8;
                                    var portData = self.i2c1.readByteSync(lamp.mcpOutput, 0x15) | (1 << pin);
                                    self.i2c1.writeByteSync(lamp.mcpOutput, 0x15, portData);
                                }

                            }}
                        resolve(true);}
                    catch (e1) {
                        self.initGpio();
                        reject(e1);
                    }}, 350);

            }

            catch (e) {
                self.initGpio();
                reject(e);
            }
        });
    }*/

    winOpen(ard, win, delay, identifier,  zoneid, localPointer){


       var self = this;
       return new Promise((resolve, reject) => {
           try {

               self.arduino.portsa[ard].write("O"+win);
               setTimeout(function () {
                   try {
                       if (zones.filter(z => z.id == zoneid)[0].windows.filter(w => w.identifier == identifier)[0].pointer == localPointer) {
                           self.arduino.portsa[ard].write("P"+win);
                       }
                       resolve(true);
                   } catch (e1) {
                       reject(e1);
                   }
               }, delay);


           }catch (e2){}

       })}
    winColes(ard, win, delay, identifier,  zoneid, localPointer){


        var self = this;
        return new Promise((resolve, reject) => {
            try {

                self.arduino.portsa[ard].write("F"+win);
                setTimeout(function () {
                    try {
                        if (zones.filter(z => z.id == zoneid)[0].windows.filter(w => w.identifier == identifier)[0].pointer == localPointer) {
                            self.arduino.portsa[ard].write("P"+win);
                        }
                        resolve(true);
                    } catch (e1) {
                        reject(e1);
                    }
                }, delay);


            }catch (e2){}

        })}
    winStop(ard, win){
       var self = this;
       self.arduino.portsa[ard].write("P"+win);
       }

}
module.exports = new WindowWorker();