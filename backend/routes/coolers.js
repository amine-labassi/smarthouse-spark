var router = require('express').Router();
var zones = require("../i2c/SmarthouseConfig").zones;
var coolerMgr = require('../managers/CoolersManager');

router.get('/on', function(req, res) {
    coolerMgr.openCoolerAll();
    res.sendStatus(200);
});

router.get('/off', function(req, res) {
    coolerMgr.closeCoolerAll();
    res.sendStatus(200);
});

router.get('/:zoneid/:id/on', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    coolerMgr.openCooler(
        zones.filter(z => z.id === zoneid).airConditionners.filter(w => w.identifier === id)[0]
    );
    res.sendStatus(200);
});

router.get('/:zoneid/:id/off', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    coolerMgr.closeCooler(
        zones.filter(z => z.id === zoneid).airConditionners.filter(w => w.identifier === id)[0]
    );
    res.sendStatus(200);
});

module.exports = router;