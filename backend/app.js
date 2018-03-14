var express = require('express');
var listEndpoints = require('list-endpoints-express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var auth = require('./middlewares/auth');
var lamps = require('./routes/lamps');
var coolers = require('./routes/coolers');
var windows = require('./routes/windows');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/', index);
app.use('/api', auth);
app.use('/api/lamps', lamps);
app.use('/api/windows', windows);
app.use('/api/coolers', coolers);

console.log(JSON.stringify(listEndpoints(app),null,2));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
