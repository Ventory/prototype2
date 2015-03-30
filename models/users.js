var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var ordersSchema = mongoose.model('orders');

var usersSchema = new Schema({
	createdAt: { type: Date, default: Date.now },
	type: { type: Number, default: 0 },
	email: { type: String, required: true, trim: true},
	nname: { type: String, required: true, trim: true},
	vname: { type: String, required: true, trim: true},
	gender: { type: Number, required: true},
	language: { type: String, required: true},
	suspended: { type: Number, default: 0 },
	passwordHash: { type: String, required: true},
	orders: [ordersSchema],
	ipHistory: { type: Array, default: [] },
	searchHistory: { type: Array, default: [] },
	categoryHistory: { type: Array, default: [] },
	settings: { type: Array, default: [] }
});

usersSchema.methods.giveName = function() {
	var fullName = this.vname + ' ' + this.nname;
	return fullName;
}

usersSchema.methods.validPassword = function(pwd, callback) {
    var hash = this.passwordHash;
    bcrypt.compare(pwd, hash, function(err, res) {
    	// console.log("validPassword(): " + res);
    	return callback(res);
	});
};

mongoose.model('users', usersSchema);