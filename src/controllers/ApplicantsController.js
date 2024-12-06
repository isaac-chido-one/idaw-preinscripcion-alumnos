const { make, regex } = require('simple-body-validator');

const store = (req, res, next) => {
    const rules = {
		curp: ['required', regex(/^[A-Za-z]{4}\d{6}[HMhm][A-Za-z]{5}[A-Za-z0-9]\d$/)],
		dob: ['required', 'date', regex(/^(19|20)\d{2}\-(0[1-9]|1[012])\-[0-3]\d$/)],
		firstName: ['required'],
		lastName: ['required'],
		secondLastName: [],
		state: ['required', 'in:AS,BC,BS,CC,CL,CM,CS,CH,CX,DF,DG,GT,GR,HG,JC,MC,MN,MS,NT,NL,OC,PL,QT,QR,SP,SL,SR,TC,TS,TL,VZ,YN,ZS']
    };

    const validator = make(req.body, rules);

	if (!validator.validate()) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
		});

		return;
    }

    res.json({
        status: 'success',
		message: 'Información enviada correctamente',
        body: req.body,
        file: req.file
    });
};

module.exports = {
	store
};
