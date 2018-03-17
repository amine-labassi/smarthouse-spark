/**
 * Created by Yassine Chbinou on 13/03/2018.
 */

class GpioAdapter {

    constructor() {
        var self = this;
        this.i2c = require('i2c-bus');
        this.i2c1 = this.i2c.openSync(1);
        this.config = require('./SmarthouseConfig');
        this.config.mcps.forEach((mcp) => {
            self.i2c1.writeByteSync(mcp.address, 0x00, mcp.porta);
            self.i2c1.writeByteSync(mcp.address, 0x12, 0xff);
            self.i2c1.writeByteSync(mcp.address, 0x00, mcp.portb);
            self.i2c1.writeByteSync(mcp.address, 0x13, 0xff);
        });
    }

    setState(mcp, pin, delay) {
        var self = this;
        return new Promise((resolve, reject) => {
            try
            {
                if (pin < 8)
                {
                    var portData = self.i2c1.readByteSync(mcp, 0x12);
                    portData = portData & (255 - (255 & (1 << pin)))
                    self.i2c1.writeByteSync(mcp, 0x12, portData);
                    setTimeout(function () {
                        try {
                            portData = portData | (1 << pin);
                            self.i2c1.writeByteSync(mcp, 0x12, portData);
                            resolve(true);
                        } catch (e1) {
                            reject(e1);
                        }
                    }, delay);
                }
                else
                {
                    pin = pin - 8;
                    var portData = self.i2c1.readByteSync(mcp, 0x13);
                    portData = portData & (255 - (255 & (1 << pin)))
                    self.i2c1.writeByteSync(mcp, 0x13, portData);
                    setTimeout(function () {
                        try {
                            portData = portData | (1 << pin);
                            self.i2c1.writeByteSync(mcp, 0x13, portData);
                            resolve(true);
                        } catch (e1) {
                            reject(e1);
                        }
                    }, delay);
                }
            }
            catch (e)
            {
                reject(e);
            }
        });
    }


    getState(mcp, pin)
    {
        var self = this;
        if (pin < 8)
        {
            var portData = self.i2c1.readByteSync(mcp, 0x12);
            var pinValue = portData & (1 << pin);
            if (pinValue > 0)
            {
                return false
            }
            else
            {
                return true
            }
        }
        else
        {
            pin = pin - 8
            var portData = self.i2c1.readByteSync(mcp, 0x13);
            var pinValue = portData & (1 << pin);
            if (pinValue > 0)
            {
                return true
            }
            else
            {
                return false
            }
        }
    }
}
module.exports = new GpioAdapter();