var router = require('express').Router();

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
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    var val = req.params.val;
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:zoneid/:id/open', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    res.json(
        {"data":"dcsdc"}
    ).end();
});

router.get('/:zoneid/:id/close', function(req, res) {
    var zoneid = req.params.zoneid;
    var id = req.params.id;
    res.json(
        {"data":"dcsdc"}
    ).end();
});

module.exports = router;