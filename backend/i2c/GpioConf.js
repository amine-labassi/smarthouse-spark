/**
 * Created by Yassine Chbinou on 13/03/2018.
 */
var i2c = require('i2c-bus'),
    i2c1 = i2c.openSync(1);

var mcps = require("./../configuration/ElementsParser");

for (mcp in mcps){
    i2c1.writeByteSync(mcps[mcp].address, 0x00, mcps[mcp].porta);
    i2c1.writeByteSync(mcps[mcp].address, 0x12, 0x00);
    i2c1.writeByteSync(mcps[mcp].address, 0x00, mcps[mcp].portb);
    i2c1.writeByteSync(mcps[mcp].address, 0x13, 0x00);

}