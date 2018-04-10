let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
	name: String,
	price: String,
	category: String,
	image: String,
});

module.exports = mongoose.model('Products', productSchema);
