var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login')

var app = express();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.db = db;
    next();
});

// app.use('/', index);
// app.use('/users', users);
// app.use('/login',login)

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})
app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/authentication/login.html");
})
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + "/public/authentication/signup.html");
})

// app.get('/login',(req,res)=> {
//   res.sendFile(__dirname + "/public/authentication/login.html");
// })
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
  res.render('error');
});
app.listen(3000, function() {
  console.log('listening on 3000')
})
module.exports = app;
