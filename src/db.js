const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connect(process.env.MONGODB_URI).then(() => {}).catch((e) => {
    console.log(e);
});

module.exports = mongoose;
