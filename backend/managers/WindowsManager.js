const zones = require("../arduino/SmarthouseConfig").zones;

class WindowsManager {

    constructor() {
        this.gpioAdapter = require('../arduino/WindowWorker');
    }

    openWindow(window, zoneID) {
        var self = this;
        var localPointer = zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer +1;
        zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer = localPointer;
        self.gpioAdapter.winOpen(window.arduino, window.id, window.upTime, window.identifier, zoneID, window.pointer)
        return true;

    }

    closeWindow(window, zoneID) {
        var self = this;
        var localPointer = zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer +1;
        zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer = localPointer;
        self.gpioAdapter.winColes(window.arduino, window.id, window.downTime, window.identifier, zoneID, window.pointer)
        return true;
    }

    stopWindow(window, zoneID) {
        var self = this;
        zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer = zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer +1;

        self.gpioAdapter.winStop(window.arduino, window.id);

        return false;
    }

    /*openWindowAll() {
        var self = this;
        var localPointer = zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer +1;
        zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer = localPointer;
        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                if (self.gpioAdapter.getState(window.mcpUp, window.addressUp) && self.gpioAdapter.getState(window.mcpDown, window.addressDown)) {
                    self.gpioAdapter.winMouve(window.mcpUp, window.addressUp, window.upTime, window.identifier, zone.id, localPointer);
                    return true;
                }
            });
        });
        return true;
    }*/
/*
    colseWindowAll() {
        var self = this;
        var localPointer = zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer +1;
        zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer = localPointer;
        zones.forEach((zone) => {
            zone.windows.forEach((window) => {
                if (self.gpioAdapter.getState(window.mcpUp, window.addressUp) && self.gpioAdapter.getState(window.mcpDown, window.addressDown)) {
                    self.gpioAdapter.winMouve(window.mcpDown, window.addressUp, window.downTime, window.identifier, zone.id, localPointer);
                    return true;
                }
            });
        });
        return true;
    }*/

    mouveWindow(window, pos, zoneID) {
        var self = this;
        var localPointer = zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer +1;
        zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer = localPointer;

        let upTime = (window.upTime * pos) / 100;

        self.gpioAdapter.winColes(window.arduino, window.id, window.downTime, window.identifier, zoneID, window.pointer)
                .then(
                    function (success) {
                        if(localPointer == zones.filter(z => z.id == zoneID)[0].windows.filter(w => w.identifier == window.identifier)[0].pointer)
                        {self.gpioAdapter.winOpen(window.arduino, window.id, upTime, window.identifier, zoneID, window.pointer)
                            .then(
                                function (success) {
                                },
                                function (error) {
                                    console.error('enable to open window ' + window.identifier);
                                }
                            )}
                    },
                    function (error) {
                        console.error('enable to close window ' + window.identifier);
                    }
                );

        return windowIsUp || windowIsDown;
    }



}

module.exports = new WindowsManager();
