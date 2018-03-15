const  config = require("./../i2c/SmarthouseConfig").zones;

class WindowsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openWindow(window) {
        if (this.gpioAdapter.getState(window.mcpUp, window.addressUp) == true || this.gpioAdapter.getState(window.mcpDown, window.addressDown) == true) {
            this.gpioAdapter.setState(window.mcpUp, window.addressUp, true, window.upTime);
            return true;
        }
        return false;
    }

    colseWindow(window) {
        if (this.gpioAdapter.getState(window.mcpUp, window.addressUp) == true || this.gpioAdapter.getState(window.mcpDown, window.addressDown) == true) {
            this.gpioAdapter.setState(window.mcpDown, window.addressDown, true, window.downTime);
            return true;
        }
        return false;
    }

    openWindowAll() {
        config.forEach((elem) => {
            elem.windows.forEach((elem) => {
                if (this.gpioAdapter.getState(elem.mcpUp, elem.addressUp) == true || this.gpioAdapter.getState(elem.mcpDown, elem.addressDown) == true) {
                    this.gpioAdapter.setState(elem.mcpUp, elem.addressUp, true, elem.upTime);
                    return true;
                }
            });
        });
        return true;
    }

    colseWindowAll() {
        config.forEach((elem) => {
         elem.windows.forEach((elem) => {
            if (this.gpioAdapter.getState(elem.mcpUp, elem.addressUp) == true || this.gpioAdapter.getState(elem.mcpDown, elem.addressDown) == true) {
                this.gpioAdapter.setState(elem.mcpDown, elem.addressUp, true, elem.downTime);
                return true;
            }
        });
    });
        return true;
    }
    mouveWindow(window, pos) {


        return 'hello';
    }

    mouveWindowAll(pos) {

        return 'hello';
    }

}

module.exports = new WindowsManager();
