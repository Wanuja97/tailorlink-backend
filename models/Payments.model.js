const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
})

const Payment = mongoose.model("Payment",PaymentSchema);
module.exports = Payment;