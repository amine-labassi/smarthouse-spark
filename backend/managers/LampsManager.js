const zones = require("./../i2c/SmarthouseConfig").zones;

class LampsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openLamp(lamp) {
        if (this.gpioAdapter.getState(lamp.mcpOutput, lamp.addressOutput)) {
            this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, true, 200);
        }
        return true;
    }

    closeLamp(lamp) {
        if (this.gpioAdapter.getState(lamp.mcpOutput, lamp.addressOutput)) {
            this.gpioAdapter.setState(lamp.mcpInput, lamp.addressInput, false, 200);
        }
        return true;
    }

    openLampAll() {
        zones.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpOutput, elem.addressOutput)) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, true, 200);
                }
            });
        });
        return true;
    }

    closeLampAll() {
        zones.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpOutput, elem.addressOutput)) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, true, 200);
                }
            });
        });
        return true;
    }

}

module.exports = new WindowsManager();
