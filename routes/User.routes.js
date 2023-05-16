const express = require('express')
const app = express.Router()
const userController = require('../controllers/User.controller');

// importing User authorization middleware
const AuthMiddleware = require('./../middlewares/Auth/index');

// user create route
app.route('/').post(userController.createUser);

// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);
// get all users
app.route('/').get(userController.getAllUsers);
// get user by id
app.route('/:id').get(userController.getUserById);
// update user by id
app.route('/:id').patch(userController.updateUser);
// delete user by id
app.route('/:id').delete(userController.deleteUser);
// seller request route
app.route('/seller/request').post(userController.createSellerRequest);
// approve seller request route
app.route('/seller/request/approve/:id').patch(userController.approveSellerRequest);
// get all seller requests
app.route('/seller/requests/all').get(userController.getAllSellerRequests);
// get seller request by id
app.route('/seller/request/:id').get(userController.getSellerRequestByUserId);
// userban route
app.route('/ban/:id').patch(userController.banUser);

module.exports = app ;