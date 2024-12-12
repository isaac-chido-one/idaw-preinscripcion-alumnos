const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const usersController = require('../controllers/UsersController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/users/create', urlencodedParser, usersController.create);
router.get('/register', usersController.register);

module.exports = router;
