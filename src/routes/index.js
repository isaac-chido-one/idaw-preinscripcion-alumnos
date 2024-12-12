const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const multer  = require('multer');
const upload = multer();
const applicantsController = require('../controllers/ApplicantsController');
const usersController = require('../controllers/UsersController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    res.render('index', {});
});

router.get('/validators', (req, res) => {
    res.render('validators', {});
});

router.get('/responsibles', (req, res) => {
    res.render('responsibles', {});
});

router.post('/applicants/create', upload.single('voucher'), applicantsController.create);
router.post('/applicants/index', applicantsController.index);
router.get('/applicants/show/:curp', applicantsController.show);
router.post('/applicants/update/:curp', applicantsController.update);
router.get('/applicants', applicantsController.view);

router.post('/users/create', urlencodedParser, usersController.create);
router.get('/register', usersController.register);

module.exports = router;
