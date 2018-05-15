var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

//DB SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://meetup:meetup@ds223760.mlab.com:23760/meetup')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*---------------------------NOTA-------------------------*/
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));
/*--------------- ROUTING FOR REACT on PRODUCTION ------------------*/

app.use('/api', indexRouter);

// All remaining requests return the React app, so it can handle routing.
// No matter what the user ask, we send the index.html, which loads ReactRouter, and that takes care of routing
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
/*--------------- ROUTING FOR REACT on PRODUCTION ------------------*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
