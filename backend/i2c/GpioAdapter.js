/**
 * Created by Yassine Chbinou on 13/03/2018.
 */

class GpioAdapter {

    constructor(){
        var self = this;
        this.i2c = require('i2c-bus');
        this.i2c1 = this.i2c.openSync(1);
        this.config = require('./SmarthouseConfig');
        this.config.mcps.forEach((elem) => {
            self.i2c1.writeByteSync(elem.address, 0x00, elem.porta);
            self.i2c1.writeByteSync(elem.address, 0x12, 0x00);
            self.i2c1.writeByteSync(elem.address, 0x00, elem.portb);
            self.i2c1.writeByteSync(elem.address, 0x13, 0x00);
        });
    }

    setState(mcp, pin, delay){
        var self = this;
        if (pin < 8){
            portData = this.i2c1.readByteSync(mcp, 0x12);

                portData = portData & (255 - (255 & (1<< pin)))
                this.i2c1.writeByteSync(mcp, 0x12, portData);
                setTimeout(function () {
                    portData = portData | (1<<pin);
                    this.i2c1.writeByteSync(mcp, 0x12, portData);
                },delay);
                return true;


        }
        else {
            pin = pin - 8;
            portData = this.i2c1.readByteSync(mcp, 0x13);
            portData = portData & (255 - (255 & (1<< pin)))
            this.i2c1.writeByteSync(mcp, 0x13, portData);
            setTimeout(function () {
                portData = portData | (1<<pin);
                this.i2c1.writeByteSync(mcp, 0x13, portData);
            },delay);
            return true;

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