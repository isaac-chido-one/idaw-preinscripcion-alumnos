const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

router.get('/', (req, res) => {
    res.render('index', {});
});

router.get('/validators', (req, res) => {
    res.render('validators', {});
});

router.get('/responsibles', (req, res) => {
    res.render('responsibles', {});
});

module.exports = router;
