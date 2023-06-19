const mongoose = require('mongoose');

const sellerRequestSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true,
    },
    request_status : {
        type: Boolean,
        required: false,
        default: false,
    },
    approved_by : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
        default: null,
    },
})

const SellerRequest = mongoose.model('SellerRequest', sellerRequestSchema);
module.exports = SellerRequest;