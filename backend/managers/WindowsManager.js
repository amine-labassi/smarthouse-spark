const  config = require("./../i2c/SmarthouseConfig").zones;

class WindowsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openWindow(window) {
        let windowIsUp = this.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = this.gpioAdapter.getState(window.mcpDown, window.addressDown);
        if (!windowIsDown || !windowIsUp) {
            this.gpioAdapter.setState(window.mcpUp, window.addressUp, true, window.upTime);
            return true;
        }
        return false;
    }

    closeWindow(window) {
        let windowIsUp = this.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = this.gpioAdapter.getState(window.mcpDown, window.addressDown);
        if (!windowIsDown || !windowIsUp) {
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
        let windowIsUp = this.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = this.gpioAdapter.getState(window.mcpDown, window.addressDown);
        let upTime = (window.upTime * pos)/100;
        if (!windowIsUp || !windowIsDown) {
            this.gpioAdapter.setState(window.mcpDown, window.addressDown, true, window.downTime)
                .then(
                    function (success) {
                        this.gpioAdapter.setState(window.mcpUp, window.addressUp, upTime)
                            .then(
                                function (success) {},
                                function (error) {
                                    console.error('enable to open window ' + window.identifier);
                                }
                            )
                    },
                    function (error) {
                        console.error('enable to close window ' + window.identifier);
                    }
                );
        }
        return !windowIsUp || !windowIsDown;
    }

    mouveWindowAll(pos) {

        config.forEach((elem) => {
            elem.windows.forEach((elem) => {
                let windowIsUp = this.gpioAdapter.getState(elem.mcpUp, elem.addressUp);
                let windowIsDown = this.gpioAdapter.getState(elem.mcpDown, elem.addressDown);
                let upTime = (elem.upTime * pos)/100;
                if (!windowIsUp || !windowIsDown) {
                    this.gpioAdapter.setState(elem.mcpDown, elem.addressDown, elem.downTime)
                        .then(
                            function (success) {
                                this.gpioAdapter.setState(elem.mcpUp, elem.addressUp, upTime)
                                    .then(
                                        function (success) {},
                                        function (error) {
                                            console.error('enable to open window ' + window.identifier);
                                        }
                                    )
                            },
                            function (error) {
                                console.error('enable to close window ' + elem.identifier);
                            }
                        );
                }
            });
        });
    }

}

module.exports = new WindowsManager();
