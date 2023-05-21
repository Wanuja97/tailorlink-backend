const mongoose = require('mongoose');

const CustomizeOrderSchema = new mongoose.Schema({
    description : {
        type: String,
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

})

const CustomizeOrder = mongoose.model("CustomizeOrder",CustomizeOrderSchema);

module.exports = CustomizeOrder;