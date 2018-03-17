const zones = require("./../i2c/SmarthouseConfig").zones;

class LampsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    getStatus() {
        zones.forEach((zone) => {
            zone.lamps.forEach((lamp) => {
                lamp.status = this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)


            });
        });
    }

    openLamp(lamp) {
        if (!this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
            this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
        }
        return true;
    }

    closeLamp(lamp) {
        if (this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
            this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
        }
        return true;
    }

    openLampAll() {
        zones.forEach((zone) => {
            zone.lamps.forEach((lamp) => {
                if (!this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
                    this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
                }
            });
        });
        return true;
    }

    closeLampAll() {
        zones.forEach((zone) => {
            zone.lamps.forEach((lamp) => {
                if (this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
                    this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
                }
            });
        });
        return true;
    }

}

module.exports = new LampsManager();
