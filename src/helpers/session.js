const express = require('express');
const session = require('express-session');
const app = express();

const middlewareSession = session({
    secret: 'idaw-preinscriptions',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: false
    },
	sameSite: false
});

function middlewareAuthenticated (req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

function middlewareNotAuthenticated (req, res, next) {
	if (req.session.user) {
		res.redirect(req.session.user.role == 1 ? '/validators' : '/responsibles');
	} else {
		next();
	}
}

module.exports = {
	middlewareAuthenticated,
	middlewareNotAuthenticated,
	middlewareSession
};
