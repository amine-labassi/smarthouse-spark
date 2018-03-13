var jwt = require('jsonwebtoken');
var router = require('express').Router();

router.post('/login', function(req, res) {
    if(  req.body.password === '0101' ) {
        res.json({
            id: 1,
            username: 'admin',
            jwt: jwt.sign({
                id: 1,
            }, '0101', { expiresIn: 60*60 })
        });
    } else {
        res.status(401).json({
            error: {
                message: 'Wrong username or password!'
            }
        });
    }
});



module.exports = router;

