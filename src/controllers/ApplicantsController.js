const Applicant = require('../models/applicant');
const { make, regex } = require('simple-body-validator');
const fs = require('fs');
const path = require('path');
const curpRule = regex(/^[A-Za-z]{4}\d{6}[HMhm][A-Za-z]{5}[A-Za-z0-9]\d$/);

const create = async (req, res, next) => {
	const rules = {
		curp: ['required', 'string', curpRule],
		dob: ['required', 'date', regex(/^(19|20)\d{2}\-(0[1-9]|1[012])\-[0-3]\d$/)],
		firstName: ['required', 'string'],
		lastName: ['required', 'string'],
		secondLastName: ['string'],
		state: ['required', 'string', 'in:AS,BC,BS,CC,CL,CM,CS,CH,CX,DF,DG,GT,GR,HG,JC,MC,MN,MS,NT,NL,OC,PL,QT,QR,SP,SL,SR,TC,TS,TL,VZ,YN,ZS']
	};

	const validator = make(req.body, rules);

	if (!validator.validate()) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
		});

		return;
	}

	const dob = new Date(req.body.dob);
	const voucherPath = path.normalize(__dirname + '/../..') + '/storage/' + req.body.curp; // generate a file path
	fs.writeFileSync(voucherPath, req.file.buffer); // write the buffer to a file

	const properties = {
		curp: req.body.curp,
		dob: dob.toISOString(),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		secondLastName: req.body.secondLastName,
		state: req.body.state,
		validated: false
	};

	const applicant = new Applicant(properties);

	try {
		await applicant.save();
	} catch (err) {
		res.json({
			status: 'error',
			data: err
		});

		return;
	}

	res.json({
		status: 'success',
		message: 'Información enviada correctamente.'
	});
};

const index = async (req, res, next) => {
	const applicants = await Applicant.find({}, '-_id -__v');

	res.json({data: applicants});
};

const show = async (req, res, next) => {
	const rules = {curp: ['required', curpRule]};
	const validator = make(req.params, rules);

	if (!validator.validate()) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
		});

		return;
	}

	const voucherPath = path.normalize(__dirname + '/../..') + '/storage/' + req.params.curp;

	res.sendFile(voucherPath);
};

const update = async (req, res, next) => {
	const rules = {curp: ['required', curpRule]};
	const validator = make(req.params, rules);

	if (!validator.validate()) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
		});

		return;
	}

	const result = await Applicant.findOneAndUpdate({curp: req.params.curp}, {validated: true}, {upsert: false, new: true});

	if (result == null) {
		res.json({
			status: 'failure',
			data: {curp: 'No se encontró la información del alumno.'}
		});
	} else {
		res.json({
			status: 'success',
			message: 'Alumno validado correctamente.'
		});
	}
};

const view = async (req, res) => {
    res.render('applicants', {});
}

module.exports = {
	create,
	index,
	show,
	update,
	view
};
