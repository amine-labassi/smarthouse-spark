var router = require('express').Router();
var zones = require('../i2c/SmarthouseConfig').zones;
var omitDeep = require('omit-deep');
var WebSocketService = require('../util/WebSocketService');
var lampMgr = require('../managers/LampsManager');
var coolerMgr = require('../managers/CoolersManager');
var gpioAdapter = require('../i2c/GpioAdapaterFactory');
var notifDelay = 3000; // 3 secands
var confDelay = 14400000; // 4 houres

if (!isNaN(parseInt(process.env.NOTIF_DELAY))) {
    notifDelay = parseInt(process.env.NOTIF_DELAY);
}

setInterval(function () {
    WebSocketService.notifyAllClients(zones);
}, notifDelay);
setInterval(function () {
    gpioAdapter.initGpio();
}, confDelay);

router.get('/status', function (req, res) {
    lampMgr.getStatus();
    coolerMgr.getStatus();
    res.json(
        omitDeep(
            JSON.parse(JSON.stringify(zones)),
            ['mcpInput', 'mcpOutput',
                'addressInput', 'addressOutput',
                'mcpUp', 'addressUp', 'upTime',
                'mcpDown', 'addressDown', 'downTime']
        )
    ).end();
});

module.exports = router;

