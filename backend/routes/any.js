var router = require('express').Router();
var SmarthouseConfig = require('../i2c/SmarthouseConfig');
var omitDeep = require('omit-deep');

router.get('/status', function(req, res) {
    res.json(
        omitDeep(
            SmarthouseConfig.zones,
            ['mcpInput', 'mcpOutput',
             'addressInput', 'addressOutput',
             'mcpUp', 'addressUp', 'upTime',
             'mcpDown', 'addressDown', 'downTime']
        )
    ).end();
});

module.exports = router;

