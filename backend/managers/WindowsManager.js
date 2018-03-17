const zones = require("./../i2c/SmarthouseConfig").zones;

class WindowsManager {

    constructor() {
        this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
    }

    openWindow(window) {
        var self = this;
        let windowIsUp = self.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = self.gpioAdapter.getState(window.mcpDown, window.addressDown);
        if (windowIsDown && windowIsUp) {
            self.gpioAdapter.setState(window.mcpUp, window.addressUp, window.upTime);
            return true;
        }
        return false;
    }

    closeWindow(window) {
        var self = this;
        let windowIsUp = self.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = self.gpioAdapter.getState(window.mcpDown, window.addressDown);
        if (windowIsDown && windowIsUp) {
            self.gpioAdapter.setState(window.mcpDown, window.addressDown, window.downTime);
            return true;
        }
        return false;
    }

    openWindowAll() {
        var self = this;
        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                if (self.gpioAdapter.getState(window.mcpUp, window.addressUp) && self.gpioAdapter.getState(window.mcpDown, window.addressDown)) {
                    self.gpioAdapter.setState(window.mcpUp, window.addressUp, window.upTime);
                    return true;
                }
            });
        });
        return true;
    }

    colseWindowAll() {
        var self = this;
        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                if (self.gpioAdapter.getState(window.mcpUp, window.addressUp) && self.gpioAdapter.getState(window.mcpDown, window.addressDown)) {
                    self.gpioAdapter.setState(window.mcpDown, window.addressUp, window.downTime);
                    return true;
                }
            });
        });
        return true;
    }

    mouveWindow(window, pos) {
        var self = this;
        let windowIsUp = self.gpioAdapter.getState(window.mcpUp, window.addressUp);
        let windowIsDown = self.gpioAdapter.getState(window.mcpDown, window.addressDown);
        let upTime = (window.upTime * pos) / 100;
        if (windowIsUp && windowIsDown) {
            self.gpioAdapter.setState(window.mcpDown, window.addressDown, window.downTime)
                .then(
                    function (success) {
                        self.gpioAdapter.setState(window.mcpUp, window.addressUp, upTime)
                            .then(
                                function (success) {
                                },
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
        return windowIsUp || windowIsDown;
    }

    mouveWindowAll(pos) {
        var self = this;
        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                let windowIsUp = self.gpioAdapter.getState(window.mcpUp, window.addressUp);
                let windowIsDown = self.gpioAdapter.getState(window.mcpDown, window.addressDown);
                let upTime = (window.upTime * pos) / 100;
                if (windowIsUp && windowIsDown) {
                    this.gpioAdapter.setState(window.mcpDown, window.addressDown, window.downTime)
                        .then(
                            function (success) {
                                self.gpioAdapter.setState(window.mcpUp, window.addressUp, upTime)
                                    .then(
                                        function (success) {
                                        },
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
