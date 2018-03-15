var router = require('express').Router();
var zones = require("../i2c/SmarthouseConfig").zones;
var lampMgr = require('../managers/LampsManager');

router.get('/on', function(req, res) {
    lampMgr.openLampAll();
    res.sendStatus(200);
});

router.get('/off', function(req, res) {
    lampMgr.closeLampAll();
    res.sendStatus(200);
});

router.get('/:zoneid/:id/on', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    lampMgr.openLamp(zones.filter(z => z.id === zoneid).lamps.filter(l => l.identifier === id)[0]);
    res.sendStatus(200);
});

router.get('/:zoneid/:id/off', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    lampMgr.closeLamp(zones.filter(z => z.id === zoneid).lamps.filter(l => l.identifier === id)[0]);
    res.sendStatus(200);
});

module.exports = router;