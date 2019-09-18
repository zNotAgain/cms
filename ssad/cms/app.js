var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var dbconfig = require('./dbconfig.json');
var nodemailer = require('nodemailer');
var autoemail = require('./routes/autoemail');



var schedule = require('node-schedule'); // TO DO link email and sms control 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require( './routes/login');
var callcenterRouter= require('./routes/callcenter');

var emailRouter =require('./routes/email');
var emailBuilder = require('./builder/emailBuilder');
var phonenumbersRouter =require('./routes/phonenumbers');

var situationRouter = require('./routes/situation');
var typeRouter = require('./routes/type');
var statusRouter = require('./routes/status');
var agencyRouter = require('./routes/agency');
var psicontrol = require('./routes/agency');

var dengueRouter = require('./routes/dengue');

var terroristadRouter = require('./routes/terroristadvisory');
var hazeadRouter = require('./routes/hazeadvisory');
var dengueadRouter = require('./routes/dengueadvisory');
var tweetRouter = require('./routes/tweet');


var accountRouter = require('./routes/account');

var smser = require('./routes/sms.js');
var twitsender = require('./builder/twitterBuilder.js')
var tb = require('./routes/telebot.js');
var telegramRouter = require('./routes/telegram.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/callcenter', callcenterRouter);
app.use('/login', loginRouter);
app.use('/email', emailRouter);
app.use('/situation',situationRouter);
app.use('/type',typeRouter);
app.use('/status',statusRouter);
app.use('/agency',agencyRouter);
app.use('/dengue',dengueRouter);
app.use('/terroristadvisory',terroristadRouter);
app.use('/hazeadvisory',hazeadRouter);
app.use('/dengueadvisory',dengueadRouter);
app.use('/tweet',tweetRouter);
app.use('/account', accountRouter);
app.use('/phonenumbers',phonenumbersRouter);
app.use('/telegram',telegramRouter);
// catch 404 and forward to error handler


// app.on('listening', function () {
//   // server ready to accept connections here
//   var j = schedule.scheduleJob('43 * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
//   });

// });



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


app.listen(3000, "127.0.0.1", async function() {

  var j = schedule.scheduleJob('* 30 * * * *', function(){
    autoemail.emailsetter();
  });

  var k = schedule.scheduleJob('5 * 5 30  *', function(){
    smser.publicPSISmsBuilder();
  });

  var l = schedule.scheduleJob('* * * * 30 *', function(){
    twitsender.postTwit(/*message*/);
  });

  var m = schedule.scheduleJob('* * * * 30 *', function(){
    tb.telenoti(/*message*/);
  });

  
});

module.exports = app;
