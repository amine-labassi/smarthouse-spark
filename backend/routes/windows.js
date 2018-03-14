var router = require('express').Router();

router.get('/status', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:zoneid/:id/status', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/open', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/close', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:zoneid/:id/open/:val', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:zoneid/:id/open', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:zoneid/:id/close', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

module.exports = router;