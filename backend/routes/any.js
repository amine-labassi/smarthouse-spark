var router = require('express').Router();
var zones = require('../i2c/SmarthouseConfig').zones;
var omitDeep = require('omit-deep');
var WebSocketService = require('../util/WebSocketSessions');

var notifDelay = 3000;

setInterval(function(){
    WebSocketService.notifyAllClients(zones);
}, notifDelay);

router.get('/status', function(req, res) {
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

