var router = require('express').Router();
var SmarthouseConfig = require('../i2c/SmarthouseConfig');

router.get('/status', function(req, res) {
    res.json(
        SmarthouseConfig.zones
    ).end();
});

module.exports = router;

