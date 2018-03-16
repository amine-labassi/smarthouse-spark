/**
 * Created by Yassine Chbinou on 14/03/2018.
 */
const zones = require("./../i2c/SmarthouseConfig").zones;

class CoolersManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    getStatus() {
        zones.forEach((zone) => {
            zone.coolers.forEach((cooler) => {
                cooler.status = this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput);
            });
        });
    }

    openCooler(cooler) {
        if (this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
            this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
        }
        return true;
    }

    closeCooler(cooler) {
        if (!this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
            this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
        }
        return true;
    }

    openCoolerAll() {
        zones.forEach((zone) => {
            zone.coolers.forEach((cooler) => {
                if (this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
                    this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
                }
            });
        });
        return true;
    }

    closeCoolerAll() {
        zones.forEach((zone) => {
            zone.coolers.forEach((cooler) => {
                if (this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
                    this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
                }
            });
        });
        return true;
    }
}

module.exports = new CoolersManager();
