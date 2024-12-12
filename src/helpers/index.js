const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
	if (req.session.user) {
		next();
	} else {
		next('route');
	}
}

module.exports = {isAuthenticated};
