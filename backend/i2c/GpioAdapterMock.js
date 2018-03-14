/**
 * Created by Yassine Chbinou on 13/03/2018.
 */

class GpioAdapterMock {

    constructor(){}

    setState(mcp, pin, status){
        return status;
    }

    getState(mcp, pin) {
        return true;
    }
}

module.exports = new GpioAdapter();