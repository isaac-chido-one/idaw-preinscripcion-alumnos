const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {});
});

module.exports = app;
