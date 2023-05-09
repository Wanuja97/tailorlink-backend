// user model

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    is_read: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const Notification = mongoose.model("NOtification",notificationSchema);

module.exports = Notification;

