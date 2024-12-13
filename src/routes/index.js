const {Router} = require('express');
const router = Router();
const {middlewareSession, middlewareAuthenticated} = require('../helpers/session');

router.get('/', middlewareSession, (req, res) => {
    const authenticated = typeof req.session.user == 'object';

    res.render('index', {authenticated: authenticated});
});

router.get('/validators', middlewareSession, middlewareAuthenticated, (req, res) => {
    if (req.session.user.role == 2) {
        res.redirect('/responsibles');

        return;
    }

    res.render('validators', {authenticated: true});
});

router.get('/responsibles', middlewareSession, middlewareAuthenticated, (req, res) => {
    if (req.session.user.role == 1) {
        res.redirect('/validators');

        return;
    }

    res.render('responsibles', {authenticated: true});
});

module.exports = router;
