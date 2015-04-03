var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Middleware
var expressSession = require('express-session');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passport = require('passport');
var passportLocal = require('passport-local');
var cons = require('consolidate');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(expressSession);

// Models
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (filename.indexOf('.js')) {
        require(__dirname + '/models/' + filename);
    }
});

var routes = require('./routes/index');
var dashboardRoutes = require('./routes/dashboard');

var app = express();

// view engine setup
app.engine('hjs', cons.hogan);
app.set('view engine', 'hjs');

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Connection
// Mongoose Dev
if (app.get('env') == 'development') {
    mongoose.connect('mongodb://localhost/youshareproto');

    //Debug / Status info. All of this could be deleted without loss of functionality
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(callback) {
        // console.log('Database connection established');
    });
}


// Middleware .use()
app.use(expressSession({
    secret: 'RdcGqqOQwCB2N17JSL209DD6j5LX48nj',
    cooke: { maxAge: new Date(Date.now() + 3600000)},
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Setup
passport.use(new passportLocal.Strategy( function(username, password, done) {
    mongoose.model('users').findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: '<b>Error</b> Incorrect username / password' });
      }
      user.validPassword(password, function passwordResponse(isCorrect) {
        if (!isCorrect) {
            return done(null, false, { message: '<b>Error</b> Incorrect username / password'});
        } else {
            return done(null, user);
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  mongoose.model('users').findById(id, function(err, user) {
    done(err, user);
  });
});

var userc = require('controller/users');
var marketc = require('controller/market');
var adminc = require('controller/administration');
app.use(function(req, res, next){
    req.users = userc;
    req.market = marketc;
    req.administration = adminc;
});

app.use('/', routes);
app.use('/dashboard', dashboardRoutes);

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
