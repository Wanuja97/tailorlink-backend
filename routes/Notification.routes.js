const express = require('express')
const app = express.Router()
const notificationController = require('../controllers/Notification.controller');

// importing User authorization middleware
const AuthMiddleware = require('./../middlewares/Auth/index');

// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// create notifcation route
app.route('/').post(notificationController.createNewNotification);
// get all notifcations
app.route('/:id').get(notificationController.getAllNotificationsForUser);
// delete notifcation by id
app.route('/:id').delete(notificationController.deleteNotification);

module.exports = app ;