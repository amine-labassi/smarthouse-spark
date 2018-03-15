var router = require('express').Router();
var zones = require("../i2c/SmarthouseConfig").zones;
var windowMgr = require('../managers/WindowsManager');

router.get('/open', function(req, res) {
    windowMgr.openWindowAll();
    res.sendStatus(200);
});

router.get('/close', function(req, res) {
    windowMgr.closeWindowAll();
    res.sendStatus(200);
});

router.get('/:zoneid/:id/open/:val', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    var val = req.params.val;
    windowMgr.mouveWindow(
        zones.filter(z => z.id === zoneid).windows.filter(w => w.identifier === id)[0],
        parseInt(val)
    );
    res.sendStatus(200);
});

router.get('/:zoneid/:id/open', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    windowMgr.openWindow(
        zones.filter(z => z.id === zoneid).windows.filter(w => w.identifier === id)[0]
    );
    res.sendStatus(200);
});

router.get('/:zoneid/:id/close', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    windowMgr.closeWindow(
        zones.filter(z => z.id === zoneid).windows.filter(w => w.identifier === id)[0]
    );
    res.sendStatus(200);
});

module.exports = router;