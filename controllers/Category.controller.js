const categoryModel = require('../models/Category.model');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.createCategory = async (req, res) => {
    try {
        const category = new categoryModel(req.body);
        await category.save();
        res.status(200).json({
            status: 'success',
            data: {
                category,
            },
        });   
    } catch (error) {
        res.status(500).send(error);
    }  
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).send('category not found');
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

