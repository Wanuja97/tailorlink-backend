const mongoose = require('mongoose');
// order proposal is a document which send by shop owner to customer
const orderProposalSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true,
    },
    prepayment_amount : {
        type: Number,
        required: true,
    },
    total_amount : {
        type: Number,
        required: true,
    },
    color : {
        type: String,
        required: true,
    },
    material :{
        type: String,
        required: true,
    },
    measurement : {
        type: Array,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    due_date : {
        type: Date,
        required: true,
    },
    client : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },  
    shop_owner : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required : true,
    },
    status : {
        type: String,
        required: true,
        default: 'pending',
    },
    proposal_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const OrderProposal = mongoose.model("OrderProposal",orderProposalSchema);

module.exports = OrderProposal;