const mongoose = require('mongoose');

const connect = async() => {
    try {
        mongoose.connect('mongodb://localhost:27017/user-auth');
        console.log('Connected to database')
    } catch (err) {
        console.log('Error connecting to database', err);
    }
}

module.exports = connect;