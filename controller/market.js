var mongoose = require('mongoose');
var Product = mongoose.model('products');
var User = mongoose.model('users');

module.exports = {
	getProducts: function(criteria, callback) {
		callback(null, [
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
		]);
	},
	search: function(term, callback) {
		var query = term.q;
		if (term.d) {
			var dim = term.d;
		}
		else
		{
			var dim = "vp" // Händler: v, Produkte: p
		}
		var cbobj = {l: dim.length()};
		if (dim.indexOf("p") > -1) {
			Product.textSearch(query, function (err, res) {
				if (!err) {
					cbobj.products = res.results;
				}
				if (--cbobj.l == 0) {
					callback(null, cbobj);
				}
			});
		}
		if (dim.indexOf("v") > -1) {
			User.textSearch(query, {filter: { type: 1 }}, function (err, res) {
				if (!err) {
					cbobj.vendors = res.results;
				}
				if (--cbobj.l == 0) {
					callback(null, cbobj);
				}
			});
		}
	}
}