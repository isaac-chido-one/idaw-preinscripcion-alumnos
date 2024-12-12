const { connect } = require('./db');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/', require(__dirname + '/routes/index'));

async function main() {
	try {
		await connect();
	} catch (e) {
		console.error(e);
	}
}

main().catch(console.error);

module.exports = app;
