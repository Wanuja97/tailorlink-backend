// user model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // this is a unique index
    },
    address: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    firebase_uid: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: String,
        required: false,
        min: 10,
        max: 10,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'customer',
    },
    is_banned: {
        type: Boolean,
        required: true,
        default: false,
    },    
})

const User = mongoose.model("User",userSchema);

module.exports = User;