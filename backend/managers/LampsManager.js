const config = require("./../i2c/SmarthouseConfig").zones;

class LampsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    setStatus(){
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                elem.status = this.gpioAdapter.getState(elem.mcpInput, elem.addressInput)


            });
        });
    }
    openLamp(lamp) {
        if (this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
            this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
        }
        return true;
    }

    closeLamp(lamp) {
        if (!this.gpioAdapter.getState(lamp.mcpInput, lamp.addressInput)) {
            this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, 200);
        }
        return true;
    }

    openLampAll() {
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpInput, elem.addressInput) == true) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, 200);
                }
            });
        });
        return true;
    }

    closeLampAll() {
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpInput, elem.addressInput)) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, 200);
                }
            });
        });
        return true;
    }

}

module.exports = new WindowsManager();
