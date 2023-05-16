const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    shop: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    size: {
        type: Array,
        required: true,
        trim: true,
    },
    color: {
        type: Array,
        required: true,
        trim: true,
    },
    material: {
        type: Array,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
        default: 0,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: Array,
        required: true,
    },
    is_available: {
        type: Boolean,
        required: true,
        default: true,
    },
    available_quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;

