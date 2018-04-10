let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let serviceSchema = new Schema({
	firstName: String,
	lastName: String,
	price: String,
	category: String,
	image: String,
});

module.exports = mongoose.model('Services', serviceSchema);
