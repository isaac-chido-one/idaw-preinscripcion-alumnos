const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const usersController = require('../controllers/UsersController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const session = require('express-session');
const {middlewareSession, middlewareNotAuthenticated} = require('../helpers/session');

router.get('/login', middlewareSession, middlewareNotAuthenticated, usersController.viewLogin);
router.get('/logout', middlewareSession, usersController.logout);
router.get('/register', middlewareSession, middlewareNotAuthenticated, usersController.viewRegister);
router.post('/users/create', urlencodedParser, usersController.create);
router.post('/users/login', urlencodedParser, middlewareSession, usersController.login);

module.exports = router;
