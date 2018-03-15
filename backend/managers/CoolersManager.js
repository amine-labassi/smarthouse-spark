/**
 * Created by Yassine Chbinou on 14/03/2018.
 */

class CoolersManager {

    constructor(){
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    setStatus(){
        config.forEach((elem) => {
            elem.coolers.forEach((elem) => {
                elem.status = this.gpioAdapter.getState(elem.mcpInput, elem.addressInput)


            });
        });
    }
    openCooler(cooler){
        if (this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
            this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
        }
        return true;
    }

    closeCooler(cooler){
        if (!this.gpioAdapter.getState(cooler.mcpInput, cooler.addressInput)) {
            this.gpioAdapter.setState(cooler.mcpOutput, cooler.addressOutput, 200);
        }
        return true;
    }

    openCoolerAll(){
        config.forEach((elem) => {
            elem.coolers.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpInput, elem.addressInput)) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, 200);
                }
            });
        });
        return true;
    }

    closeCoolerAll(){
        config.forEach((elem) => {
            elem.coolers.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpInput, elem.addressInput)) {
                    this.gpioAdapter.setState(elem.mcpOutput, elem.addressOutput, 200);
                }
            });
        });
        return true;
    }




}

module.exports = new CoolersManager();
