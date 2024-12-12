const crypto = require('crypto');
const { make, register } = require('simple-body-validator');
const User = require('../models/user');
const usernameRules = ['required', 'string', 'email'];
const passwordRules = ['required', 'string', 'min:6'];
const validatorAttributes = {
	name: 'nombre o alias',
	username: 'e-mail',
	password: 'contraseña',
	role: 'rol de usuario'
};

register('username_avalable', async function(username) {
	const exists = await User.exists({username: username});

	return !exists;
}, function () {
	return 'El usuario ya existe.';
});

const create = async (req, res, next) => {
	const rules = {
		name: ['required', 'string'],
		username: ['required', 'string', 'email', 'username_avalable'],
		password: passwordRules,
		role: ['required', 'integer', 'in:1,2']
	};

	const validator = make(req.body, rules, {}, validatorAttributes);
	const validationResult = await validator.validateAsync();

	if (!validationResult) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
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
			username: req.body.username,
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

const login = async (req, res, next) => {
	const rules = {
		username: usernameRules,
		password: passwordRules
	};

	const validator = make(req.body, rules, {}, validatorAttributes);

	if (!validator.validate()) {
		res.json({
			status: 'failure',
			data: validator.errors().all()
		});

		return;
	}
};

const viweRegister = async (req, res) => {
    res.render('register', {});
}

module.exports = {
	create: create,
	login: login,
	register: viweRegister
};
