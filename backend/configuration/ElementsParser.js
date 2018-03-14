/**
 * Created by Yassine Chbinou on 13/03/2018.
 */
const fs = require('fs');

var configAsStr = fs.readFileSync('./ressources/elements');
const config = JSON.parse(configAsStr);
module.export = {
    listOfMcps: config.mcps,
    listOfZones: config.zones
}
