const  zones = require("./../i2c/SmarthouseConfig").zones;

class WindowsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openWindow(window) {
        let windowIsUp = this.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = this.gpioAdapter.getState(window.mcpDown, window.addressDown);
        if (!windowIsDown || !windowIsUp) {
            this.gpioAdapter.setState(window.mcpUp, window.addressUp, window.upTime);
            return true;
        }
        return false;
    }

    closeWindow(window) {
        let windowIsUp = this.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = this.gpioAdapter.getState(window.mcpDown, window.addressDown);
        if (!windowIsDown || !windowIsUp) {
            this.gpioAdapter.setState(window.mcpDown, window.addressDown, window.downTime);
            return true;
        }
        return false;
    }

    openWindowAll() {
        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                if (this.gpioAdapter.getState(window.mcpUp, window.addressUp) == true || this.gpioAdapter.getState(window.mcpDown, window.addressDown)) {
                    this.gpioAdapter.setState(window.mcpUp, window.addressUp, window.upTime);
                    return true;
                }
            });
        });
        return true;
    }

    colseWindowAll() {
        zones.forEach((zone) => {
         zone.windows.forEach((window) => {
            if (this.gpioAdapter.getState(window.mcpUp, window.addressUp) || this.gpioAdapter.getState(window.mcpDown, window.addressDown)) {
                this.gpioAdapter.setState(window.mcpDown, window.addressUp, window.downTime);
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
            this.gpioAdapter.setState(window.mcpDown, window.addressDown, window.downTime)
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

        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                let windowIsUp = this.gpioAdapter.getState(window.mcpUp, window.addressUp);
                let windowIsDown = this.gpioAdapter.getState(window.mcpDown, window.addressDown);
                let upTime = (elem.upTime * pos)/100;
                if (!windowIsUp || !windowIsDown) {
                    this.gpioAdapter.setState(window.mcpDown, window.addressDown, window.downTime)
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
            });
        });
    }

}

module.exports = new WindowsManager();
