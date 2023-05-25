/**
______                   _               _     _____                _                 _  _             
| ___ \                 | |             | |   /  __ \              | |               | || |            
| |_/ / _ __   ___    __| | _   _   ___ | |_  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
|  __/ | '__| / _ \  / _` || | | | / __|| __| | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| |    | |   | (_) || (_| || |_| || (__ | |_  | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
\_|    |_|    \___/  \__,_| \__,_| \___| \__|  \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|   
                                                                                                                                                                                               
 */
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