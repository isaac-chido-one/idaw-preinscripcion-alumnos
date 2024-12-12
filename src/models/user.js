const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
	username: {type: String, required: true},
	password: {type: Buffer, required: true},
	salt: {type: Buffer, required: true},
	name: {type: String, required: true},
	role: {type: Number, required: true}
}, {collection: 'Users'});

module.exports = mongoose.model('users', user);
