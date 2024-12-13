const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const multer  = require('multer');
const upload = multer();
const applicantsController = require('../controllers/ApplicantsController');
const {middlewareNotAuthenticated, middlewareSession} = require('../helpers/session');

router.post('/applicants/create', upload.single('voucher'), applicantsController.create);
router.post('/applicants/index', applicantsController.index);
router.get('/applicants/show/:curp', applicantsController.show);
router.post('/applicants/update/:curp', applicantsController.update);
router.get('/applicants', middlewareSession, middlewareNotAuthenticated, applicantsController.view);

module.exports = router;
