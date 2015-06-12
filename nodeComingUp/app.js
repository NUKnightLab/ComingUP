var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongoose = require('mongoose');
var routes = require('./Routes/index');
var users = require('./Routes/users');


var db = mongoose.connect('mongodb://juliuszc:comingup@ds031952.mongolab.com:31952/comingup');
var Event = require('./models/eventModel');

var app = express();


var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

eventRouter = require('./Routes/eventRoutes')(Event);

//eventRouter.post();
app.use('/api/events', eventRouter);


//app.all('/*', function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "http://localhost:3000/*");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
//  next();
//
//});
app.engine('html', swig.renderFile);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
