const {Router} = require('express');
const router = Router();

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

module.exports = router;
