class GpioAdapterMock {

    constructor() {
    }

    setState(mcp, pin, delay) {
        var self = this;
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    getState(mcp, pin) {
        return true;
    }

    setStateZoneLamps(zones, stauts){
        return true;
    }
    winMouve(mcp, pin, delay, id, zoneid, localPointer)
    {
        return true;
    }
    winStop(mU, pU, mD, pD){
        return true;
    }


}

module.exports = new GpioAdapterMock();