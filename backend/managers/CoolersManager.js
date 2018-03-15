/**
 * Created by Yassine Chbinou on 14/03/2018.
 */

class CoolersManager {

    constructor(){
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openCooler(cooler){
        if (this.gpioAdapter.getState(cooler.mcpOutput, cooler.addressOutput) == true) {
            this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, true, 200);
        }
        return true;
    }

    closeCooler(cooler){
        if (this.gpioAdapter.getState(cooler.mcpOutput, cooler.addressOutput) == false) {
            this.gpioAdapter.setState(cooler.mcpInput, cooler.addressInput, false, 200);
        }
        return true;
    }

    openCoolerAll(){
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpOutput, elem.addressOutput) == true) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, true, 200);
                }
            });
        });
        return 'hello';
    }

    closeCoolerAll(){
        config.forEach((elem) => {
            elem.lamps.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpOutput, elem.addressOutput) == false) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, true, 200);
                }
            });
        });
        return 'hello';
    }




}

module.exports = new CoolersManager();
