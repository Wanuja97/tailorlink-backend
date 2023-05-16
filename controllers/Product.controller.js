const productModel = require('../models/Product.model');

exports.getAllProductsBySellerId = async (req, res) => {
    try {
        const products = await productModel.find({shop: req.params.id});
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching products",
            error: error.message,
        });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const product = new productModel(req.body);
        await product.save();
        res.status(200).json({
            status: 'success',
            data: {
                product,
            },
        });   
    } catch (error) {
        res.status(500).json({
            message: "Error while creating product",
            error: error.message,
        });
    }  
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).send('product not found');
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}