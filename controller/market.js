var mongoose = require('mongoose');
var async = require('async');
var Product = mongoose.model('products');
var User = mongoose.model('users');

module.exports = {
	getProducts: function(criteria, callback) {
		Product.find(criteria, callback);
	},
	getProduct: function(criteria, callback) {
		Product.findOne(criteria, callback);
	},
	search: function(term, callback) {
		var query = term.q;
		if (term.d == "v") {
			User.textSearch(query, {filter: {type: 1}}, callback);
		}
		else if (term.d == "p") {
			Product.textSearch(query, callback);
		}
		else
		{
			async.parallel([
				function(cb) {
					Product.textSearch(query, cb);
				},
				function(cb) {
					User.textSearch(query, {filter: {type: 1}}, cb);
				}],
				callback
			);
		}
	}
}