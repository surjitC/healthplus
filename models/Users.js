let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    googleID: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    location: String,
    address: String,
    history: [{
        date: Date,
        price: {
            type: Number,
            default: 0
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
	}],
	"cart": [{
		"item": {
			"type": Schema.Types.ObjectId,
			"ref": "Products"
        },
        "quantity": Number,
        "price": Number
	}]
});

module.exports = mongoose.model('User', userSchema);