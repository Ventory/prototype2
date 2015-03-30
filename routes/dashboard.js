var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Dashboard',
		isAuthenticated: req.isAuthenticated,
		user: req.user,
		content: '<div class="btn-group btn-group-lg btn-group-justified"><a class="btn btn-default" href="/dashboard/profil">Mein Profil</a> <a class="btn btn-default" href="/dashboard/laden">Laden</a> <a class="btn btn-default" href="/dashboard/aktiv">Aktiv</a></div><br><br><div class="btn-group btn-group-lg btn-group-justified"><a class="btn btn-default" href="/dashboard/messages">Nachrichten</a> <a class="btn btn-default" href="/dashboard/wunschliste">Wunschliste</a> <a class="btn btn-default" href="/dashboard/bewertungen">Bewertungen</a></div>'
	});
});

router.get('/profil', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('index', { 
			title: 'Mein Profil', 
			isAuthenticated: req.isAuthenticated, 
			user: req.user, 
			profile: req.user,
			partials: {
				profilepart: '../views/partials/profile-partial'
			}
		});
	} else {
		res.redirect('/dev/login');
	}
});

module.exports = router;
