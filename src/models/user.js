const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	salt: {type: String, required: true},
	name: {type: String, required: true},
	role: {type: Number, required: true}
}, {collection: 'Users'});

module.exports = mongoose.model('users', user);
