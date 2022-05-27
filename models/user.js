const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['User', 'Admin'], default: 'User'}
});

module.exports = mongoose.model('User', userSchema);