// user model
const UserRoles = require('../constants/index.js')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        trim: true,
        unique : [true, "Username already taken.."]
    },
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
        unique : [true, "Email address already taken.."]
    },
    hash_password:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
        default: null
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
        default: UserRoles.CUSTOMER,
    },
    is_banned: {
        type: Boolean,
        required: true,
        default: false,
    },    
})

const User = mongoose.model("User",userSchema);

module.exports = User;