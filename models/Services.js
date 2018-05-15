let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let serviceSchema = new Schema({
	name: String,
	price: String,
	category: String,
	location: String,
	image: String,
});

module.exports = mongoose.model('Services', serviceSchema);
