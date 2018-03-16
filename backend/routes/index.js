var jwt = require('jsonwebtoken');
var router = require('express').Router();

router.post('/login', function (req, res) {

    var password = '0101';
    if(process.env.PASSWORD){
        password = process.env.PASSWORD;
    }

    if (req.body.password === password) {
        res.json({
            id: 1,
            username: 'admin',
            jwt: jwt.sign({
                id: 1,
            }, password, {expiresIn: 60 * 60})
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

