const crypto = require('crypto');
const { make, register } = require('simple-body-validator');
const session = require('express-session');
const User = require('../models/user');
const passwordRules = ['required', 'string', 'min:6'];
const validatorAttributes = {
	name: 'nombre o alias',
	username: 'e-mail',
	password: 'contraseña',
	role: 'rol de usuario'
};
const iterations = 310000;
const keylen = 32;
const digest = 'sha256';

register('username_available', async function(username) {
	const exists = await User.exists({username: username});

	return !exists;
}, function () {
	return 'El usuario ya existe.';
});

const create = async (req, res, next) => {
	const rules = {
		name: ['required', 'string'],
		username: ['required', 'string', 'email', 'username_available'],
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

	const salt = crypto.randomBytes(16);
	crypto.pbkdf2(req.body.password, salt, iterations, keylen, digest, async function(err, hashedPassword) {
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
			role: parseInt(req.body.role)
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
			url: '/login'
		});
	});
};

const login = async (req, res, next) => {
	const rules = {
		username: ['required', 'string', 'email'],
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

	const username = req.body.username;
	const user = await User.findOne({username});

	if (user == null) {
		res.json({
			status: 'failure',
			data: {username: ['Las credenciales son incorrectas.']},
			debug: 'Username does not exist.'
		});

		return false;
	}

	crypto.pbkdf2(req.body.password, user.salt, iterations, keylen, digest, async function(err, hashedPassword) {
		if (err) {
			return res.json({
				status: 'error',
				data: err
			});
		}

		const isValidPassword = crypto.timingSafeEqual(user.password, hashedPassword);

		if (!isValidPassword) {
			return res.json({
				status: 'failure',
				data: {username: ['Las credenciales son incorrectas.']},
				debug: 'Incorrect password'
			});
		}

		req.session.regenerate(function (err) {
			if (err) {
				return res.json({
					status: 'error',
					data: err
				});
			}

			req.session.user = {
				name: user.name,
				role: user.role
			};

			req.session.save(function (err) {
				if (err) {
					return res.json({
						status: 'error',
						data: err
					});
				}

				return res.json({
					status: 'success',
					message: 'Bienvenido ' + user.name,
					url: user.role == 1 ? '/validators' : '/responsibles'
				});
			});
		});
	});
};

const logout = async (req, res, next) => {
	req.session.user = null;

	req.session.save(function (err) {
		if (err) {
			res.json({
				status: 'error',
				data: err
			});

			return;
		}

		req.session.regenerate(function (err) {
			if (err) {
				res.json({
					status: 'error',
					data: err
				});

				return;
			}

			res.redirect('/');
		})
	});
};

const viewLogin = async (req, res) => {
    res.render('login', {authenticated: false});
}

const viewRegister = async (req, res) => {
    res.render('register', {authenticated: false});
}

module.exports = {
	create,
	login,
	logout,
	viewLogin,
	viewRegister
};
