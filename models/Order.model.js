const mongoose =  require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    shop_owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    is_customize_order: {
        type: Boolean,
        required: true,
        default: false,
    },
    order_proposal: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'OrderProposal',
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const Order = mongoose.model("Order",OrderSchema);
module.exports = Order;
