var router = require('express').Router();
var zones = require('../arduino/SmarthouseConfig').zones;
var omitDeep = require('omit-deep');
var WebSocketService = require('../util/WebSocketService');

var notifDelay = 3000; // 3 secands
var confDelay = 14400000; // 4 houres

if (!isNaN(parseInt(process.env.NOTIF_DELAY))) {
    notifDelay = parseInt(process.env.NOTIF_DELAY);
}

setInterval(function () {

    WebSocketService.notifyAllClients(zones);
}, notifDelay);


router.get('/status', function (req, res) {
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

