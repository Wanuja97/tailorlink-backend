const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        required: true,
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit_price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
        default: 0,
    },
    total_price: {
        type: Number,
        required: true,
        default: unit_price * quantity,
    },

})

const OrderItem = mongoose.model("OrderItem",OrderItemSchema);
module.exports = OrderItem;
