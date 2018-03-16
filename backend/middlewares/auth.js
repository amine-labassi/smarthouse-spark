var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {

            var password = '0101';
            if(process.env.PASSWORD){
                password = process.env.PASSWORD;
            }

            req.user = jwt.verify(req.headers['authorization'], password);
        } catch (err) {
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
    } else {
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
    next();
    return;
}