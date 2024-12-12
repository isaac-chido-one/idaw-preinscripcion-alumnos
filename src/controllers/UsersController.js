const crypto = require('crypto');
const { make, register } = require('simple-body-validator');
const User = require('../models/user');
const passwordRules = ['required', 'string', 'min:6'];
const validatorAttributes = {
	name: 'nombre o alias',
	username: 'e-mail',
	password: 'contraseña',
	role: 'rol de usuario'
};

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
			debug: 'Username not exists'
		});

		return false;
	}

	crypto.pbkdf2(req.body.password, user.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
		if (err) {
			res.json({
				status: 'error',
				data: err
			});

			return;
		}

		const isValidPassword = crypto.timingSafeEqual(user.password, hashedPassword);

		if (isValidPassword) {
			res.json({
				status: 'success',
				message: 'Bienvenido',
				url: user.role == 1 ? '/validators' : '/responsibles'
			});
		} else {
			res.json({
				status: 'failure',
				data: {username: ['Las credenciales son incorrectas.']},
				debug: 'Invalid password',
				d1: req.body.password,
				d2: user.salt,
				d3: isValidPassword
			});
		}
	});


/*
  // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) next(err)

    // store user information in session, typically a user id
    req.session.user = req.body.user

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err) return next(err)
      res.redirect('/')
    })
  })
*/
};

const viewLogin = async (req, res) => {
    res.render('login', {});
}

const viewRegister = async (req, res) => {
    res.render('register', {});
}

module.exports = {
	create,
	login,
	viewLogin,
	viewRegister
};
