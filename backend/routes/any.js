var router = require('express').Router();

router.get('/status', function(req, res) {
    res.json(
        {"data":"dcsdc"}
    ).end();
});

module.exports = router;

