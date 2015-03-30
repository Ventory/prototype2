var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
	productName: { type: String, required: true, trim: true},
	productId: { type: String, required: true },
	displayId: { type: String, required: true },
	date: { type: Date, default: Date.now },
	cancelPossibleUntil: { type: Date, required: true },
	transactionPrice: { type: Number, required: true },
	postage: { type: Number, required: true },
	sellerId: { type: String, required: true },
	status: { type: Number, default: 0 }
});

mongoose.model('orders', ordersSchema);