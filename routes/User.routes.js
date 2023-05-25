const express = require('express')
const app = express.Router()
const userController = require('../controllers/User.controller');

// importing User authorization middleware
// const AuthMiddleware = require('./../middlewares/Auth/index');

// user create route
// app.route('/').post(userController.createUser);

// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// get user by id
app.route('/:id').get(userController.getUserById);
// update user by id
app.route('/:id').patch(userController.updateUser);
// delete user by id
app.route('/:id').delete(userController.deleteUser);

module.exports = app ;