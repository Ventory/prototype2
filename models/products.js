var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var productImagesSchema = new Schema({
	title: { type: String, trim: true, required: true},
	description: { type: String, trim: true },
	cdnId: { type: String, required: true }
});

var productReviewsSchema = new Schema({
	userId: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	title: { type: String, trim: true, required: true},
	content: { type: String, trim: true, required: true},
	rating: { type: Number, required: true },
	score: { type: Number, default: 0}
});

var productsSchema = new Schema({
	createdAt: { type: Date, default: Date.now },
	title: { type: String, trim: true, required: true},
	description: { type: String, trim: true, required: true},
	images: [productImagesSchema],
	category: { type: Array },
	sellerId: { type: String, required: true },
	reviews: [productReviewsSchema],
	available: { type: Number, default: 0 },
	scarcity: { type: Number },
	postage: { type: Number, default: -1 },
	keywords: { type: Array },
	outletId: { type: String, default: 0 }
});

mongoose.model('product-images', productImagesSchema);
mongoose.model('product-reviews', productReviewsSchema);
mongoose.model('products', productsSchema);