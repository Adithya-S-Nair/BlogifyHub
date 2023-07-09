const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLoggedInAt: {
        type: Date,
        default: Date.now
    }
});

// Create the User model
const User = mongoose.model('User', userModel);

module.exports = User;
