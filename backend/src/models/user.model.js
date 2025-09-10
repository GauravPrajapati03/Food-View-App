const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;