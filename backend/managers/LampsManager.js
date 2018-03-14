/**
 * Created by Yassine Chbinou on 14/03/2018.
 */
const  config = require("./../i2c/SmarthouseConfig").zones;
class LampsManager {

    constructor(){
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openLamp(lamp){
        if (this.gpioAdapter.getState(lamp.mcpOutput, lamp.addressOutput) == true) {
            this.gpioAdapter.setState(lamp.mcpOutput, lamp.addressOutput, true, 200);
        }
        return true;
    }

    closeLamp(lamp){
        if (this.gpioAdapter.getState(lamp.mcpOutput, lamp.addressOutput) == false) {
            this.gpioAdapter.setState(lamp.mcpInput, lamp.addressInput, false, 200);
        }
        return true;
    }

    openLampAll(){
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpOutput, elem.addressOutput) == true) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, true, 200);
                }
            });
        });
        return true;
    }

    closeLampAll(){
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpOutput, elem.addressOutput) == true) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, true, 200);
                }
            });
        });
    return true;
}

}

module.exports = new WindowsManager();
