/**
 * Created by Yassine Chbinou on 13/03/2018.
 */

class GpioAdapter {

    constructor(){
        this.i2c = require('i2c-bus');
        this.i2c1 = this.i2c.openSync(1);
    }

    setState(mcp, pin, status){
        if (pin < 8){
            portData = this.i2c1.readByteSync(mcp, 0x12);
            if(status == true){
                portData = portData | (1<<pin);
                this.i2c1.writeByteSync(mcp, 0x12, portData);
                return true;
            }
            else {
                portData = portData & (255 - (255 & (1<< pin)))
                this.i2c1.writeByteSync(mcp, 0x12, portData);
                return false;
            }
        }
        else {
            pin = pin - 8;
            portData = this.i2c1.readByteSync(mcp, 0x13);
            if(status == true){
                portData = portData | (1<<pin);
                this.i2c1.writeByteSync(mcp, 0x13, portData);
                return true;
            }
            else {
                portData = portData & (255 - (255 & (1<< pin)))
                this.i2c1.writeByteSync(mcp, 0x13, portData);
                return false;
            }
        }
    }

    getState(mcp, pin) {
        if( pin < 8){
            portData = this.i2c1.readByteSync(mcp, 0x12);
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
            portData = this.i2c1.readByteSync(mcp, 0x13);
            pinValue = portData & (1 << pin);
            if (pinValue > 0) {
                return true
            }
            else {
                return false
            }
        }
    }
}
module.exports = new GpioAdapter();