const crypto = require('crypto');
const { make } = require('simple-body-validator');
const User = require('../models/user');

const create = async (req, res, next) => {
	console.log(req.body);
	const rules = {
		name: ['required', 'string'],
		username: ['required', 'string', 'email'],
		password: ['required', 'string', 'min:6'],
		role: ['required', 'integer', 'in:1,2']
	};

	const validator = make(req.body, rules);

	if (!validator.validate()) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
		});

		return;
	}

	const username = req.body.username;
	const exists = await User.exists({username: username});

	if (exists) {
		res.json({
			status: 'failure',
			data: {username: 'El usuario ya existe.'}
		});

		return;
	}

	const role = parseInt(req.body.role);
	const salt = crypto.randomBytes(16);
	crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
		if (err) {
			res.json({
				status: 'error',
				data: err
			});

			return;
		}

		const properties = {
			username: username,
			password: hashedPassword,
			salt: salt,
			name: req.body.name,
			role: role
		};

		const user = new User(properties);

		try {
			await user.save();
		} catch (err) {
			res.json({
				status: 'error',
				data: err
			});

			return;
		}

		res.json({
			status: 'success',
			message: 'Usuario creado correctamente.',
			url: role == 1 ? '/validators' : '/responsibles'
		});
	});
};

const register = async (req, res) => {
    res.render('register', {});
}

module.exports = {
	create,
	register
};
