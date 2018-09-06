/**
 * Created by Yassine Chbinou on 13/03/2018.
 */
var zones = require("../i2c/SmarthouseConfig").zones;
class GpioAdapter {

    constructor() {
        var self = this;
        this.i2c = require('i2c-bus');
        this.i2c1 = this.i2c.openSync(1);
        self.initGpio();

    }

    initGpio() {
        var self = this;
        this.config = require('./SmarthouseConfig');
        this.config.mcps.forEach((mcp) => {
            self.i2c1.writeByteSync(mcp.address, 0x00, mcp.porta);
            
            if(mcp.porta == 0){
                self.i2c1.writeByteSync(mcp.address, 0x12, 0xff);
            }

                self.i2c1.writeByteSync(mcp.address, 0x01, mcp.portb);
                
            if(mcp.portb == 0) {
                self.i2c1.writeByteSync(mcp.address, 0x13, 0xff);
            }        });
    }
    setState(mcp, pin, delay) {
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                if (pin < 8) {
                    var portData = self.i2c1.readByteSync(mcp, 0x12);
                    portData = portData & (255 - (255 & (1 << pin)))
                    self.i2c1.writeByteSync(mcp, 0x12, portData);
                    setTimeout(function () {
                        try {
                            portData = portData | (1 << pin);
                            self.i2c1.writeByteSync(mcp, 0x12, portData);
                            resolve(true);
                        } catch (e1) {
                            reject(e1);
                        }
                    }, delay);
                }
                else {
                    pin = pin - 8;
                    var portData = self.i2c1.readByteSync(mcp, 0x13);
                    portData = portData & (255 - (255 & (1 << pin)))
                    self.i2c1.writeByteSync(mcp, 0x13, portData);
                    setTimeout(function () {
                        try {
                            portData = portData | (1 << pin);
                            self.i2c1.writeByteSync(mcp, 0x13, portData);
                            resolve(true);
                        } catch (e1) {
                            reject(e1);
                        }
                    }, delay);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    setStateZoneLamps(zones, stauts) {
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
    }
    getState(mcp, pin) {
        var self = this;
        if (pin < 8) {
            
            var portData = self.i2c1.readByteSync(mcp, 0x12);
            var pinValue = portData & (1 << pin);
            if (pinValue > 0) {
                return true
            }
            else {
                return false
            }
        }
        else {
            
            pin = pin - 8
            var portData = self.i2c1.readByteSync(mcp, 0x13);
            var pinValue = portData & (1 << pin);
            if (pinValue > 0) {
                return true
            }
            else {
                return false
            }
        }
    }
    winMouve(mcp, pin, delay, id, zoneid, localPointer){


       var self = this;
       return new Promise((resolve, reject) => {
           try {
               if (pin < 8) {
                   var  portData = self.i2c1.readByteSync(mcp, 0x12);
                   portData = portData & (255 - (255 & (1 << pin)))
                   self.i2c1.writeByteSync(mcp, 0x12, portData);
                   setTimeout(function () {
                       try {
                           if(zones.filter(z => z.id == zoneid)[0].windows.filter(w => w.identifier == id)[0].pointer == localPointer)
                           {portData = self.i2c1.readByteSync(mcp, 0x12) | (1 << pin);
                           self.i2c1.writeByteSync(mcp, 0x12, portData);}
                           resolve(true);
                       } catch (e1) {
                           reject(e1);
                       }
                   }, delay);
               }
               else {
                   pin = pin - 8;
                   var portData = self.i2c1.readByteSync(mcp, 0x13);
                   portData = portData & (255 - (255 & (1 << pin)))
                   self.i2c1.writeByteSync(mcp, 0x13, portData);
                   setTimeout(function () {
                       try {
                           if(zones.filter(z => z.id == zoneid)[0].windows.filter(w => w.identifier == id)[0].pointer == localPointer)
                           {portData = self.i2c1.readByteSync(mcp, 0x13) | (1 << pin);
                               self.i2c1.writeByteSync(mcp, 0x13, portData);}
                           resolve(true);
                       } catch (e1) {
                           reject(e1);
                       }
                   }, delay);
               }
           }
           catch (e) {
               reject(e);
           }
       });

   }
    winStop(mU, pU, mD, pD){
       var self = this;
       if (pU < 8) {
           var portData = self.i2c1.readByteSync(mU, 0x12) | (1 << pU);
           self.i2c1.writeByteSync(mU, 0x14, portData);
       } else {
           var pin = pU - 8;
           var portData = self.i2c1.readByteSync(mU, 0x13) | (1 << pin);
           self.i2c1.writeByteSync(mU, 0x15, portData);
       }
       if (pD < 8) {
           var portData = self.i2c1.readByteSync(mD, 0x12) | (1 << pD);
           self.i2c1.writeByteSync(mD, 0x14, portData);
       } else {
           var pin = pD - 8;
           var portData = self.i2c1.readByteSync(mD, 0x13) | (1 << pin);
           self.i2c1.writeByteSync(mD, 0x15, portData);
       }

}}
module.exports = new GpioAdapter();