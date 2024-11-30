const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/', require(__dirname + '/routes/index'));

module.exports = app;
