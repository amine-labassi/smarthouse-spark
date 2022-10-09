const zones = require("../arduino/SmarthouseConfig").zones;

class LampsManager {

    constructor() {
        this.arduino = require('../arduino/ArduinoConfig')
    }

    getStatus() {
        var self = this;

    }

    openLamp(lamp) {
        var self = this;
        self.arduino.portsa[lamp.arduino].write("o"+lamp.id)
        return true;
    }

    closeLamp(lamp) {
        var self = this;

        self.arduino.portsa[lamp.id].write("f"+lamp.arduino)
        return true;
    }

    openLampAll() {
        var self = this;



        return true;
    }

    closeLampAll() {
        var self = this;

        return true;
    }

}

module.exports = new LampsManager();
