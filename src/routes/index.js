const {Router} = require('express');
const router = Router();

const express = require('express');
const app = express();
const multer  = require('multer');
const upload = multer();

const applicantsController = require('../controllers/ApplicantsController');

router.get('/', (req, res) => {
    res.render('index', {});
});

router.get('/applicants', (req, res) => {
    res.render('applicants', {});
});

router.get('/validators', (req, res) => {
    res.render('validators', {});
});

router.get('/responsibles', (req, res) => {
    res.render('responsibles', {});
});

router.post('/applicants/store', upload.single('voucher'), applicantsController.store);

module.exports = router;
