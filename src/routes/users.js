const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const usersController = require('../controllers/UsersController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/login', usersController.viewLogin);
router.get('/register', usersController.viewRegister);
router.post('/users/create', urlencodedParser, usersController.create);
router.post('/users/login', urlencodedParser, usersController.login);

module.exports = router;
