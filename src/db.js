const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {}).catch((e) => {
            console.log(e);
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = {connect, mongoose};
