/**
 * Created by Yassine Chbinou on 14/03/2018.
 */
const zones = require("../arduino/SmarthouseConfig").zones;

class CoolersManager {

    constructor() {
        this.arduino = require('../arduino/ArduinoConfig')
    }

    getStatus() {
        var self = this;

    }

    openCooler(cooler) {
        var self = this;
        self.arduino.portsa[cooler.id].write("o"+cooler.arduino);
        return true;
    }

    closeCooler(cooler) {
        var self = this;
        self.arduino.portsa[cooler.id].write("f"+cooler.arduino);
        return true;
    }

    openCoolerAll() {
        var self = this;

        return true;
    }

    closeCoolerAll() {
        var self = this;

        return true;
    }
}

module.exports = new CoolersManager();
