const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connection.on('open', () => {
    console.log('open');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(`successfully connected`);
}).catch((e) => {
    console.log(`not connected`);
});

module.exports = mongoose;
