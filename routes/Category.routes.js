const express = require('express')
const app = express.Router()
const categoryController = require('../controllers/Category.controller');

// importing User authorization middleware
const AuthMiddleware = require('../middlewares/Auth/firebaseAuthMiddleware');

// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// create category route
app.route('/').post(categoryController.createCategory);
// get all categories
app.route('/').get(categoryController.getAllCategories);
// delete category by id
app.route('/:id').delete(categoryController.deleteCategory);


module.exports = app ;