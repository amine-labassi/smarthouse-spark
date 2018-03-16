class GpioAdapterMock {

    constructor(){}

    setState(mcp, pin, delay){
        var self = this;
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    getState(mcp, pin) {
        return true;
    }
}

module.exports = new GpioAdapterMock();