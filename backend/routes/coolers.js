var router = require('express').Router();

router.get('/on', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/off', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:id/on', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:id/off', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

module.exports = router;