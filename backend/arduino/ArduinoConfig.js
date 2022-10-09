/**
 * Created by YassineChbinou on 11/09/2020.
 */
var arduinos = require("./SmarthouseConfig").arduinos;
const { SerialPort } = require('serialport')

const zones = require("../arduino/SmarthouseConfig").zones;
const { ReadlineParser } = require('@serialport/parser-readline')
const parser = new ReadlineParser()

var portsa = [];
var parsers = [];
SerialPort.list().then(
    ports => {
        console.log(ports)
        ports.forEach(port => {

            console.log(`${port.path}\t${port.serialNumber || ''}\t${port.manufacturer || ''}`)
            arduinos.forEach(arduino => {
                if(arduino.ser== port.serialNumber){
                    portsa[arduino.address] = new SerialPort({path :port.path,  baudRate: 2000000 })

                }
                setTimeout(function () {
                    try {

                        portsa[arduino.address].write("o0")
                        portsa.forEach(port =>{
                            port.pipe(parser).on('data', line => {

                                console.log(line)
                                zones.forEach((zone) => {
                                    zone.lamps.forEach((lamp) => {
                                        if(lamp.arduino == arduino.address){
                                            lamp.status = Number(line[lamp.id])

                                        }


                                    });
                                });
                                zones.forEach((zone) => {
                                    zone.coolers.forEach((cooler) => {
                                        if(cooler.arduino == arduino.address){
                                            cooler.status = Number(line[cooler.id])

                                        }
                                    });
                                });

                            })
                        })

                    } catch (e1) {
                        console.log(e1)
                    }
                }, 200);
            })
        })
    },
    err => {
        console.error('Error listing ports', err)
    }
)

module.exports.portsa = portsa;
