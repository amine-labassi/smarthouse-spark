/**
 * Created by Yassine Chbinou on 14/03/2018.
 */
/**
 * Created by Yassine Chbinou on 13/03/2018.
 */


var i2c = require('i2c-bus'),
    i2c1 = i2c.openSync(1);


var GpioAdapter = function () {

};

GpioAdapter.prototype.setState = function (mcp, pin, status) {
    if (pin < 8){
        portData = i2c1.readByteSync(mcp, 0x12);
        if(status == true){
            portData = portData | (1<<pin);
            i2c1.writeByteSync(mcp, 0x12, portData);

            return true;
        }
        else {
            portData = portData & (255 - (255 & (1<< pin)))
            i2c1.writeByteSync(mcp, 0x12, portData);
            return false;
        }
    }
    else {
        pin = pin - 8;
        portData = i2c1.readByteSync(mcp, 0x13);
        if(status == true){
            portData = portData | (1<<pin);
            i2c1.writeByteSync(mcp, 0x13, portData);
            return true;
        }
        else {
            portData = portData & (255 - (255 & (1<< pin)))
            i2c1.writeByteSync(mcp, 0x13, portData);
            return false;
        }
    }

};
GpioAdapter.prototype.getState = function (mcp, pin) {
    if( pin < 8){
        portData = i2c1.readByteSync(mcp, 0x12);
        pinValue = portData & (1<<pin);
        if(pinValue >0){
            return true
        }
        else {
            return false
        }
    }
    else {
        pin = pin - 8
        portData = i2c1.readByteSync(mcp, 0x13);
        pinValue = portData & (1 << pin);
        if (pinValue > 0) {
            return true
        }
        else {
            return false
        }
    }
};

module.export = new GpioAdapter();