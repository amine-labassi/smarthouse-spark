var express = require('express');

var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
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
        /*
         * If the username or password was wrong, return 401 ( Unauthorized )
         * status code and JSON error message
         */
        res.status(401).json({
            error: {
                message: 'Wrong username or password!'
            }
        });
    }
});



module.exports = router;

