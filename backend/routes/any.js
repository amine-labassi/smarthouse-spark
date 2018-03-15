var router = require('express').Router();
var zones = require('../i2c/SmarthouseConfig').zones;
var omitDeep = require('omit-deep');
var WebSocketService = require('../util/WebSocketSessions');
var lampMgr = require('../managers/LampsManager');
var coolerMgr = require('../managers/CoolersManager');

var notifDelay = 3000;

if(!isNaN(parseInt(process.env.NOTIF_DELAY))){
    notifDelay = parseInt(process.env.NOTIF_DELAY);
}

setInterval(function(){
    WebSocketService.notifyAllClients(zones);
}, notifDelay);

router.get('/status', function(req, res) {
    lampMgr.getStatus();
    coolerMgr.getStatus();
    res.json(
        omitDeep(
            zones,
            ['mcpInput', 'mcpOutput',
             'addressInput', 'addressOutput',
             'mcpUp', 'addressUp', 'upTime',
             'mcpDown', 'addressDown', 'downTime']
        )
    ).end();
});

module.exports = router;

