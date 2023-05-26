const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    order_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        required: true,
    },
    shop_owner:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    customer:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },

});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;