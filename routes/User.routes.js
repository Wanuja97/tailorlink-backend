const express = require('express')
const app = express.Router()
const userController = require('../controllers/User.controller');

// User routes
const AuthMiddleware = require('./../middlewares/Auth/index');

app.route('/').post(userController.createUser);
app.use(AuthMiddleware.decodeToken);

app.route('/').get(userController.getAllUsers);

app.route('/:id').get(userController.getUserById);
app.route('/:id').patch(userController.updateUser);
app.route('/:id').delete(userController.deleteUser);


module.exports = app ;