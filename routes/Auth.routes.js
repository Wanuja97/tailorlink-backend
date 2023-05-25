// auth routes
const express = require('express');
const authController = require('../controllers/Auth.Controller');
const app = express.Router();

// register new user
app.route('/register').post(authController.registerUser);
// login user
app.route('/login').post(authController.loginUser);

module.exports = app;