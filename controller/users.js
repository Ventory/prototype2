var mongoose = require('mongoose');
var User = mongoose.model('users');

module.exports = {
	addUser: function(userobj, callback) {
		if (!userobj.password.trim()) {
			callback(new Error('Password kann nicht leer sein.'));
		}
		if (userobj.password != userobj.rpassword) {
			callback(new Error('Passwörter stimmen nicht überein.'))
		}
		if (!userobj.name.trim()) {
			callback(new Error('Name kann nicht leer sein.'));
		}
		if (!userobj.firstname.trim()) {
			callback(new Error('Vorname kann nicht leer sein.'));
		}
		if (!userobj.email.match(new RegEx("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b"))) {
			callback(new Error('Email ist nicht im korrekten Format.'))
		}
		bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash(userobj.password, salt, function(err, hash) {
        		var signupAttempt = new User({
					passwordHash: hash,
					name: userobj.name,
					firstname: userobj.firstname,
					email: userobj.email.toLowerCase(),
					gender: userobj.gender,
					language: userobj.language
				});
				signupAttempt.save(function(err) {
					if (err) {
						callback(err);
					}
					else {
						callback();
					}
				});
    		});
		});
	},
	getUsers: function(criteria, callback) {
		User.find(criteria, callback);
	},
	getUser: function(criteria, callback) {
		User.findOne(criteria, callback);
	},
	search: function(term, callback) {

	}
}