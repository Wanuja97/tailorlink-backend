const express = require('express')
const app = express.Router()
const productController = require('../controllers/Product.controller');

// importing User authorization middleware
const AuthMiddleware = require('../middlewares/Auth/firebaseAuthMiddleware');

// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// create product route
app.route('/').post(productController.createProduct);
// get all products by seller id
app.route('/seller/:id').get(productController.getAllProductsBySellerId);
// update product by id
app.route('/:id').patch(productController.updateProduct);
// delete product by id
app.route('/:id').delete(productController.deleteProduct);

module.exports = app ;