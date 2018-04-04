let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	googleID: String,
	email: { type: String, unique: true },
	password: String,
	firstName: String,
	lastName: String,
	gender: String,
	location: String,
	address: String
});

module.exports = mongoose.model('User', userSchema);
