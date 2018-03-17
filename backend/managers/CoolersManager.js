/**
 * Created by Yassine Chbinou on 14/03/2018.
 */
const zones = require("./../i2c/SmarthouseConfig").zones;

class CoolersManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    getStatus() {
        var self = this;
        zones.forEach((zone) => {
            zone.coolers.forEach((cooler) => {
                cooler.status = self.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput);
            });
        });
    }

    openCooler(cooler) {
        var self = self;
        if (!self.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
            self.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
        }
        return true;
    }

    closeCooler(cooler) {
        var self = this;
        if (self.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
            self.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
        }
        return true;
    }

    openCoolerAll() {
        var self = this;
        zones.forEach((zone) => {
            zone.coolers.forEach((cooler) => {
                if (!self.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
                      self.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
                }
            });
        });
        return true;
    }

    closeCoolerAll() {
        var self = this;
        zones.forEach((zone) => {
            zone.coolers.forEach((cooler) => {
                if (self.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
                    self.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
                }
            });
        });
        return true;
    }
}

module.exports = new CoolersManager();
