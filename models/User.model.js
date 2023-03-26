// user model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    order: mongoose.SchemaTypes.ObjectId,
    phoneNumbers: [String],
    address: {
        street: String,
        city: String
    }
})

module.exports = mongoose.model("User",userSchema);