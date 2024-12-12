const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser')
const express = require('express');
//const session = require('express-session');
const app = express();

/*
app.use(session({
    secret: 'idaw-preinscriptions',
    resave: false,
    saveUninitialized: true
}))
*/

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
