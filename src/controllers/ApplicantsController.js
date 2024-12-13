const Applicant = require('../models/applicant');
const { make, regex, register } = require('simple-body-validator');
const fs = require('fs');
const path = require('path');
const curp = require('curp');
const curpRules = ['required', 'string', regex(/^[A-Za-z]{4}\d{6}[HMhm][A-Za-z]{5}[A-Za-z0-9]\d$/)];
const validatorAttributes = {
	curp: 'CURP',
	dob: 'fecha de nacimiento',
	gender: 'género',
	firstName: 'nombres',
	lastName: 'primer apellido',
	secondLastName: 'segundo apellido',
	state: 'estado de nacimiento'
};
const genders = {
	F: 'Femenino',
	H: 'Masculino'
};
const states = {
	AS: 'Aguascalientes',
	BC: 'Baja California',
	BS: 'Baja California Sur',
	CC: 'Campeche',
	CL: 'Coahuila',
	CM: 'Colima',
	CS: 'Chiapas',
	CH: 'Chihuahua',
	CX: 'Ciudad de México',
	DF: 'Distrito Federal',
	DG: 'Durango',
	GT: 'Guanajuato',
	GR: 'Guerrero',
	HG: 'Hidalgo',
	JC: 'Jalisco',
	MC: 'México',
	MN: 'Michoacán',
	MS: 'Morelos',
	NT: 'Nayarit',
	NL: 'Nuevo León',
	OC: 'Oaxaca',
	PL: 'Puebla',
	QT: 'Querétaro',
	QR: 'Quintana Roo',
	SP: 'San Luis Potosí',
	SL: 'Sinaloa',
	SR: 'Sonora',
	TC: 'Tabasco',
	TS: 'Tamaulipas',
	TL: 'Tlaxcala',
	VZ: 'Veracruz',
	YN: 'Yucatán',
	ZS: 'Zacatecas',
	NE: 'Nacido en el Extranjero'
};

register('states', function (value) {
	return value in states;
}, function() {
	return 'Estado incorrecto.';
});

register('genders', function (value) {
	return value in genders;
}, function() {
	return 'Género incorrecto.';
});

const create = async (req, res, next) => {
	const rules = {
		curp: curpRules,
		dob: ['required', 'date', regex(/^(19|20)\d{2}\-(0[1-9]|1[012])\-[0-3]\d$/)],
		firstName: ['required', 'string'],
		gender: ['required', 'string', 'size:1', 'genders'],
		lastName: ['required', 'string'],
		secondLastName: ['string'],
		state: ['required', 'string', 'size:2', 'states']
	};

	const validator = make(req.body, rules, {}, validatorAttributes);

	if (!validator.validate()) {
		return res.json({
			status: 'failure',
			data: validator.errors().all()
		});
	}

	const dob = new Date(req.body.dob);
	const voucherPath = path.normalize(__dirname + '/../..') + '/storage/' + req.body.curp; // generate a file path
	fs.writeFileSync(voucherPath, req.file.buffer); // write the buffer to a file

	const properties = {
		curp: req.body.curp,
		dob: dob.toISOString(),
		firstName: req.body.firstName,
		gender: req.body.gender,
		lastName: req.body.lastName,
		secondLastName: req.body.secondLastName,
		state: req.body.state,
		validated: false
	};

	const applicant = new Applicant(properties);

	try {
		await applicant.save();
	} catch (err) {
		return res.json({
			status: 'error',
			data: err
		});
	}

	return res.json({
		status: 'success',
		message: 'Información enviada correctamente.'
	});
};

const index = async (req, res, next) => {
	const applicants = await Applicant.find({}, '-_id -__v');

	for (const applicant of applicants) {
		if (applicant.state in states) {
			applicant.state = states[applicant.state];
		}

		if (applicant.gender in genders) {
			applicant.gender = genders[applicant.gender];
		}
	}

	return res.json({data: applicants});
};

const show = async (req, res, next) => {
	const rules = {curp: curpRules};
	const validator = make(req.params, rules, {}, validatorAttributes);

	if (!validator.validate()) {
		return res.json({
			status: 'failure',
			data: validator.errors().all()
		});
	}

	const voucherPath = path.normalize(__dirname + '/../..') + '/storage/' + req.params.curp;

	return res.sendFile(voucherPath);
};

const update = async (req, res, next) => {
	const rules = {curp: curpRules};
	const validator = make(req.params, rules, {}, validatorAttributes);

	if (!validator.validate()) {
		return res.json({
			status: 'failure',
			data: validator.errors().all()
		});
	}

	const result = await Applicant.findOneAndUpdate({curp: req.params.curp}, {validated: true}, {upsert: false, new: true});

	if (result == null) {
		return res.json({
			status: 'failure',
			data: {curp: ['No se encontró la información del alumno.']}
		});
	}

	return res.json({
		status: 'success',
		message: 'Alumno validado correctamente.'
	});
};

const generate = async (req, res) => {
	const rules = {
		dob: ['required', 'date', regex(/^(19|20)\d{2}\-(0[1-9]|1[012])\-[0-3]\d$/)],
		firstName: ['required', 'string'],
		gender: ['required', 'string', 'size:1', 'genders'],
		lastName: ['required', 'string'],
		secondLastName: ['string'],
		state: ['required', 'string', 'size:2', 'states']
	};

	const validator = make(req.body, rules, {}, validatorAttributes);

	if (!validator.validate()) {
		return res.json({
			status: 'failure',
			data: validator.errors().all()
		});
	}

	const dob = req.body.dob;
	const curp = require('curp');
	const person = curp.getPersona();
	person.nombre = req.body.firstName;
	person.apellidoPaterno = req.body.lastName;
	person.apellidoMaterno = req.body.secondLastName;
	person.genero = req.body.gender;
	person.fechaNacimiento = dob.substring(8, 10) + '-' + dob.substring(5, 7) + '-' + dob.substring(0, 4);
	person.estado = req.body.state;

	return res.json({
		status: 'success',
		message: curp.generar(person)
	});
};

const view = async (req, res) => {
    return res.render('applicants', {
		authenticated: false,
		genders: genders,
		states: states
	});
};

module.exports = {
	create,
	generate,
	index,
	show,
	update,
	view
};
