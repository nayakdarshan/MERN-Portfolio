const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isGuest: {
        type: Boolean,
        default: false,
    },
}); 

module.exports = {
    Users: mongoose.model('users', userSchema),
};
