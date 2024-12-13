const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applicant = new Schema({
	curp: {type: String, required: true},
	dob: {type: Date, required: true},
	firstName: {type: String, required: true},
	gender: {type: String, required: true},
	lastName: {type: String, required: true},
	secondLastName: {type: String, required: false, defualt: null},
	state: {type: String, required: true},
	validated: {type: Boolean, default: false}
}, {collection: 'Applicants'});

module.exports = mongoose.model('applicants', applicant);
