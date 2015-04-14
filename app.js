var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var user = require('./app/models/user');
var User = mongoose.model('User');

var routes = require('./app/routes/index');
var users = require('./app/routes/users');
var api = require('./app/routes/api');

var app = express();

//Auth setup
passport.use(new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
	  },
	function(email, password, done) {
		User.findOne({email: email}, function (err, user) {
			if (err) {return done(err); }
			if (!user) {
				return done(null, false, {message : 'Incorrect username.' });
			}
			user.comparePassword(password, function(err, isMatch) {
				if (err) return done(err);
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, {message: 'Invalid password' });
				}
			});
	});
}));

passport.serializeUser(function(user,done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/front/public')));
app.use(session({secret: 'this is a really good secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({dest: './uploads/'}));

app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log(user, info);
		if (err) { return next(err) }
		if (!user) {
			return "There's no user";
		}
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.send(user._id);
		});
	})(req, res, next);
});

app.get('/logout', function(req, res) {
	req.logout();
	res.end();
});

app.post('/register', function(req, res) {
	var newUser = new User();
	console.log(req.body);
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	newUser.username = req.body.username;
	newUser.save(function(err) {
		if (err) console.log(err);
		console.log(newUser);
		res.end();
	});
});

app.use('/', routes);
app.use('/api/v1', api);
app.use('/users', users);

app.get('*', function(req, res) {
  //res.sendFile('index.html', {root: './front/public'});
  res.redirect('/');
});

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
