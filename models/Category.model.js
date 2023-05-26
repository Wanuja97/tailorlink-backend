const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        unique : [true, "Category name already exists.."],
        required: true,
        trim: true,
    },
    admin_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;