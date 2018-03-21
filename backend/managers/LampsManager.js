const zones = require("./../i2c/SmarthouseConfig").zones;

class LampsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    getStatus() {
        var self = this;
        zones.forEach((zone) => {
            zone.lamps.forEach((lamp) => {
                lamp.status = self.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)


            });
        });
    }

    openLamp(lamp) {
        var self = this;
        if (!self.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
            self.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);

        }
        return true;
    }

    closeLamp(lamp) {
        var self = this;
        if (self.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
            self.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);

        }
        return true;
    }

    openLampAll() {
        var self = this;

        self.gpioAdapter.setStateZoneLamps(zones, false);

        return true;
    }

    closeLampAll() {
        var self = this;
        zones.forEach((zone) => {
            zone.lamps.forEach((lamp) => {
                if (self.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
                    self.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
                }
            });
        });
        return true;
    }

}

module.exports = new LampsManager();
