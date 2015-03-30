var express = require('express');
var router = express.Router();

// Relevant Middleware
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcrypt');

// Database Models
var User = mongoose.model('users');

// -- Site Specification --
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Index',
		isAuthenticated: req.isAuthenticated,
		user: req.user,
		showCarousel: true,
		content: '<p class="lead">Willkommen bei YouShare Proto</p>'
	});
});

router.get('/search', function(req, res) {
	res.render('index', {
		title: 'Suche',
		isAuthenticated: req.isAuthenticated,
		user: req.user
	});
});

router.get('/ys-admin', function(req, res) {
	res.render('index', {
		title: 'Administration',
		isAuthenticated: req.isAuthenticated,
		user: req.user,
		content: '<p class="lead">Login.</p>'
	});
})

// -- DEV --
router.get('/dev', function(req, res) {
	res.render('index', {
		title: 'Dev',
		isAuthenticated: req.isAuthenticated,
		user: req.user,
		content: '<div class="btn-group"><a class="btn btn-default" class="btn btn-default" href="/dev/newuser">New User</a> <a class="btn btn-default" href="/dev/userlist">Userlist</a></div> <div class="btn-group"><a class="btn btn-default" href="/dev/login">Log In</a> <a class="btn btn-default" href="/dev/logout">Log Out</a></div>'
	});
});

router.get('/dev/newuser', function(req, res) {
	res.render('index', {
		title: 'Sign Up',
		titlepre: 'Dev',
		showSignup: true,
		partials: {
			signuppart: '../views/partials/signup-partial'
		}
	});
});

router.post('/dev/newuser', function(req, res) {
	if (req.body.password.trim() != '' && req.body.password == req.body.rpassword) {
		bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash(req.body.password, salt, function(err, hash) {
        		var signupAttempt = new User({
					passwordHash: hash,
					nname: req.body.nname,
					vname: req.body.vname,
					email: req.body.email,
					gender: req.body.sex,
					language: req.body.language
				});
				signupAttempt.save(function(err) { if(err) console.log(err); });
				res.redirect('/dev');
    		});
		});
	} else {
		res.render('index', {
			title: 'Sign Up',
			content: "<div class='alert alert-danger' role='alert'><strong>Achtung!</strong> Password leer oder nicht &uuml;bereinstimmend.</div>",
			showSignup: true
		});
	}
});

router.get('/dev/userlist', function(req, res) {
	User.find(function(err, users) {
		res.render('index', {
			title: 'Userliste',
			titlepre: 'Dev',
			isAuthenticated: req.isAuthenticated,
			user: req.user,
			showComponent: true,
			partials: {
				componentpart: '../views/partials/user-partial'
			},
			userContent: users
		});
	});
});

router.get('/dev/login', function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/dev');
	} else {
		res.render('index', {
			title: 'Login',
			titlepre: 'Dev',
			isAuthenticated: req.isAuthenticated,
			user: req.user,
			content: '',
			showLogin: true,
			errorMessage: req.flash('error'),
			partials: {
				loginpart: '../views/partials/login-partial'
			}
		});
	}
});



router.post('/dev/login', passport.authenticate('local', {
    successRedirect : '/dev',
    failureRedirect : '/dev/login',
    failureFlash : true,
    badRequestMessage: '<b>Error!</b> Missing Username / Password'
}));

router.get('/dev/logout', function(req, res) {
	req.logout();
	res.redirect('/dev');
});


// Transient
router.get('/searchresult', function(req, res) {
	searchResult = [
			{
				name: 'Sony UG4 Relaisverstärker',
				description: 'Guter Zustand'
			},
			{
				name: 'Yamaha Monolith M207',
				description: 'Lokal verfügbar'
			},
			{
				name: 'Marantz Dune 4',
				description: 'Königsspiegel'
			},
			{
				name: 'Sony UG4 Relaisverstärker',
				description: 'Guter Zustand'
			},
			{
				name: 'Yamaha Monolith M207',
				description: 'Lokal verfügbar'
			},
			{
				name: 'Marantz Dune 4',
				description: 'Königsspiegel'
			},
			{
				name: 'Sony UG4 Relaisverstärker',
				description: 'Guter Zustand'
			},
			{
				name: 'Yamaha Monolith M207',
				description: 'Lokal verfügbar'
			},
			{
				name: 'Marantz Dune 4',
				description: 'Königsspiegel'
			}
		];
	res.render('index', {
		title: 'Searchresult',
		showResult: true,
		searchResult: searchResult,
		partials: {
			resultpart: '../views/partials/result-partial'
		}
	});
});

router.get('/api/remove/:id', function(req, res) {
	if (!req.isAuthenticated()) {
		res.redirect('/dev/userlist');
	} else {
		User.findOne({ _id: req.params.id }).remove(function(err) {
			if (err) { console.log(err)};
			res.redirect('/dev/userlist');
		});
	}
	
});

module.exports = router;
